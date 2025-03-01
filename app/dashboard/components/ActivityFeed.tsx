import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ActivityFeed = () => {
  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm mt-8">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
        <CardDescription>Your latest interactions and analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 border-l border-gray-200 dark:border-gray-800 space-y-4">
          <div className="relative">
            <div className="absolute -left-[25px] rounded-full w-4 h-4 bg-purple-100 dark:bg-purple-900/30 ring-4 ring-white dark:ring-gray-950 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            </div>
            <div className="text-sm">
              <p>
                <span className="font-medium">Analyzed video</span>{" "}
                <span className="text-gray-500 dark:text-gray-400">
                  2 hours ago
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                You analyzed a new YouTube video
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-[25px] rounded-full w-4 h-4 bg-blue-100 dark:bg-blue-900/30 ring-4 ring-white dark:ring-gray-950 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            </div>
            <div className="text-sm">
              <p>
                <span className="font-medium">Generated thumbnails</span>{" "}
                <span className="text-gray-500 dark:text-gray-400">
                  Yesterday
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                You generated 3 new thumbnails
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-[25px] rounded-full w-4 h-4 bg-amber-100 dark:bg-amber-900/30 ring-4 ring-white dark:ring-gray-950 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            </div>
            <div className="text-sm">
              <p>
                <span className="font-medium">Account created</span>{" "}
                <span className="text-gray-500 dark:text-gray-400">
                  1 week ago
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                You created your CreatorAI account
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
