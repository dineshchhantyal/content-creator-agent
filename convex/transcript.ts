import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTranscriptByVideoId = query({
  args: {
    userId: v.string(),
    videoId: v.string(),
  },
  handler: async (ctx, args) => {
    const transcript = await ctx.db
      .query("transcript")
      .withIndex("by_user_and_video", (q) =>
        q.eq("userId", args.userId).eq("videoId", args.videoId)
      )
      .unique();

    return transcript;
  },
});

export const saveTranscript = mutation({
  args: {
    userId: v.string(),
    videoId: v.string(),
    transcript: v.array(
      v.object({
        text: v.string(),
        timestamp: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // check if already exists
    const existingTranscript = await ctx.db
      .query("transcript")
      .withIndex("by_user_and_video", (q) =>
        q.eq("userId", args.userId).eq("videoId", args.videoId)
      )
      .unique();

    if (existingTranscript) {
      await ctx.db.patch(existingTranscript._id, {
        transcript: args.transcript,
      });
    }

    const transcript = await ctx.db.insert("transcript", {
      videoId: args.videoId,
      userId: args.userId,
      transcript: args.transcript,
    });

    return transcript;
  },
});

export const getTranscriptByUserId = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const transcript = await ctx.db
      .query("transcript")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();

    return transcript;
  },
});

export const deleteTranscript = mutation({
  args: {
    transcriptId: v.id("transcript"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const transcript = await ctx.db.get(args.transcriptId);

    if (!transcript) {
      throw new ConvexError("Transcript not found");
    }

    await ctx.db.delete(transcript._id);

    return true;
  },
});
