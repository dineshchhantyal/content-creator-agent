"use client";

import React, { useState } from "react";
import YoutubeVideoDetails from "@/components/youtube/YoutubeVideoDetails";
import { FeatureFlag } from "@/components/features/flags";
import Usage from "@/components/metrics/Usage";
import { useParams } from "next/navigation";
import ThumbnailGeneration from "@/components/youtube/ThumbnailGeneration";
import TitleGenerations from "@/components/youtube/TitleGenerations";
import TranscriptionGeneration from "@/components/youtube/TranscriptionGeneration";
import {
  ArrowLeft,
  ChevronRight,
  Maximize2,
  MessageSquare,
  Minimize2,
  Sparkles,
} from "lucide-react";
import UpcomingFeatures from "@/components/metrics/UpcomingFeatures";
import AiAgentChat from "@/components/ai-tools/ai-agent-chat";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const VideoAnalyzePage = () => {
  const params = useParams<{ videoId: string }>();
  const [chatExpanded, setChatExpanded] = useState(false);

  const toggleChatExpansion = () => {
    setChatExpanded(!chatExpanded);
  };

  return (
    <>
      {/* Gradient background */}
      <div className="absolute inset-0 h-48 bg-gradient-to-b from-purple-50/50 to-white dark:from-gray-900 dark:to-gray-950 -z-10" />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Link
            href="/dashboard"
            className="hover:text-purple-600 dark:hover:text-purple-400 flex items-center"
          >
            <ArrowLeft size={14} className="mr-1" /> Back to Dashboard
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900 dark:text-gray-200">
            Video Analysis
          </span>
        </div>

        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-block mb-2 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-900/30">
            <span className="text-xs font-medium text-purple-600 dark:text-purple-400 flex items-center gap-1">
              <Sparkles size={14} /> AI Video Analysis
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Video Analysis Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Get AI-powered insights and improvements for your YouTube
                content
              </p>
            </div>
            <Button
              variant="outline"
              className="sm:hidden flex items-center gap-2 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400"
              onClick={toggleChatExpansion}
            >
              <MessageSquare className="h-4 w-4" />
              {chatExpanded ? "Hide Assistant" : "Show AI Assistant"}
            </Button>
          </div>
        </motion.header>

        <div
          className={`grid grid-cols-1 ${
            chatExpanded ? "lg:grid-cols-2" : "lg:grid-cols-3"
          } gap-6`}
        >
          <div
            className={`space-y-6 ${
              chatExpanded ? "lg:col-span-1" : "lg:col-span-2"
            } ${chatExpanded && "hidden sm:block"}`}
          >
            {/* Analysis Section */}
            <div className="space-y-6">
              <Usage
                featureFlag={FeatureFlag.ANALYZE_VIDEO}
                title="Analysis Overview"
              />
              <YoutubeVideoDetails videoId={params.videoId} />

              {!chatExpanded && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ThumbnailGeneration videoId={params.videoId} />
                    <TitleGenerations videoId={params.videoId} />
                  </div>
                  <TranscriptionGeneration videoId={params.videoId} />
                </>
              )}
            </div>
          </div>

          {/* Mobile chat (hidden on desktop) */}
          {chatExpanded && (
            <div className="block sm:hidden">
              <div className="bg-white dark:bg-gray-900/90 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800 h-[800px]">
                <AiAgentChat videoId={params.videoId} />
              </div>
            </div>
          )}

          {/* Desktop chat sidebar - Fixed height */}
          <div
            className={`hidden sm:block ${
              chatExpanded ? "lg:col-span-1" : ""
            } lg:sticky lg:top-6 h-[800px] bg-white dark:bg-gray-900/90 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800`}
          >
            <div className="relative h-full">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 h-6 w-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm text-gray-500"
                onClick={toggleChatExpansion}
                aria-label={chatExpanded ? "Minimize chat" : "Expand chat"}
              >
                {chatExpanded ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" />
                )}
              </Button>
              <AiAgentChat videoId={params.videoId} />
            </div>
          </div>
        </div>

        {/* Show additional content when chat is not expanded */}
        {!chatExpanded && (
          <div className="mt-6 space-y-6">
            <UpcomingFeatures />
          </div>
        )}
      </div>
    </>
  );
};

export default VideoAnalyzePage;
