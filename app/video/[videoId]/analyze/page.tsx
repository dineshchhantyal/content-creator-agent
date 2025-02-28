"use client";
import React from "react";
import YoutubeVideoDetails from "@/components/youtube/YoutubeVideoDetails";
import { FeatureFlag } from "@/components/features/flags";
import Usage from "@/components/metrics/Usage";
import { useParams } from "next/navigation";
import ThumbnailGeneration from "@/components/youtube/ThumbnailGeneration";
import TitleGenerations from "@/components/youtube/TitleGenerations";
import TranscriptionGeneration from "@/components/youtube/TranscriptionGeneration";
import { Sparkles } from "lucide-react";
import UpcomingFeatures from "@/components/metrics/UpcomingFeatures";

const VideoAnalyzePage = () => {
  const params = useParams<{ videoId: string }>();

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <header className="mb-8">
        <div className="inline-block mb-2 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-900/30">
          <span className="text-xs font-medium text-purple-600 dark:text-purple-400 flex items-center gap-1">
            <Sparkles size={14} /> AI Video Analysis
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Video Analysis Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get AI-powered insights and improvements for your YouTube content
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Analysis Section */}
          <div className="space-y-6">
            <Usage
              featureFlag={FeatureFlag.ANALYZE_VIDEO}
              title="Analysis Overview"
            />
            <YoutubeVideoDetails videoId={params.videoId} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ThumbnailGeneration videoId={params.videoId} />
              <TitleGenerations videoId={params.videoId} />
            </div>

            <TranscriptionGeneration videoId={params.videoId} />
          </div>
        </div>

        <div className="lg:sticky lg:top-6 h-[calc(100vh-6rem)] bg-white dark:bg-gray-900/90 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
          <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 px-6 py-4">
            <h2 className="font-semibold text-white">AI Assistant</h2>
            <p className="text-sm text-purple-100">
              Ask questions about your video
            </p>
          </div>
          <div className="p-4 h-[calc(100%-64px)] overflow-y-auto">
            {/* Chat will go here */}
            <div className="flex justify-center items-center h-full text-gray-400">
              <p>Chat feature coming soon</p>
            </div>
          </div>
          <UpcomingFeatures />
        </div>
      </div>
    </div>
  );
};

export default VideoAnalyzePage;
