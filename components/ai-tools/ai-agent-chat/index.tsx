"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence } from "framer-motion";

import { ChatHeader } from "./chat-header";
import { MessageBubble } from "./message-bubble";
import { LoadingIndicator } from "./loading-indicator";
import { ChatInput } from "./chat-input";
import { SuggestionsPanel } from "./suggestions-panel";
import "katex/dist/katex.min.css";

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

const AiAgentChat = ({ videoId }: { videoId: string }) => {
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
          content:
            "Hi there! I'm your AI assistant for this video. Ask me any questions about the content, and I'll help you analyze it or provide insights.",
        },
      ],
    });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Update the scrollToBottom function to be more efficient
  const scrollToBottom = () => {
    // Debounce the scroll operation
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (messagesEndRef.current) {
        const scrollArea = messagesEndRef.current.closest(
          ".scroll-area-viewport"
        );
        if (scrollArea) {
          // Use requestAnimationFrame for smoother scrolling
          requestAnimationFrame(() => {
            scrollArea.scrollTop = scrollArea.scrollHeight;
          });
        }
      }
    }, 100);
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
  console.log(messages);
  return (
    <>
      <style jsx global>
        {latexStyles}
      </style>
      <div className="flex flex-col h-full overflow-hidden">
        <ChatHeader onShowSuggestions={() => setShowSuggestions(true)} />

        <ScrollArea className="flex-grow overflow-y-auto px-3 py-2">
          <div className="space-y-3 mb-2">
            <AnimatePresence>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </AnimatePresence>

            {isLoading && <LoadingIndicator />}

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
              onDismiss={dismissSuggestions}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AiAgentChat;
