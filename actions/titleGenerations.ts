"use server";

import { getConvexClient } from "@/lib/convex";
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";

const convexClient = getConvexClient();
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

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response =await openai.completions.create({
        model" 'gpt-4o-mini',
        prompt: `Generate a title for a YouTube video with the following video summary: "${videoSummary}" and considerations: "${considerations}"`,
        max_tokens: 500,
        n: 1,
        stop: ["\n"],
        });

        const title = response.choices[0]?.message?.content || "Failed to generate title";


        if (!title) {
            retunr  {
                success: false,
                error: "Failed to generate title",
            }
        }

        // await convexClient.mutation(api.titles)

    const response = await convexClient.generateTitle({
      videoId,
      videoSummary,
      considerations,
    });

    return response.title;
  } catch (e) {
    console.error(e);
    return "Failed to generate title";
  }
};
