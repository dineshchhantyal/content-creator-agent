"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { Video, Text, Image as ImageIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useUserVideos } from "@/hooks/useUserVideos";
import analyzeYoutubeVideo from "@/actions/analyzeYoutubeVideo";

import {
  VideoCard,
  VideoCardSkeleton,
  EmptyState,
  SearchFilters,
  DashboardHeader,
  ActivityFeed,
} from "./components";

export default function DashboardPage() {
  const { user } = useUser();
  const { videos, isLoading, isEmpty } = useUserVideos();
  const [searchQuery, setSearchQuery] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleQuickAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("url", videoUrl);
    if (user?.id) {
      formData.append("userId", user.id);
    }

    try {
      await analyzeYoutubeVideo(formData);
      // Reset the input and refresh videos if needed
      setVideoUrl("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Filter videos based on search query
  const filteredVideos = videos?.filter(
    (video) =>
      video.videoId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.titles?.some((title) =>
        title.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Gradient background */}
      <div className="absolute inset-0 h-64 bg-gradient-to-b from-purple-50/50 to-transparent dark:from-gray-900 dark:to-transparent -z-10" />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <DashboardHeader
          user={user}
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          isAnalyzing={isAnalyzing}
          handleQuickAnalyze={handleQuickAnalyze}
        />

        <Tabs defaultValue="videos" className="mb-8">
          <TabsList>
            <TabsTrigger value="videos" className="flex gap-2">
              <Video size={16} />
              <span className="hidden sm:inline">My Videos</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex gap-2" disabled>
              <Text size={16} />
              <span className="hidden sm:inline">Scripts</span>
              <Badge variant="outline" className="ml-1 text-xs">
                Soon
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex gap-2" disabled>
              <ImageIcon size={16} />
              <span className="hidden sm:inline">Thumbnails</span>
              <Badge variant="outline" className="ml-1 text-xs">
                Soon
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="mt-6">
            <SearchFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              totalVideos={filteredVideos?.length || 0}
            />

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <VideoCardSkeleton key={i} />
                ))}
              </div>
            ) : isEmpty || !filteredVideos?.length ? (
              <EmptyState />
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {filteredVideos.map((video, index) => (
                  <VideoCard key={video.videoId} video={video} index={index} />
                ))}
              </motion.div>
            )}
          </TabsContent>
        </Tabs>

        <ActivityFeed />
      </div>
    </div>
  );
}
