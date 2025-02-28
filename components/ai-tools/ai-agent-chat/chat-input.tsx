import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

export function ChatInput({
  input,
  isLoading,
  onInputChange,
  onSubmit,
  inputRef,
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="flex-shrink-0 p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <form onSubmit={onSubmit} className="flex flex-col space-y-1">
        <div className="relative">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={onInputChange}
            placeholder="Ask a question about your video..."
            className="resize-none h-[60px] max-h-[100px] pr-10 text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus-visible:ring-purple-500"
            disabled={isLoading}
            onKeyDown={handleKeyDown}
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
    </div>
  );
}
