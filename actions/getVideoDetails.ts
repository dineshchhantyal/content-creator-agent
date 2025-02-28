"use server";

import { YoutubeVideoDetails } from "@/types/types";
import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

const getVideoDetails = async (videoId: string) => {
  try {
    const response = await youtube.videos.list({
      part: ["snippet", "statistics"],
      id: [videoId],
    });

    const videoDetails = response.data.items?.[0];
    if (!videoDetails) {
      throw new Error("Video not found");
    }

    const channelResponse = await youtube.channels.list({
      part: ["snippet", "statistics"],
      id: [videoDetails.snippet?.channelId || ""],
    });

    const video: YoutubeVideoDetails = {
      title: videoDetails.snippet?.title || "Unknown",
      thumbnail:
        videoDetails.snippet?.thumbnails?.high?.url ||
        videoDetails.snippet?.thumbnails?.default?.url ||
        videoDetails.snippet?.thumbnails?.medium?.url ||
        "",
      publishedAt:
        videoDetails.snippet?.publishedAt || new Date().toISOString(),
      views: videoDetails.statistics?.viewCount || "0",
      likes: videoDetails.statistics?.likeCount || "0",
      comments: videoDetails.statistics?.commentCount || "0",
      channel: {
        title: channelResponse.data.items?.[0].snippet?.title || "Unknown",
        thumbnail:
          channelResponse.data.items?.[0].snippet?.thumbnails?.default?.url ||
          channelResponse.data.items?.[0].snippet?.thumbnails?.medium?.url ||
          channelResponse.data.items?.[0].snippet?.thumbnails?.high?.url ||
          "",
        subscribers:
          channelResponse.data.items?.[0].statistics?.subscriberCount || "0",
      },
    };

    return video;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default getVideoDetails;
