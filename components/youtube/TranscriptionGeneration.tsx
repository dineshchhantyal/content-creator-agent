"use client";

import React, { useState } from "react";
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { FeatureFlag } from "../features/flags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, FileText, Loader2, Play, Plus, FileEdit } from "lucide-react";
import { motion } from "framer-motion";
import Usage from "../metrics/Usage";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import getYoutubeVideoTranscript, {
  TranscriptEntry,
} from "@/actions/getYoutubeVideoTranscript";

const TranscriptionGeneration = ({ videoId }: { videoId: string }) => {
  const [transcript, setTranscript] = useState<{
    transcript: TranscriptEntry[];
    fullText: string;
    isFromCache?: boolean;
  } | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [copiedTimestamp, setCopiedTimestamp] = useState<string | null>(null);

  const { featureUsageExceeded } = useSchematicEntitlement(
    FeatureFlag.TRANSCRIPTION
  );

  const generateTranscription = async () => {
    if (!videoId) {
      toast.error("Video ID is required to generate transcript");
      return;
    }

    setIsGenerating(true);

    try {
      const result = await getYoutubeVideoTranscript(videoId);

      if (!result.transcript || result.transcript.length === 0) {
        toast.error("No transcript found for this video");
        setIsGenerating(false);
        return;
      }

      // Generate full text from transcript segments
      const fullText = result.transcript.map((entry) => entry.text).join(" ");

      setTranscript({
        transcript: result.transcript,
        fullText: fullText,
        isFromCache: result.cache ? true : false,
      });

      setEditedText(fullText);

      // Display cache notice if applicable
      if (result.cache) {
        toast.info("Using cached transcript data", {
          description: "This transcript was retrieved from our database",
        });
      }
    } catch (error) {
      console.error("Error generating transcript:", error);
      toast.error("Failed to generate transcript", {
        description:
          "There was an error retrieving the transcript. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (timestamp: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTimestamp(timestamp);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedTimestamp(null), 2000);
  };

  const copyFullTranscript = () => {
    if (transcript) {
      navigator.clipboard.writeText(
        editMode ? editedText : transcript.fullText
      );
      toast.success("Full transcript copied to clipboard");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode && transcript) {
      setEditedText(transcript.fullText);
    }
  };

  const saveTranscript = () => {
    if (transcript) {
      setTranscript({
        ...transcript,
        fullText: editedText,
      });
      setEditMode(false);
      toast.success("Transcript changes saved");
      // Here you would typically save to your backend
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card className="border border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900/90 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center justify-between">
            <span>Transcription</span>
            {transcript?.isFromCache && (
              <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full">
                From cache
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Usage
              featureFlag={FeatureFlag.TRANSCRIPTION}
              title="Transcription Generation"
            />
          </div>

          {transcript ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  Video Transcript
                </h3>
                <div className="flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyFullTranscript}
                          className="h-8 px-2 text-gray-600 dark:text-gray-300"
                        >
                          <Copy size={14} className="mr-1" /> Copy All
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy full transcript</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={toggleEditMode}
                          className={`h-8 px-2 ${
                            editMode
                              ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800"
                              : "text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          <FileEdit size={14} className="mr-1" />{" "}
                          {editMode ? "Cancel Edit" : "Edit"}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit transcript</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {editMode ? (
                <div className="space-y-3">
                  <Textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="min-h-[200px] text-sm border-gray-200 dark:border-gray-700"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={saveTranscript}
                      className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 text-sm">
                  {transcript.transcript.map((entry, index) => (
                    <div
                      key={`entry-${index}`}
                      className="group flex justify-between items-start p-3 rounded-md border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 bg-gray-50 dark:bg-gray-800/30"
                    >
                      <div className="flex gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-14 justify-center text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <Play size={10} className="mr-1" /> {entry.timestamp}
                        </Button>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {entry.text}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          copyToClipboard(entry.timestamp, entry.text)
                        }
                        className={`transition-opacity h-6 w-6 p-0 ${
                          copiedTimestamp === entry.timestamp
                            ? "opacity-100 text-green-500"
                            : "opacity-0 group-hover:opacity-100 text-gray-500"
                        }`}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <FileText
                  size={24}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <div>
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  Create Video Transcript
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 max-w-md mx-auto">
                  Generate an accurate transcript of your video content that you
                  can edit, export, and use for creating subtitles.
                </p>
              </div>
              <Button
                onClick={generateTranscription}
                disabled={isGenerating || featureUsageExceeded}
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />{" "}
                    Generating...
                  </>
                ) : (
                  <>
                    <Plus size={16} className="mr-2" /> Generate Transcript
                  </>
                )}
              </Button>
              {featureUsageExceeded && (
                <p className="text-amber-600 dark:text-amber-400 text-sm">
                  You've reached your transcription limit.
                  <a
                    href="/settings/plan"
                    className="text-purple-600 dark:text-purple-400 ml-1 underline"
                  >
                    Upgrade your plan
                  </a>{" "}
                  to continue.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TranscriptionGeneration;
