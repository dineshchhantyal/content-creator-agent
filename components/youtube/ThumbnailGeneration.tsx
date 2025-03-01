"use client";

import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import Usage from "../metrics/Usage";
import { FeatureFlag } from "../features/flags";
import { useImages } from "@/hooks/useImages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  Loader2,
  Plus,
  RefreshCw,
  Trash2,
  ImageIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { toast } from "sonner";
import dalleImageGeneration from "@/actions/dalleImageGeneration";

const ThumbnailGeneration = ({ videoId }: { videoId: string }) => {
  const { user } = useUser();
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const {
    images = [],
    removeImage,
    refreshImages,
  } = useImages(videoId, user?.id ?? "");

  const { featureUsageExceeded, featureAllocation } = useSchematicEntitlement(
    FeatureFlag.IMAGE_GENERATION
  );

  const generateNewThumbnail = async () => {
    if (!user?.id) {
      toast.error("You must be logged in to generate images");
      return;
    }

    setIsGenerating(true);

    try {
      // Generate a default prompt if none provided
      const finalPrompt =
        prompt ||
        `Create an eye-catching YouTube thumbnail for a video about ${videoId}. Make it vibrant, professional, and engaging with strong visual elements.`;

      // Call the DALL-E image generation
      const result = await dalleImageGeneration(videoId, finalPrompt);

      if (!result.success) {
        toast.error(result.error || "Failed to generate thumbnail");
        return;
      }

      // Refresh the images list
      await refreshImages();

      toast.success("New thumbnail generated successfully!");
    } catch (error) {
      console.error("Error generating thumbnail:", error);
      toast.error("Failed to generate thumbnail. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (url: string, filename = "thumbnail.png") => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      link.click();

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error("Failed to download image");
      console.error("Download error:", error);
    }
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="border border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900/90 backdrop-blur-sm">
        <CardHeader className="pb-2">
          {(!featureUsageExceeded || featureAllocation === 0) && (
            <Usage
              featureFlag={FeatureFlag.IMAGE_GENERATION}
              title="Thumbnail Generation"
            />
          )}
        </CardHeader>

        <CardContent className="pt-0">
          {featureUsageExceeded &&
          featureAllocation &&
          featureAllocation > 0 ? (
            <div className="text-center py-6">
              <p className="text-amber-600 dark:text-amber-400 mb-2">
                You've reached your limit for image generation.
              </p>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/settings/plan")}
              >
                Upgrade Plan
              </Button>
            </div>
          ) : images.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {images.map((image) => (
                  <div key={image._id} className="relative group">
                    <div className="relative aspect-video rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
                      {/* Check if the image URL exists and is valid */}
                      {image.url &&
                      image.url.trim() !== "" &&
                      !imageErrors[image._id] ? (
                        // Using img tag instead of Next.js Image to avoid URL validation issues
                        <img
                          src={image.url}
                          alt={image.title || "Thumbnail"}
                          onError={() => handleImageError(image._id)}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon className="h-10 w-10 text-gray-400" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          {image.url && !imageErrors[image._id] && (
                            <Button
                              size="sm"
                              variant="secondary"
                              className="bg-white/90 hover:bg-white text-gray-800"
                              onClick={() =>
                                handleDownload(
                                  image.url!,
                                  `thumbnail-${image._id}.png`
                                )
                              }
                            >
                              <Download size={16} />
                            </Button>
                          )}
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
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full border-dashed border-gray-300 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700"
                onClick={generateNewThumbnail}
                disabled={isGenerating || featureUsageExceeded}
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
                No thumbnails generated yet. Create your first AI thumbnail now.
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
