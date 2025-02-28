import React from "react";
import { Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onShowSuggestions: () => void;
}

export function ChatHeader({ onShowSuggestions }: ChatHeaderProps) {
  return (
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
          onClick={onShowSuggestions}
        >
          <Sparkles className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
