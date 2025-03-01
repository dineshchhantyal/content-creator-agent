"use server";

import { FeatureFlag, featureFlagEvents } from "@/components/features/flags";
import { api } from "@/convex/_generated/api";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";

const titleGenerations = async (
  videoId: string,
  videoSummary: string,
  considerations: string
) => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("User not found");
    }

    // Initialize convex client inside the function to ensure it's properly initialized
    const convexClient = getConvexClient();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Use chat completions instead of the deprecated completions API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a YouTube title generation expert. Create engaging, clickable titles.",
        },
        {
          role: "user",
          content: `Generate a title for a YouTube video with the following video summary: "${videoSummary}" and considerations: "${considerations}"`,
        },
      ],
      max_tokens: 100,
      n: 1,
      temperature: 0.7,
    });

    const title =
      response.choices[0]?.message?.content || "Failed to generate title";

    if (!title || title === "Failed to generate title") {
      return {
        success: false,
        error: "Failed to generate title",
      };
    }

    // Store the generated title using Convex
    const titleId = await convexClient.mutation(api.titles.generate, {
      videoId,
      userId: user.id,
      title,
    });

    // Track usage with Schematic
    await client.track({
      event: featureFlagEvents[FeatureFlag.TITLE_GENERATION].event,
      company: {
        id: user.id,
      },
      user: {
        id: user.id,
      },
    });

    return {
      success: true,
      title,
      titleId,
    };
  } catch (error) {
    console.error("Error generating title:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to generate title",
    };
  }
};

export default titleGenerations;
