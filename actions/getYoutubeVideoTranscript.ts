import { api } from "@/convex/_generated/api";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Innertube } from "youtubei.js";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export interface TranscriptEntry {
  text: string;
  timestamp: string;
}

const youtube = await Innertube.create({
  lang: "en",
  location: "US",
  retrieve_player: false,
});

const formatTimestamp = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const formattedSeconds = seconds % 60;
  const formattedMinutes = minutes % 60;

  return `${hours}:${formattedMinutes}:${formattedSeconds}`;
};

const fetchTranscript = async (videoId: string): Promise<TranscriptEntry[]> => {
  try {
    const info = await youtube.getInfo(videoId);
    const transcriptData = await info.getTranscript();

    const transcript: TranscriptEntry[] =
      transcriptData.transcript.content?.body?.initial_segments?.map(
        (segment) => ({
          text: segment.snippet?.text || "",
          timestamp: formatTimestamp(Number(segment.start_ms)),
        })
      ) ?? [];

    return transcript;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const getYoutubeVideoTranscript = async (videoId: string) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not found");
  }

  // if in database use it
  const existingTranscript = await convex.query(
    api.transcript.getTranscriptByVideoId,
    { videoId, userId: user.id }
  );

  if (existingTranscript) {
    return {
      transcript: existingTranscript.transcript,
      cache: "This transcript was cached",
    };
  }

  // if not, fetch from youtube
  try {
    const transcript = await fetchTranscript(videoId);

    // save to database

    await convex.mutation(api.transcript.saveTranscript, {
      userId: user.id,
      videoId,
      transcript,
    });

    return {
      transcript,
      cache: false,
    };
  } catch (e) {
    console.error(e);
    return {
      transcript: [],
      cache: false,
    };
  }
};

export default getYoutubeVideoTranscript;
