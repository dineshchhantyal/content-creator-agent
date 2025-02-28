import { Tool } from "ai";

export function generateImage(videoId: string): Tool {
  return {
    type: "image",
    title: "Video Thumbnail",
    description: "Generate a thumbnail for your video",
    image: {
      type: "video",
      id: videoId,
    },
  };
}
