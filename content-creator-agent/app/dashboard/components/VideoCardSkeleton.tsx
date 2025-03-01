import React from "react";

function VideoCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      <div className="p-4">
        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2 w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4 w-1/2" />
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default VideoCardSkeleton;