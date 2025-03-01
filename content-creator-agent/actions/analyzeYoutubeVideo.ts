import { Video } from "lucide-react";

async function analyzeYoutubeVideo(formData: FormData) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to analyze the video");
  }

  return response.json();
}

export default analyzeYoutubeVideo;