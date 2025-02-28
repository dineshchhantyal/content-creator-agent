import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getAllUserVideos = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const videos = await ctx.db
      .query("videos")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();

    // For each video, get the associated data (titles, images)
    return await Promise.all(
      videos.map(async (video) => {
        // Get titles for this video
        const titles = await ctx.db
          .query("titles")
          .withIndex("by_user_and_video", (q) =>
            q.eq("userId", args.userId).eq("videoId", video.videoId)
          )
          .collect();

        // Get thumbnails for this video
        const images = await ctx.db
          .query("images")
          .withIndex("by_user_and_video", (q) =>
            q.eq("userId", args.userId).eq("videoId", video.videoId)
          )
          .collect();

        // Map images to include URLs
        const imagesWithUrls = await Promise.all(
          images.map(async (image) => ({
            ...image,
            url: await ctx.storage.getUrl(image.storageId),
          }))
        );

        // Check if transcript exists
        const transcripts = await ctx.db
          .query("transcript")
          .withIndex("by_user_and_video", (q) =>
            q.eq("userId", args.userId).eq("videoId", video.videoId)
          )
          .collect();

        return {
          ...video,
          titles: titles,
          images: imagesWithUrls,
          hasTranscript: transcripts.length > 0,
        };
      })
    );
  },
});

export const saveVideoAnalysis = mutation({
  args: {
    videoId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if video already exists for this user
    const existing = await ctx.db
      .query("videos")
      .withIndex("by_user_and_video", (q) =>
        q.eq("userId", args.userId).eq("videoId", args.videoId)
      )
      .first();

    if (existing) {
      return existing._id;
    }

    // Save new video
    return await ctx.db.insert("videos", {
      videoId: args.videoId,
      userId: args.userId,
    });
  },
});
