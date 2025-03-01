import React from "react";
import { Button } from "@/components/ui/button";

const EmptyState = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 text-center">
      <h3 className="text-xl font-semibold mb-4">No Videos Analyzed Yet</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        It looks like you haven't analyzed any videos. Start by pasting a YouTube URL above to analyze your content!
      </p>
      <Button
        onClick={() => window.scrollTo(0, 0)}
        className="bg-purple-600 text-white hover:bg-purple-700"
      >
        Analyze a Video
      </Button>
    </div>
  );
};

export default EmptyState;