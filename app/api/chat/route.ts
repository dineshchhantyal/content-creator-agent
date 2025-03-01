import { streamText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import getVideoDetails from "@/actions/getVideoDetails";
import fetchTranscript from "@/components/tools/fetchTranscript";
import { generateImage } from "@/components/tools/generateImage";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import generateTitle from "@/components/tools/generateTitle";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, videoId } = await req.json();
  const user = await currentUser();

  if (!user) {
    return new Response(
      JSON.stringify({
        error: "User not found",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    // Get video details to personalize the AI experience
    const videoDetails = await getVideoDetails(videoId);

    // Create a personalized system message using video details
    const systemMessage = {
      role: "system",
      content: `You are VideoGenius, an AI assistant specialized in analyzing YouTube videos.

You're currently analyzing the video "${JSON.stringify(
        videoDetails
      )}" to provide actionable insights for content creators. Let's get started! 🚀
Instructions:
1. Address the video specifically by its title "${
        videoDetails?.title || "this video"
      }" to create a personalized experience.

2. Maintain a friendly, conversational tone with occasional emojis 🎬✨ to make interactions engaging.

3. Draw on these video statistics when relevant to provide context-aware insights.

4. Format responses with clear headings, bullet points, and sections that would work well in tools like Notion.

5. For any analysis, provide:
   - Content summary
   - Target audience insights
   - Engagement analysis based on metrics
   - Actionable improvement suggestions

6. If errors occur:
   - Explain the issue clearly and apologize for the inconvenience
   - Suggest trying again later

7. If the user hits usage limits:
   - Explain they need to upgrade to continue using this feature
   - Direct them to "Manage Plan" in the header navigation
   - Example: "It looks like you've reached your usage limit for video analysis. To continue gaining insights about '${
     videoDetails?.title || "this video"
   }', please upgrade your plan by clicking on 'Manage Plan' in the header."

8. If using previously analyzed data:
   - Explain that we're using data already in our database from earlier analysis
   - Emphasize this saves the user time and processing resources

Focus on being helpful, specific, and providing actionable insights that will genuinely improve the user's content.`,
    };

    // Add the system message to the beginning of the conversation
    const augmentedMessages = [systemMessage, ...messages];

    // Stream the response using the enhanced messages
    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages: augmentedMessages,
      tools: {
        transcription: fetchTranscript,
        generatesImages: generateImage(videoId),
        title: generateTitle,
        getVIdeoDetails: tool({
          description: "Get video details",
          parameters: z.object({
            videoId: z.string().describe("The video ID to fetch details for"),
          }),
          execute: async ({ videoId }) => {
            return { videoDetails: getVideoDetails(videoId) };
          },
        }),
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in chat API:", error);

    // Return a graceful error response
    return new Response(
      JSON.stringify({
        error: "Failed to process your request. Please try again later.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
