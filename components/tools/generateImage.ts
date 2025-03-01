import { client } from "@/lib/schematic";
import { tool } from "ai";
import { z } from "zod";
import { FeatureFlag } from "../features/flags";
import dalleImageGeneration from "@/actions/dalleImageGeneration";

const imageSchema = z.object({
  videoId: z.string().describe("The video ID to generate a thumbnail for"),
  prompt: z
    .string()
    .describe(
      "The prompt to generate the thumbnail from (be descriptive and creative)"
    ),
});

export const generateImage = (userId: string) =>
  tool({
    description: "Generate an AI thumbnail image for a YouTube video",
    parameters: imageSchema,
    execute: async (input: z.infer<typeof imageSchema>) => {
      try {
        const { videoId, prompt } = input;

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

        if (!result?.success) {
          return {
            success: false,
            error: result?.error || "Failed to generate image",
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
  });
