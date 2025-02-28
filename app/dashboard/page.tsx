"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import {
  Video,
  Search,
  Filter,
  Clock,
  Sparkles,
  FileText,
  Image as ImageIcon,
  Text,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
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
            <CardDescription>
              Your latest interactions and analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6 border-l border-gray-200 dark:border-gray-800 space-y-4">
              <div className="relative">
                <div className="absolute -left-[25px] rounded-full w-4 h-4 bg-purple-100 dark:bg-purple-900/30 ring-4 ring-white dark:ring-gray-950 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                </div>
                <div className="text-sm">
                  <p>
                    <span className="font-medium">Analyzed video</span>{" "}
                    <span className="text-gray-500 dark:text-gray-400">
                      2 hours ago
                    </span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    You analyzed a new YouTube video
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[25px] rounded-full w-4 h-4 bg-blue-100 dark:bg-blue-900/30 ring-4 ring-white dark:ring-gray-950 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
                <div className="text-sm">
                  <p>
                    <span className="font-medium">Generated thumbnails</span>{" "}
                    <span className="text-gray-500 dark:text-gray-400">
                      Yesterday
                    </span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    You generated 3 new thumbnails
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[25px] rounded-full w-4 h-4 bg-amber-100 dark:bg-amber-900/30 ring-4 ring-white dark:ring-gray-950 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                </div>
                <div className="text-sm">
                  <p>
                    <span className="font-medium">Account created</span>{" "}
                    <span className="text-gray-500 dark:text-gray-400">
                      1 week ago
                    </span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    You created your CreatorAI account
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function VideoCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      <div className="p-4">
        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2 w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4 w-1/2" />
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function VideoCard({ video, index }: { video: any; index: number }) {
  const { videoId, titles, images, hasTranscript, _creationTime } = video;
  const mainImage = images && images.length > 0 ? images[0].url : null;
  const mainTitle =
    titles && titles.length > 0
      ? titles[0].title
      : `YouTube Video (${videoId})`;

  // Default YouTube thumbnail if no generated image
  const thumbnailUrl =
    mainImage || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const createdAt = _creationTime
    ? formatDistanceToNow(new Date(_creationTime), { addSuffix: true })
    : "Recently";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 group">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={mainTitle}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
            <Link
              href={`/video/${videoId}/analyze`}
              className="text-white text-sm bg-purple-600/80 hover:bg-purple-600 px-3 py-2 rounded-md transition-colors"
            >
              View Analysis
            </Link>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-1 line-clamp-2" title={mainTitle}>
            {mainTitle}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mb-3">
            <Clock size={14} className="mr-1" /> {createdAt}
          </p>
          <div className="flex gap-2 mt-2">
            <Badge
              variant={images && images.length > 0 ? "default" : "outline"}
              className={`${
                images && images.length > 0
                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200"
                  : ""
              }`}
            >
              <ImageIcon size={12} className="mr-1" />
              {images && images.length > 0
                ? `${images.length} Thumbnails`
                : "No Thumbnails"}
            </Badge>

            <Badge
              variant={titles && titles.length > 0 ? "default" : "outline"}
              className={`${
                titles && titles.length > 0
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200"
                  : ""
              }`}
            >
              <Text size={12} className="mr-1" />
              {titles && titles.length > 0
                ? `${titles.length} Titles`
                : "No Titles"}
            </Badge>

            <Badge
              variant={hasTranscript ? "default" : "outline"}
              className={`${
                hasTranscript
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200"
                  : ""
              }`}
            >
              <FileText size={12} className="mr-1" />
              {hasTranscript ? "Transcript" : "No Transcript"}
            </Badge>
          </div>
        </CardContent>
        <div className="px-4 pb-4">
          <Link
            href={`/video/${videoId}/analyze`}
            className="text-sm text-purple-600 dark:text-purple-400 font-medium hover:underline flex items-center"
          >
            View Analysis <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div className="text-center p-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-900/50">
      <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
        <Video className="h-7 w-7 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 className="text-xl font-medium mb-2">No videos analyzed yet</h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
        Paste a YouTube URL in the input above to analyze your first video and
        get AI-powered insights.
      </p>
      <Button
        className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:opacity-90 text-white"
        asChild
      >
        <Link href="/">Try it now</Link>
      </Button>
    </div>
  );
}
