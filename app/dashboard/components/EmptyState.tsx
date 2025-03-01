import React from "react";
import { motion } from "framer-motion";
import { Youtube, PlayCircle, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-10 text-center border border-gray-200 dark:border-gray-800"
    >
      <div className="mx-auto w-20 h-20 mb-6 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
        <Youtube size={32} className="text-purple-600 dark:text-purple-400" />
      </div>

      <h3 className="text-2xl font-bold mb-3">Ready to boost your content?</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Analyze your YouTube videos to get AI-powered insights, generate
        eye-catching thumbnails, and optimize your content for better
        engagement.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
        <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800/50">
          <PlayCircle className="h-8 w-8 text-purple-500 dark:text-purple-400 mb-2 mx-auto" />
          <h4 className="font-medium">Analyze Videos</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Get AI insights about your content
          </p>
        </div>
        <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800/50">
          <Sparkles className="h-8 w-8 text-blue-500 dark:text-blue-400 mb-2 mx-auto" />
          <h4 className="font-medium">Generate Assets</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Create thumbnails and titles
          </p>
        </div>
        <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800/50">
          <TrendingUp className="h-8 w-8 text-green-500 dark:text-green-400 mb-2 mx-auto" />
          <h4 className="font-medium">Improve Performance</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Boost your channel metrics
          </p>
        </div>
      </div>

      <Button
        size="lg"
        className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:opacity-90 text-white"
        onClick={() =>
          (
            document.querySelector(
              'input[placeholder="Paste YouTube URL..."]'
            ) as HTMLInputElement
          )?.focus()
        }
      >
        Analyze Your First Video
      </Button>
    </motion.div>
  );
};

export default EmptyState;
