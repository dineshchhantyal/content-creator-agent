import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import {
  Video,
  Search,
  Filter,
  Clock,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useUserVideos } from "@/hooks/useUserVideos";
import analyzeYoutubeVideo from "@/actions/analyzeYoutubeVideo";
import { EmptyState } from "./components"; // Importing the updated EmptyState component
import { VideoCard } from "./components"; // Importing VideoCard component
import { VideoCardSkeleton } from "./components"; // Importing VideoCardSkeleton component

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
    } catch (error) {
      console.error(error);
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
        <header className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="inline-block mb-2 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-900/30">
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400 flex items-center gap-1">
                    <Sparkles size={14} /> Creator Dashboard
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your content and analyze your YouTube videos
                </p>
              </div>

              <div className="flex-shrink-0">
                <form onSubmit={handleQuickAnalyze} className="flex gap-2">
                  <div className="relative">
                    <Video
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <Input
                      placeholder="Paste YouTube URL..."
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="pl-9 w-64 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                      disabled={isAnalyzing}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:opacity-90 text-white"
                    disabled={!videoUrl.trim() || isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      "Analyze"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </header>

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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex gap-2 items-center">
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search videos..."
                    className="pl-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-200 dark:border-gray-800"
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Sort by Latest</DropdownMenuItem>
                    <DropdownMenuItem>Sort by Oldest</DropdownMenuItem>
                    <DropdownMenuItem>Has Thumbnails</DropdownMenuItem>
                    <DropdownMenuItem>Has Titles</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {filteredVideos?.length || 0} videos
              </div>
            </div>

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

        {/* Activity Feed - Suggestion for future feature */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm mt-8">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* ActivityFeed component can be added here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}