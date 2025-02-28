import getYoutubeVideoTranscript from "@/actions/getYoutubeVideoTranscript";
import { tool } from "ai";
import { z } from "zod";

const fetchTranscript = tool({
  description: "Fetch the transcript of youtube vidde in segments",
  parameters: z.object({
    videoId: z.string().describe("The video ID to fetch the transcript for"),
  }),
  execute: async ({ videoId }) => {
    const transcript = await getYoutubeVideoTranscript(videoId);
    return { transcript, cache: transcript.cache };
  },
});

export default fetchTranscript;
