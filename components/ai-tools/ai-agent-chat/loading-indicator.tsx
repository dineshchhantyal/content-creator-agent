import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function LoadingIndicator() {
  return (
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
          {[0, 300, 600].map((delay) => (
            <div
              key={delay}
              className="h-2 w-2 bg-purple-600 rounded-full animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
