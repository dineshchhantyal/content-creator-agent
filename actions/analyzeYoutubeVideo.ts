"use server";

import { redirect } from "next/navigation";

export default async function analyzeYoutubeVideo(formData: FormData) {
  const url = formData.get("url")?.toString();

  if (!url) {
    return;
  }

  return redirect(`/video/?url=${encodeURIComponent(url)}`);
}
