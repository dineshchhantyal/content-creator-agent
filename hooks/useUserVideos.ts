import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useUserVideos() {
  const { user, isLoaded } = useUser();
  const userId = user?.id || "";

  const videos = useQuery(
    api.videos.getAllUserVideos,
    isLoaded ? { userId } : "skip"
  );

  return {
    videos,
    isLoading: !isLoaded || videos === undefined,
    isEmpty: isLoaded && Array.isArray(videos) && videos.length === 0,
  };
}
