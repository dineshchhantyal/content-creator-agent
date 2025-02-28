import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

export const getImages = query({
  args: {
    userId: v.string(),
    videoId: v.string(),
  },
  handler: async (ctx, args) => {
    const images = await ctx.db
      .query("images")
      .withIndex("by_user_and_video")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .filter((q) => q.eq(q.field("videoId"), args.videoId))
      .collect();

    const imageUrls = await Promise.all(
      images.map(async (image) => ({
        ...image,
        url: await ctx.storage.getUrl(image.storageId),
      }))
    );

    return imageUrls;
  },
});

export const createImage = mutation({
  args: {
    videoId: v.string(),
    userId: v.string(),
    storageId: v.string(),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const imageId = await ctx.db.insert("images", {
      videoId: args.videoId,
      userId: args.userId,
      storageId: args.storageId,
      title: args.title,
      description: args.description,
      type: args.type,
    });

    return imageId;
  },
});

export const deleteImage = mutation({
  args: {
    imageId: v.id("images"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const image = await ctx.db.get(args.imageId);

    if (!image) {
      throw new ConvexError("Image not found");
    }

    if (image.userId !== args.userId) {
      throw new ConvexError("Unauthorized");
    }

    // Delete the file from storage
    await ctx.storage.delete(image.storageId);

    // Delete the record from the database
    await ctx.db.delete(args.imageId);

    return { success: true };
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
