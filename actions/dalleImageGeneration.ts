"use server";

import { FeatureFlag, featureFlagEvents } from "@/components/features/flags";
import { api } from "@/convex/_generated/api";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";

const IMAGE_SIZE = "1792x1024" as const;

const dalleImageGeneration = async (videoId: string, prompt: string) => {
  try {
    const user = await currentUser();

    if (!user?.id) {
      throw new Error("User not found");
    }

    if (!prompt) {
      throw new Error("Prompt is required");
    }

    // Initialize the Convex client properly
    const convexClient = getConvexClient();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: IMAGE_SIZE,
      quality: "standard",
      style: "vivid",
    });

    const imageUrl = imageResponse.data[0]?.url;

    if (!imageUrl) {
      throw new Error("Failed to generate image");
    }

    // Get a short-lived upload URL for Convex
    const postUrl = await convexClient.mutation(
      api.images.generateUploadUrl,
      {}
    );

    // Upload the image to Convex
    const image = await fetch(imageUrl).then((res) => res.blob());

    const result = await fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": image.type,
      },
      body: image,
    });

    const { storageId } = await result.json();

    // Create the image in the database
    const imageId = await convexClient.mutation(api.images.createImage, {
      videoId,
      userId: user.id,
      storageId,
      title: "AI Generated Thumbnail",
      description: prompt,
      type: "dalle",
    });

    // Get all images for this video (including the newly created one)
    const images = await convexClient.query(api.images.getImages, {
      videoId,
      userId: user.id,
    });

    // Track the image generation event
    await client.track({
      event: featureFlagEvents[FeatureFlag.IMAGE_GENERATION].event,
      company: {
        id: user.id,
      },
      user: {
        id: user.id,
      },
    });

    return {
      images,
      success: true,
    };
  } catch (error) {
    console.error("Error generating image:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to generate image",
      success: false,
    };
  }
};

export default dalleImageGeneration;
