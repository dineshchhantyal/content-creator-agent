"use server";

import { FeatureFlag, featureFlagEvents } from "@/components/features/flags";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { checkFeatureUsageLimit } from "@/lib/checkFeatureUsageLimit";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";

export interface VideoResponse {
  success: boolean;
  data?: Doc<"videos">;
  error?: string;
}

const createOrGetVideo = async (videoId: string): Promise<VideoResponse> => {
  const convex = getConvexClient();
  const user = await currentUser();

  if (!user?.id) {
    return {
      success: false,
      error: "User not found",
    };
  }

  const userId = user.id;

  // Check if user has permission to use this feature
  const featureCheck = await checkFeatureUsageLimit(
    userId,
    featureFlagEvents[FeatureFlag.ANALYZE_VIDEO].event
  );

  if (!featureCheck.success) {
    return {
      success: false,
      error: featureCheck.error,
    };
  }

  try {
    // First check if video already exists
    const existingVideo = await convex.query(api.videos.getVideoById, {
      videoId,
      userId,
    });

    if (existingVideo) {
      return {
        success: true,
        data: existingVideo,
      };
    }

    // If video doesn't exist, create a new one
    const newVideoId = await convex.mutation(api.videos.saveVideoAnalysis, {
      videoId,
      userId,
    });

    const newVideo = await convex.query(api.videos.getVideoById, {
      videoId: newVideoId,
      userId,
    });

    await client.track({
      event: featureFlagEvents[FeatureFlag.ANALYZE_VIDEO].event,
      company: {
        id: userId,
      },
      user: {
        id: userId,
      },
    });

    return {
      success: true,
      data: newVideo || undefined,
    };
  } catch (error) {
    console.error("Error in createOrGetVideo:", error);
    return {
      success: false,
      error:
        typeof error === "string" ? error : "Failed to create or get video",
    };
  }
};

export default createOrGetVideo;
