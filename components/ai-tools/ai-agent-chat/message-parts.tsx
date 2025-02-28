import React from "react";
import { MessagePart } from "./types";
import { CommandIcon, BrainIcon, CheckCircleIcon } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { TranscriptEntry } from "@/actions/getYoutubeVideoTranscript";

interface MessagePartProps {
  part: MessagePart;
}

export function TextPart({ part }: MessagePartProps) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
    >
      {part.text || part.content || ""}
    </Markdown>
  );
}

export function ToolInvocationPart({ part }: MessagePartProps) {
  // Extract tool result data
  const toolName = part.toolInvocation?.toolName || "Video Analysis";
  // @ts-ignore
  const toolResult = part.toolInvocation?.result;
  const toolInput = part.toolInvocation?.state || "Processing...";

  // Format the result for display
  const renderToolResult = () => {
    if (!toolResult) return null;

    // If it's a simple string
    if (typeof toolResult === "string") {
      return (
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {toolResult}
        </Markdown>
      );
    }

    // If it's an object with specific properties we want to display nicely
    if (typeof toolResult === "object" && toolResult !== null) {
      // Check for transcript data
      if (
        toolResult.transcript !== undefined ||
        toolResult.text !== undefined
      ) {
        // Handle different transcript formats
        let isCached = false;
        let transcriptData = null;

        try {
          // Check for cache flag
          if (toolResult.cache !== undefined) {
            isCached = Boolean(toolResult.cache);
          }

          // Handle array format transcript (from getYoutubeVideoTranscript)
          if (Array.isArray(toolResult.transcript)) {
            transcriptData = toolResult.transcript;

            return (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <CheckCircleIcon className="h-3 w-3" />
                  Transcript Retrieved
                  {isCached && (
                    <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-1.5 py-0.5 rounded-full">
                      From cache
                    </span>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto border border-amber-200/30 dark:border-amber-700/30 rounded bg-amber-50/50 dark:bg-amber-900/20 text-xs">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-amber-100/80 dark:bg-amber-900/80 backdrop-blur-sm">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium text-amber-900 dark:text-amber-100 border-b border-amber-200/50 dark:border-amber-700/50">
                          Time
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-amber-900 dark:text-amber-100 border-b border-amber-200/50 dark:border-amber-700/50">
                          Content
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transcriptData.map(
                        (entry: TranscriptEntry, idx: number) => (
                          <tr
                            key={`transcript-${idx}`}
                            className={
                              idx % 2 === 0
                                ? "bg-amber-50/50 dark:bg-amber-900/10"
                                : "bg-amber-100/20 dark:bg-amber-900/20"
                            }
                          >
                            <td className="px-3 py-1.5 font-mono text-amber-800 dark:text-amber-300 border-b border-amber-100/30 dark:border-amber-800/30 whitespace-nowrap">
                              {entry.timestamp}
                            </td>
                            <td className="px-3 py-1.5 text-amber-900 dark:text-amber-50 border-b border-amber-100/30 dark:border-amber-800/30">
                              {entry.text}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }

          // Handle string transcript
          let transcriptText = "";
          if (typeof toolResult.transcript === "string") {
            transcriptText = toolResult.transcript;
          } else if (typeof toolResult.text === "string") {
            transcriptText = toolResult.text;
          } else if (
            typeof toolResult.transcript === "object" &&
            toolResult.transcript
          ) {
            if (typeof toolResult.transcript.text === "string") {
              transcriptText = toolResult.transcript.text;
            } else {
              transcriptText = JSON.stringify(toolResult.transcript, null, 2);
            }
          } else {
            transcriptText = JSON.stringify(
              toolResult.transcript || toolResult.text,
              null,
              2
            );
          }

          return (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <CheckCircleIcon className="h-3 w-3" />
                Transcript Retrieved
                {isCached && (
                  <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-1.5 py-0.5 rounded-full">
                    From cache
                  </span>
                )}
              </div>
              <div className="max-h-48 overflow-y-auto border border-amber-200/30 dark:border-amber-700/30 rounded p-2 bg-amber-50/50 dark:bg-amber-900/20 text-xs">
                {transcriptText}
              </div>
            </div>
          );
        } catch (e) {
          console.error("Error parsing transcript:", e);
          return (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                <CheckCircleIcon className="h-3 w-3" />
                Error Displaying Transcript
              </div>
              <div className="max-h-48 overflow-y-auto border border-red-200/30 dark:border-red-700/30 rounded p-2 bg-red-50/50 dark:bg-red-900/20 text-xs">
                There was an error parsing the transcript data. Please try
                again.
              </div>
            </div>
          );
        }
      }

      // Check for statistics or metrics
      if (
        toolResult.statistics !== undefined ||
        toolResult.metrics !== undefined ||
        toolResult.viewCount !== undefined ||
        toolResult.likeCount !== undefined
      ) {
        // Create a safe copy of entries we can render
        const safeEntries: [string, string][] = [];

        try {
          Object.entries(toolResult).forEach(([key, value]) => {
            // Skip properties that aren't primitive values
            if (value === null || value === undefined) {
              safeEntries.push([key, "N/A"]);
            } else if (typeof value !== "object") {
              safeEntries.push([key, String(value)]);
            } else {
              // For objects, stringify them
              safeEntries.push([key, JSON.stringify(value)]);
            }
          });
        } catch (e) {
          console.error("Error processing stats:", e);
        }

        return (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <CheckCircleIcon className="h-3 w-3" />
              Video Statistics Retrieved
            </div>
            <div className="grid grid-cols-2 gap-2">
              {safeEntries.map(([key, value], index) => (
                <div
                  key={`${key}-${index}`}
                  className="border border-amber-200/30 dark:border-amber-700/30 rounded p-2 bg-amber-50/50 dark:bg-amber-900/20"
                >
                  <div className="text-xs font-medium capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div className="text-xs mt-1">{value}</div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      // For any other object, format it nicely but safely
      try {
        const safeJsonString = JSON.stringify(toolResult, null, 2);

        return (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <CheckCircleIcon className="h-3 w-3" />
              Tool Results
            </div>
            <div className="font-mono text-xs overflow-x-auto max-h-40 overflow-y-auto border border-amber-200/30 dark:border-amber-700/30 rounded p-2 bg-amber-50/50 dark:bg-amber-900/20">
              <pre className="whitespace-pre-wrap">{safeJsonString}</pre>
            </div>
          </div>
        );
      } catch (e) {
        console.error("Error rendering tool result:", e);
        return <div className="text-xs">Complex result (cannot display)</div>;
      }
    }

    // Fallback for any other type
    return <div className="text-xs">Tool processed successfully</div>;
  };

  // Format tool input safely for display
  const renderToolInput = () => {
    if (toolInput === null || toolInput === undefined) {
      return "No input provided";
    }

    if (typeof toolInput === "string") {
      return toolInput;
    }

    try {
      return JSON.stringify(toolInput);
    } catch (e) {
      return "Complex input";
    }
  };

  return (
    <div className="my-2 rounded-md border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/30">
      <div className="px-3 py-1.5 text-xs font-medium bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 rounded-t-md flex items-center gap-1.5">
        <span className="p-1 bg-amber-200 dark:bg-amber-800 rounded-sm">
          <CommandIcon className="h-3 w-3" />
        </span>
        Using Tool: {toolName}
      </div>

      {/* Tool input/query section */}
      <div className="px-3 py-2 text-xs border-b border-amber-200 dark:border-amber-800/50">
        <span className="font-medium">Input: </span>
        <span className="italic">{renderToolInput()}</span>
      </div>

      {/* Tool result section */}
      <div className="p-3 text-sm text-amber-800 dark:text-amber-200">
        {renderToolResult()}
      </div>
    </div>
  );
}

export function ReasoningPart({ part }: MessagePartProps) {
  return (
    <div className="my-2 rounded-md border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30">
      <div className="px-3 py-1.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-t-md flex items-center gap-1.5">
        <span className="p-1 bg-blue-200 dark:bg-blue-800 rounded-sm">
          <BrainIcon className="h-3 w-3" />
        </span>
        AI Reasoning
      </div>
      <div className="p-3 text-sm text-blue-800 dark:text-blue-200">
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {part.reasoning || part.content || "Thinking about this question..."}
        </Markdown>
      </div>
    </div>
  );
}

export function SourcePart({ part }: MessagePartProps) {
  return (
    <div className="my-2 rounded-md border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30">
      <div className="px-3 py-1.5 text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-t-md flex items-center gap-1.5">
        <span className="p-1 bg-green-200 dark:bg-green-800 rounded-sm">
          <CheckCircleIcon className="h-3 w-3" />
        </span>
        Tool Result
      </div>
      <div className="p-3 text-sm text-green-800 dark:text-green-200">
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {part.content || "Results retrieved successfully"}
        </Markdown>
      </div>
    </div>
  );
}
