"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot,
  Send,
  Sparkles,
  User,
  X,
  Command as CommandIcon,
  CheckCircle as CheckCircleIcon,
  Brain as BrainIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { useSchematicFlag } from "@schematichq/schematic-react";
import { FeatureFlag } from "@/components/features/flags";

// Add this to your component or a separate CSS file
const latexStyles = `
  .katex-display {
    margin: 0.75em 0;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .katex {
    font-size: 1.05em;
  }
`;

const AiAgentChat = ({ videoId }: { videoId: string }) => {
  const isVideoAnalyzeEnabled = useSchematicFlag(FeatureFlag.ANALYZE_VIDEO);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      maxSteps: 5,
      body: {
        videoId,
      },
      id: `video-chat-${videoId}`,
      initialMessages: [
        {
          id: "welcome",
          role: "assistant",
          content: isVideoAnalyzeEnabled
            ? "Hi there! I'm your AI assistant for this video. Ask me any questions about the content, and I'll help you analyze it or provide insights."
            : "This feature requires a paid subscription. Upgrade your plan to chat with AI about your videos and get in-depth analysis.",
        },
      ],
    });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Suggestions based on common video analysis questions
  const suggestions = [
    "Summarize this video in 3 bullet points",
    "What are the key topics covered?",
    "How could the video's engagement be improved?",
    "What keywords should I target for this content?",
  ];

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      // Instead of scrollIntoView which can affect the whole page
      const scrollArea = messagesEndRef.current.closest(
        ".scroll-area-viewport"
      );
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      } else {
        // Fallback that's less likely to scroll the whole page
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSubmit(e);
      setShowSuggestions(false);
    }
  };

  const applySuggestion = (suggestion: string) => {
    handleInputChange({
      target: { value: suggestion },
    } as React.ChangeEvent<HTMLTextAreaElement>);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const dismissSuggestions = () => {
    setShowSuggestions(false);
  };

  return (
    <>
      <style jsx global>
        {latexStyles}
      </style>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Chat Header - Fixed height */}
        <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white flex items-center text-sm">
                <Bot className="w-4 h-4 mr-1.5" /> AI Video Assistant
              </h2>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => setShowSuggestions(true)}
            >
              <Sparkles className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Message Area - Flex grow to fill available space */}
        <ScrollArea className="flex-grow overflow-y-auto px-3 py-2">
          <div className="space-y-3 mb-2">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex items-start gap-2",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 max-w-[85%] text-sm shadow-sm",
                      message.role === "user"
                        ? "bg-purple-600 text-white rounded-tr-none"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none border border-gray-200 dark:border-gray-700"
                    )}
                  >
                    {message.role === "user" ? (
                      <p>{message.content}</p>
                    ) : (
                      <div className="prose dark:prose-invert prose-sm max-w-none">
                        {message.parts && Array.isArray(message.parts) ? (
                          message.parts.map((part, idx) => {
                            if (part.type === "text") {
                              return (
                                <Markdown
                                  key={`text-${idx}`}
                                  remarkPlugins={[remarkGfm, remarkMath]}
                                  rehypePlugins={[rehypeKatex]}
                                >
                                  {part.text || message.content}
                                </Markdown>
                              );
                            } else if (part.type === "tool-invocation") {
                              return (
                                <div
                                  key={`tool-${idx}`}
                                  className="my-2 rounded-md border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/30"
                                >
                                  <div className="px-3 py-1.5 text-xs font-medium bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 rounded-t-md flex items-center gap-1.5">
                                    <span className="p-1 bg-amber-200 dark:bg-amber-800 rounded-sm">
                                      <CommandIcon className="h-3 w-3" />
                                    </span>
                                    Using Tool:{" "}
                                    {part.toolInvocation.toolName ||
                                      "Video Analysis"}
                                  </div>
                                  <div className="p-3 text-sm text-amber-800 dark:text-amber-200">
                                    <Markdown
                                      remarkPlugins={[remarkGfm, remarkMath]}
                                      rehypePlugins={[rehypeKatex]}
                                    >
                                      {part.toolInvocation.state ||
                                        "Analyzing video content..."}
                                    </Markdown>
                                  </div>
                                </div>
                              );
                            } else if (part.type === "reasoning") {
                              return (
                                <div
                                  key={`reasoning-${idx}`}
                                  className="my-2 rounded-md border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30"
                                >
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
                                      {part.reasoning ||
                                        "Thinking about this question..."}
                                    </Markdown>
                                  </div>
                                </div>
                              );
                            } else if (part.type === "source") {
                              return (
                                <div
                                  key={`result-${idx}`}
                                  className="my-2 rounded-md border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30"
                                >
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
                                      {part.type ||
                                        "Results retrieved successfully"}
                                    </Markdown>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          })
                        ) : (
                          <Markdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                          >
                            {message.content}
                          </Markdown>
                        )}
                      </div>
                    )}
                  </div>

                  <div
                    className={cn(
                      "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center",
                      message.role === "user"
                        ? "bg-purple-100 text-purple-600 order-2"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                    )}
                  >
                    {message.role === "user" ? (
                      <User className="w-3 h-3" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-2"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                  <Sparkles className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg rounded-tl-none px-3 py-2 max-w-[85%] shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <div
                      className="h-2 w-2 bg-purple-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-purple-600 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-purple-600 rounded-full animate-bounce"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Form - Fixed height */}
        <div className="flex-shrink-0 p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          {!isVideoAnalyzeEnabled ? (
            <div className="py-2 px-3 rounded-md bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800">
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Chat with AI about this video is not available in your current
                plan.{" "}
                <a
                  href="/settings/plan"
                  className="text-purple-600 dark:text-purple-400 underline"
                >
                  Upgrade your plan
                </a>{" "}
                to unlock this feature.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col space-y-1"
            >
              <div className="relative">
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask a question about your video..."
                  className="resize-none h-[60px] max-h-[100px] pr-10 text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus-visible:ring-purple-500"
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleFormSubmit(e);
                    }
                  }}
                  rows={2}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={input.trim().length === 0 || isLoading}
                  className="absolute right-2 bottom-2 h-6 w-6 p-0 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Enter to send, Shift+Enter for new line
              </p>
            </form>
          )}
        </div>

        {/* Suggestions - At the bottom of the container with fixed height */}
        <AnimatePresence>
          {showSuggestions && messages.length <= 2 && isVideoAnalyzeEnabled && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 px-3 py-2 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50"
            >
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Suggested questions
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={dismissSuggestions}
                  className="h-5 w-5 p-0 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => applySuggestion(suggestion)}
                    className="justify-start h-auto py-1.5 px-2.5 text-xs text-left border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 whitespace-normal"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AiAgentChat;
