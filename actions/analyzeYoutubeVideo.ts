"use server";

import { redirect } from "next/navigation";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import getYoutubeVideoIdFromUrl from "@/lib/getVideoFromUrl";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default async function analyzeYoutubeVideo(formData: FormData) {
  const url = formData.get("url") as string;
  const userId = formData.get("userId") as string;

  if (!url) {
    throw new Error("URL is required");
  }

  try {
    const videoId = getYoutubeVideoIdFromUrl(url);
    if (!videoId) {
      throw new Error("Invalid YouTube URL");
    }

    // Save this video analysis to the database
    if (userId) {
      await convex.mutation(api.videos.saveVideoAnalysis, {
        videoId,
        userId,
      });
    }

    // Redirect to the video analysis page
    redirect(`/video/${videoId}/analyze`);
  } catch (error) {
    console.error("Error analyzing video:", error);
    throw error;
  }
}
