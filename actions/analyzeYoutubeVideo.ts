"use server";

import { redirect } from "next/navigation";
import { ConvexHttpClient } from "convex/browser";
import getYoutubeVideoIdFromUrl from "@/lib/getVideoFromUrl";

export default async function analyzeYoutubeVideo(formData: FormData) {
  const url = formData.get("url") as string;

  if (!url) {
    throw new Error("URL is required");
  }

  try {
    const videoId = getYoutubeVideoIdFromUrl(url);
    if (!videoId) {
      throw new Error("Invalid YouTube URL");
    }

    // Redirect to the video analysis page
    redirect(`/video/${videoId}/analyze`);
  } catch (error) {
    console.error("Error analyzing video:", error);
    throw error;
  }
}
