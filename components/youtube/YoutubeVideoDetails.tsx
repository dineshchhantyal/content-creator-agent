"use client";

import getVideoDetails from "@/actions/getVideoDetails";
import { YoutubeVideoDetails as YoutubeVideoDetailsType } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, MessageCircle, ThumbsUp, Calendar, Users } from "lucide-react";
import formatNumber from "@/lib/formatNumber";

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
      <Card className="w-full bg-white dark:bg-gray-900 shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="flex space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!video) {
    return (
      <Card className="w-full bg-white dark:bg-gray-900 shadow-lg">
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
    <Card className="w-full bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="@container">
          <div className="@md:flex">
            {/* Video Thumbnail */}
            <div className="@md:w-2/5 relative overflow-hidden">
              <div className="aspect-video">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Video Details */}
            <div className="@md:w-3/5 p-6">
              <h2 className="text-xl md:text-2xl font-bold line-clamp-2 mb-2">
                {video.title}
              </h2>

              {/* Video Stats */}
              <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 gap-x-4 gap-y-2 mb-4">
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800/70 px-2 py-1 rounded-full">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{formatNumber(video.views)} views</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800/70 px-2 py-1 rounded-full">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{formatNumber(video.likes)}</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800/70 px-2 py-1 rounded-full">
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>{formatNumber(video.comments)}</span>
                </div>
              </div>

              {/* Published Date */}
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  Published {timeAgo} • {formattedDate}
                </span>
              </div>

              {/* Channel Info */}
              <div className="flex items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
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
              <div className="mt-6 flex gap-2">
                <a
                  href={`https://youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  Watch on YouTube
                </a>
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-md transition-colors">
                  Analyze Performance
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default YoutubeVideoDetails;
