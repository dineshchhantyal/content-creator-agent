import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, FileText, Image as ImageIcon, ArrowRight } from "lucide-react";

interface VideoCardProps {
  video: Partial<{
    videoId: string;
    titles: { title: string }[];
    images: { url: string | null }[];
    hasTranscript: boolean;
    _creationTime: number;
  }>;
  index: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, index }) => {
  const { videoId, titles, images, hasTranscript, _creationTime } = video;

  const mainImage = images && images.length > 0 && images[0]?.url ? images[0].url : null;
  const safeVideoId = videoId || "default";
  const mainTitle = titles && titles.length > 0 && titles[0]?.title ? titles[0].title : `YouTube Video (${safeVideoId})`;
  const thumbnailUrl = mainImage || (safeVideoId && safeVideoId !== "default" ? `https://img.youtube.com/vi/${safeVideoId}/maxresdefault.jpg` : "/placeholder-thumbnail.png");
  const createdAt = _creationTime ? formatDistanceToNow(new Date(_creationTime), { addSuffix: true }) : "Recently";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 group">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={mainTitle}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/placeholder-thumbnail.png";
            }}
            unoptimized={thumbnailUrl.includes("youtube.com")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
            <Link href={`/video/${safeVideoId}/analyze`} className="text-white text-sm bg-purple-600/80 hover:bg-purple-600 px-3 py-2 rounded-md transition-colors">
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
            <Badge variant={images && images.length > 0 ? "default" : "outline"} className={`${images && images.length > 0 ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200" : ""}`}>
              <ImageIcon size={12} className="mr-1" />
              {images && images.length > 0 ? `${images.length} Thumbnails` : "No Thumbnails"}
            </Badge>
            <Badge variant={titles && titles.length > 0 ? "default" : "outline"} className={`${titles && titles.length > 0 ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200" : ""}`}>
              <Text size={12} className="mr-1" />
              {titles && titles.length > 0 ? `${titles.length} Titles` : "No Titles"}
            </Badge>
            <Badge variant={hasTranscript ? "default" : "outline"} className={`${hasTranscript ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200" : ""}`}>
              <FileText size={12} className="mr-1" />
              {hasTranscript ? "Transcript" : "No Transcript"}
            </Badge>
          </div>
        </CardContent>
        <div className="px-4 pb-4">
          <Link href={`/video/${safeVideoId}/analyze`} className="text-sm text-purple-600 dark:text-purple-400 font-medium hover:underline flex items-center">
            View Analysis <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

export default VideoCard;