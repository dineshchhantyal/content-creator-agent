import { tool } from "ai";
import { z } from "zod";

const generateTitle = tool({
  description: "Generate a title for a YouTube video",
  parameters: z.object({
    videoId: z.string().describe("The video ID to generate a title for"),
    videoSummary: z
      .string()
      .describe("The video summary to generate the title for"),
    considerations: z
      .string()
      .describe(
        "Any considerations to take into account when generating the title"
      ),
  }),
  execute: async ({
    videoId,
    videSummary,
    considerations,
  }: {
    videoId: string;
    videoSummary: string;
    considerations: string;
  }) => {
    const title = await titleGenerations(videoId, videoSummary, considerations);
    return {
      success: true,
      title,
    };
  },
});

export default generateTitle;
