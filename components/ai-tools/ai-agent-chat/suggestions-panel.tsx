import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SuggestionsPanelProps {
  suggestions: string[];
  onApplySuggestion: (suggestion: string) => void;
  onDismiss: () => void;
}

export function SuggestionsPanel({
  suggestions,
  onApplySuggestion,
  onDismiss,
}: SuggestionsPanelProps) {
  return (
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
          onClick={onDismiss}
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
            onClick={() => onApplySuggestion(suggestion)}
            className="justify-start h-auto py-1.5 px-2.5 text-xs text-left border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 whitespace-normal"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
