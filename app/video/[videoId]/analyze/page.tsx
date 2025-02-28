import React from "react";

const VideoAnalyzePage = () => {
  return (
    <div className="xl:container mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="order-2 lg:order-1 flex flex-col gap-4 bg-white lg:border-r dark:bg-gray-900 rounded-xl p-4 lg:p-8">
          {/* Analysis Section */}
          {/* Youtube video details */}
          {/* Thumbnail Generation */}
          {/* Title Generation */}
          {/* Transcription */}
        </div>
        <div
          className="order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h[calc(100vh-6rem)] bg-white dark:bg-gray-900 rounded-xl p-4 lg:p-8 shadow-lg overflow-y-auto
        "
        >
          {/* Ai Agent Chat Section */}
        </div>
      </div>
    </div>
  );
};

export default VideoAnalyzePage;
