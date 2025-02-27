"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Tool } from "@/types/tool"; // We'll create this type

type ToolCardProps = {
  tool: Tool;
  onHighlight: (id: number | null) => void;
};

export function ToolCard({ tool, onHighlight }: ToolCardProps) {
  return (
    <motion.div
      className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all"
      onMouseEnter={() => onHighlight(tool.id)}
      onMouseLeave={() => onHighlight(null)}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-video">
        <Image
          src={tool.imageUrl || "/ai-tools/default.jpg"}
          alt={tool.name}
          width={400}
          height={225}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
          {tool.proOnly ? (
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 border-none text-white">
              Pro Tool
            </Badge>
          ) : (
            <Badge variant="secondary">Free Tool</Badge>
          )}
        </div>
        {tool.new && (
          <Badge className="absolute top-3 right-3 bg-green-500 text-white border-none">
            New
          </Badge>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3">
            {tool.icon}
          </div>
          <h3 className="font-semibold text-lg">{tool.name}</h3>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {tool.description}
        </p>

        <div className="mb-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Category: <span className="font-medium">{tool.category}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {tool.features.slice(0, 2).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {tool.features.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{tool.features.length - 2} more
              </Badge>
            )}
          </div>
        </div>

        <Button
          className={`w-full ${
            tool.proOnly
              ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
              : ""
          }`}
          variant={tool.proOnly ? "default" : "outline"}
        >
          {tool.proOnly ? "Upgrade to Access" : "Try Now"}
        </Button>
      </div>
    </motion.div>
  );
}
