"use client";

import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import Usage from "../metrics/Usage";
import { FeatureFlag } from "../features/flags";
import Image from "next/image";
import { useImages } from "@/hooks/useImages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Plus, RefreshCw, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const ThumbnailGeneration = ({ videoId }: { videoId: string }) => {
  const { user } = useUser();
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    images = [],
    uploadImage,
    removeImage,
  } = useImages(videoId, user?.id ?? "");

  const generateNewThumbnail = async () => {
    setIsGenerating(true);
    // Simulate AI generation with a timeout
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, you'd call your AI service and then uploadImage with the result
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="border border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900/90 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex justify-between items-center">
            <span>Thumbnail Generation</span>
            <Usage
              featureFlag={FeatureFlag.IMAGE_GENERATION}
              title="Thumbnail Generation"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {images.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {images.map((image) => (
                  <div key={image._id} className="relative group">
                    {image.url && (
                      <div className="relative aspect-video rounded-md overflow-hidden border border-gray-200 dark:border-gray-800">
                        <Image
                          src={image.url}
                          alt={image.title || "Thumbnail"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="bg-white/90 hover:bg-white text-gray-800"
                            >
                              <Download size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeImage(image._id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full border-dashed border-gray-300 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700"
                onClick={generateNewThumbnail}
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
                No thumbnails generated yet. Generate your first AI thumbnail
                now.
              </p>
              <Button
                onClick={generateNewThumbnail}
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
                    <Plus size={16} className="mr-2" /> Generate Thumbnail
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

export default ThumbnailGeneration;
