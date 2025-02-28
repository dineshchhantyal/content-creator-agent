import React, { memo } from "react";
import { motion } from "framer-motion";
import { User, Sparkles, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExtendedChatMessage } from "./types";
import { MessageContent } from "./message-content";
import { Button } from "@/components/ui/button";

interface MessageBubbleProps {
  message: ExtendedChatMessage;
  onExpand?: (id: string) => void;
}

// Wrap the component with memo to prevent unnecessary re-renders
export const MessageBubble = memo(function MessageBubble({
  message,
  onExpand,
}: MessageBubbleProps) {
  // Extract role to simplify conditional checks
  const isUser = message.role === "user";

  // Handler for expanding truncated content
  const handleExpand = () => {
    if (message.isTruncated && onExpand) {
      onExpand(message.id);
    }
  };

  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
        // Use reduced motion settings for better performance
        type: "tween",
      }}
      className={cn(
        "flex items-start gap-2",
        isUser ? "justify-end" : "justify-start"
      )}
      // Add some performance optimizations
      layoutId={message.id}
    >
      <div
        className={cn(
          "rounded-lg px-3 py-2 max-w-[85%] text-sm shadow-sm",
          isUser
            ? "bg-purple-600 text-white rounded-tr-none"
            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none border border-gray-200 dark:border-gray-700"
        )}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <>
            <MessageContent message={message} />

            {message.isTruncated && (
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleExpand}
                  className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1"
                >
                  <ChevronDown size={14} />
                  Show full message
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <div
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center",
          isUser
            ? "bg-purple-100 text-purple-600 order-2"
            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
        )}
      >
        {isUser ? (
          <User className="w-3 h-3" />
        ) : (
          <Sparkles className="w-3 h-3" />
        )}
      </div>
    </motion.div>
  );
});
