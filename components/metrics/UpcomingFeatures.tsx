import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FileText, Star, Video } from "lucide-react";
import { motion } from "framer-motion";

const UpcomingFeatures = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="p-5">
          <h3 className="font-medium mb-3">Additional Content Tools</h3>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start border-dashed border-gray-300 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              disabled
            >
              <Video size={16} className="mr-3 text-gray-500" /> Video Shorts
              Generator
              <Badge variant="outline" className="ml-auto">
                Coming Soon
              </Badge>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-dashed border-gray-300 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              disabled
            >
              <FileText size={16} className="mr-3 text-gray-500" /> Script
              Improvements
              <Badge variant="outline" className="ml-auto">
                Coming Soon
              </Badge>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-dashed border-gray-300 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              disabled
            >
              <Star size={16} className="mr-3 text-gray-500" /> Analytics Report
              <Badge variant="outline" className="ml-auto">
                Coming Soon
              </Badge>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UpcomingFeatures;
