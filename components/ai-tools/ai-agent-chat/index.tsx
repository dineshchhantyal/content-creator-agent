"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence } from "framer-motion";
import { ChatHeader } from "./chat-header";
import { MessageBubble } from "./message-bubble";
import { LoadingIndicator } from "./loading-indicator";
import { ChatInput } from "./chat-input";
import { SuggestionsPanel } from "./suggestions-panel";
import "katex/dist/katex.min.css";
import { ChatMessage } from "./types";

// LaTeX styling
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

// Maximum visible message length before truncation
const MAX_MESSAGE_LENGTH = 4000;

// Extended message type with truncation properties
interface ExtendedChatMessage extends ChatMessage {
  originalContent?: string;
  isTruncated?: boolean;
}

const AiAgentChat = ({ videoId }: { videoId: string }) => {
  // Ensure videoId is always a valid string
  const safeVideoId =
    videoId && videoId.trim() !== "" ? videoId : "default-video";

  // Process messages to optimize performance
  const processMessages = useCallback(
    (rawMessages: ChatMessage[]): ExtendedChatMessage[] => {
      return rawMessages.map((message: ChatMessage) => {
        // Only process assistant messages with content (not parts-based messages)
        if (
          message.role === "assistant" &&
          !message.parts &&
          typeof message.content === "string" &&
          message.content.length > MAX_MESSAGE_LENGTH
        ) {
          // Create a truncated version for initial display
          return {
            ...message,
            content: message.content.slice(0, MAX_MESSAGE_LENGTH) + "...",
            originalContent: message.content, // Store original for expansion
            isTruncated: true,
          };
        }
        return message;
      });
    },
    []
  );

  const {
    messages: rawMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    maxSteps: 5,
    body: {
      videoId: safeVideoId,
    },
    id: `video-chat-${safeVideoId}`,
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi there! I'm your AI assistant for this video. Ask me any questions about the content, and I'll help you analyze it or provide insights.",
      },
    ],
  });

  // Optimize messages for rendering
  const [expandedMessageIds, setExpandedMessageIds] = useState<Set<string>>(
    new Set()
  );
  const messages = processMessages(rawMessages as ChatMessage[]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Handle expanding truncated messages
  const handleExpandMessage = useCallback((id: string) => {
    setExpandedMessageIds((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  }, []);

  // Debounced scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (messagesEndRef.current) {
        const scrollArea = messagesEndRef.current.closest(
          ".scroll-area-viewport"
        );
        if (scrollArea) {
          requestAnimationFrame(() => {
            scrollArea.scrollTop = scrollArea.scrollHeight;
          });
        }
      }
    }, 100);
  }, []);

  // Efficient virtualized rendering for messages
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });

  // Update visible range on scroll
  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const container = event.currentTarget;
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemHeight = 80; // Approximate height of a message

      const start = Math.max(0, Math.floor(scrollTop / itemHeight) - 5);
      const end = Math.min(
        messages.length,
        Math.ceil((scrollTop + containerHeight) / itemHeight) + 5
      );

      setVisibleRange({ start, end });
    },
    [messages.length]
  );

  // Memoized visible messages
  const visibleMessages = messages.slice(visibleRange.start, visibleRange.end);

  useEffect(() => {
    scrollToBottom();
  }, [rawMessages, scrollToBottom]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Suggestions based on common video analysis questions
  const suggestions = [
    "Summarize this video in 3 bullet points",
    "What are the key topics covered?",
    "How could the video's engagement be improved?",
    "What keywords should I target for this content?",
  ];

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

  return (
    <>
      <style jsx global>
        {latexStyles}
      </style>
      <div className="flex flex-col h-full overflow-hidden">
        <ChatHeader onShowSuggestions={() => setShowSuggestions(true)} />

        <ScrollArea
          className="flex-grow overflow-y-auto"
          onScroll={handleScroll}
        >
          <div className="space-y-3 px-3 py-2 mb-2">
            <AnimatePresence mode="popLayout">
              {visibleMessages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={
                    message.isTruncated && expandedMessageIds.has(message.id)
                      ? {
                          ...message,
                          content: message.originalContent || message.content,
                          isTruncated: false,
                        }
                      : message
                  }
                  onExpand={handleExpandMessage}
                />
              ))}
            </AnimatePresence>

            {isLoading && <LoadingIndicator />}

            {visibleRange.end < messages.length && (
              <div className="text-center py-2 text-sm text-gray-500">
                Scroll to see more messages...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <ChatInput
          input={input}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onSubmit={handleFormSubmit}
          inputRef={inputRef}
        />

        <AnimatePresence>
          {showSuggestions && messages.length <= 2 && (
            <SuggestionsPanel
              suggestions={suggestions}
              onApplySuggestion={applySuggestion}
              onDismiss={() => setShowSuggestions(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AiAgentChat;
