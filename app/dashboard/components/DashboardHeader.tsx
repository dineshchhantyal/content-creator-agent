import React from "react";
import { motion } from "framer-motion";
import { Video, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserResource } from "@clerk/types";
interface DashboardHeaderProps {
  user: UserResource | null | undefined;
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  isAnalyzing: boolean;
  handleQuickAnalyze: (e: React.FormEvent) => Promise<void>;
}

const DashboardHeader = ({
  user,
  videoUrl,
  setVideoUrl,
  isAnalyzing,
  handleQuickAnalyze,
}: DashboardHeaderProps) => {
  return (
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
  );
};

export default DashboardHeader;
