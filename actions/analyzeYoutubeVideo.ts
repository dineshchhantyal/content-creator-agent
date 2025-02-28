"use server";

import getYoutubeVideoIdFromUrl from "@/lib/getVideoFromUrl";
import { redirect } from "next/navigation";

export default async function analyzeYoutubeVideo(formData: FormData) {
  const url = formData.get("url")?.toString();
  if (!url) {
    return;
  }
  const videoId = getYoutubeVideoIdFromUrl(url);
  if (!videoId) {
    return;
  }

  redirect(`/video/${videoId}/analyze`);
}
