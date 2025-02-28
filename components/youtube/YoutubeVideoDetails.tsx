"use client";

import getVideoDetails from "@/actions/getVideoDetails";
import { YoutubeVideoDetails as YoutubeVideoDetailsType } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Eye,
  MessageCircle,
  ThumbsUp,
  Calendar,
  Users,
  ExternalLink,
  BarChart2,
} from "lucide-react";
import formatNumber from "@/lib/formatNumber";
import { motion } from "framer-motion";

function YoutubeVideoDetails({ videoId }: { videoId: string }) {
  const [video, setVideo] = useState<YoutubeVideoDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      setIsLoading(true);
      try {
        const videoData = await getVideoDetails(videoId);
        setVideo(videoData);
      } catch (error) {
        console.error("Error fetching video details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  if (isLoading) {
    return (
      <Card className="border border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900/90 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <div className="p-6 space-y-4">
              <Skeleton className="h-7 w-3/4" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-5 w-56" />
              <div className="flex items-center space-x-3 pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!video) {
    return (
      <Card className="border border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              Could not load video details
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Format date to be more readable
  const publishedDate = new Date(video.publishedAt);
  const formattedDate = publishedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate time since publishing
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - publishedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let timeAgo;

  if (diffDays === 1) {
    timeAgo = "1 day ago";
  } else if (diffDays < 30) {
    timeAgo = `${diffDays} days ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    timeAgo = `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    timeAgo = `${years} ${years === 1 ? "year" : "years"} ago`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900/90 backdrop-blur-sm overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-xl sm:text-2xl font-bold line-clamp-2 text-white drop-shadow-sm">
                {video.title}
              </h2>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Video Stats */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="flex items-center gap-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-2.5 py-1 rounded-full text-sm font-medium">
              <Eye className="h-3.5 w-3.5" />
              <span>{formatNumber(video.views)} views</span>
            </span>
            <span className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2.5 py-1 rounded-full text-sm font-medium">
              <ThumbsUp className="h-3.5 w-3.5" />
              <span>{formatNumber(video.likes)}</span>
            </span>
            <span className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full text-sm font-medium">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{formatNumber(video.comments)}</span>
            </span>
          </div>

          {/* Published Date */}
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              Published {timeAgo} • {formattedDate}
            </span>
          </div>

          {/* Channel Info */}
          <div className="flex items-center pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3 ring-2 ring-purple-500/20">
              <Image
                src={video.channel.thumbnail}
                alt={video.channel.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium">{video.channel.title}</h4>
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <Users className="h-3 w-3" />
                <span>
                  {formatNumber(video.channel.subscribers)} subscribers
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              asChild
              variant="default"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            >
              <a
                href={`https://youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <ExternalLink size={14} /> Watch on YouTube
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-700"
            >
              <BarChart2 size={14} className="mr-1" /> Performance Metrics
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default YoutubeVideoDetails;
