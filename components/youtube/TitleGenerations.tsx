"use client";

import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import Usage from "../metrics/Usage";
import { FeatureFlag } from "../features/flags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy, Loader2, Plus, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const TitleGenerations = ({ videoId }: { videoId: string }) => {
  const { user } = useUser();
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Example titles - in a real app, you'd fetch these from your API
  const titles: { id: string; text: string }[] = [];

  const generateNewTitles = async () => {
    setIsGenerating(true);
    // Simulate AI generation with a timeout
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, you'd call your AI service and save the results
    }, 2000);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="border border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900/90 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex justify-between items-center">
            <span>Title Generation</span>
            <Usage
              featureFlag={FeatureFlag.TITLE_GENERATION}
              title="Title Generation"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {titles.length > 0 ? (
            <div className="space-y-4">
              <div className="space-y-3">
                {titles.map((title) => (
                  <div
                    key={title.id}
                    className="group flex justify-between items-center p-3 rounded-md border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 bg-gray-50 dark:bg-gray-800/30"
                  >
                    <p className="text-sm font-medium">{title.text}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(title.id, title.text)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copiedId === title.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full border-dashed border-gray-300 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700"
                onClick={generateNewTitles}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />{" "}
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} className="mr-2" /> Generate More
                    Titles
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="text-center py-10 space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Plus
                  size={24}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                No titles generated yet. Generate AI-optimized titles that
                increase your click-through rate.
              </p>
              <Button
                onClick={generateNewTitles}
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />{" "}
                    Generating...
                  </>
                ) : (
                  <>
                    <Plus size={16} className="mr-2" /> Generate Titles
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TitleGenerations;
