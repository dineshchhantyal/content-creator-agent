import React from "react";

const VideoCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="w-full aspect-video bg-gray-200 dark:bg-gray-800 animate-pulse" />
      <div className="p-4">
        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2 w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4 w-1/2" />
        <div className="flex gap-2">
          <div className="h-7 w-24 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
          <div className="h-7 w-20 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
          <div className="h-7 w-16 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
        </div>
        <div className="mt-4 h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-28" />
      </div>
    </div>
  );
};

export default VideoCardSkeleton;
