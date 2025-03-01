import { client } from "@/lib/schematic";
import { tool } from "ai";
import { z } from "zod";
import { FeatureFlag } from "../features/flags";
import dalleImageGeneration from "@/actions/dalleImageGeneration";

export const generateImage = (userId: string) => ({
  type: "function" as const,
  function: {
    name: "generate_image",
    description: "Generate an AI thumbnail image for a YouTube video",
    parameters: z.object({
      videoId: z.string().describe("The video ID to generate a thumbnail for"),
      prompt: z
        .string()
        .describe(
          "The prompt to generate the thumbnail from (be descriptive and creative)"
        ),
    }),
    execute: async ({
      videoId,
      prompt,
    }: {
      videoId: string;
      prompt: string;
    }) => {
      try {
        // Create schematic context with userId
        const schematicContext = {
          company: {
            id: userId,
          },
          user: {
            id: userId,
          },
        };

        const isImageGenerationEnabled = await client.checkFlag(
          schematicContext,
          FeatureFlag.IMAGE_GENERATION
        );

        if (!isImageGenerationEnabled) {
          return {
            success: false,
            error:
              "Image generation is not enabled for your account. Please upgrade your plan to access this feature.",
          };
        }

        // Generate the image using DALL-E
        const result = await dalleImageGeneration(videoId, prompt || "");

        if (!result.success) {
          return {
            success: false,
            error: result.error || "Failed to generate image",
          };
        }

        return {
          success: true,
          message:
            "Successfully generated a new thumbnail image for your video.",
          images: result.images,
        };
      } catch (error) {
        console.error("Error generating image:", error);
        return {
          success: false,
          error: "Failed to generate image. Please try again later.",
        };
      }
    },
  },
});
