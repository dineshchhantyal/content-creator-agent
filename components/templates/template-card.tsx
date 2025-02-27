"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTemplates, Template } from "@/context/templates-context";

type TemplateCardProps = {
  template: Template;
  onClick: (id: number) => void;
  isSaved?: boolean;
  onToggleSave?: (id: number) => void;
  isFeatured?: boolean;
};

export function TemplateCard({
  template,
  onClick,
  isSaved,
  isFeatured = false,
  onToggleSave,
}: TemplateCardProps) {
  const { savedTemplates, toggleSaveTemplate } = useTemplates();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all group ${
        isFeatured ? "h-full" : ""
      }`}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video relative">
        <Image
          src={template.imageUrl}
          alt={template.name}
          width={500}
          height={280}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleSave) {
                onToggleSave(template.id);
              } else {
                toggleSaveTemplate(template.id);
              }
            }}
            className="p-1.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 transition-colors"
          >
            <Bookmark
              className={`w-5 h-5 ${
                isSaved !== undefined
                  ? isSaved
                    ? "fill-purple-600 text-purple-600"
                    : "text-gray-600 dark:text-gray-300"
                  : savedTemplates.includes(template.id)
                  ? "fill-purple-600 text-purple-600"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            />
          </button>
        </div>

        {/* Tag overlays */}
        <div className="absolute top-2 left-2 flex gap-2">
          {template.new && (
            <Badge className="bg-green-500 text-white border-0">New</Badge>
          )}
          {isFeatured && (
            <Badge className="bg-purple-500 text-white border-0">
              Featured
            </Badge>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-4 px-4">
          <p className="text-white font-medium">{template.name}</p>
          <div className="flex items-center mt-1">
            <Star
              className="w-4 h-4 text-yellow-400 mr-1"
              fill="currentColor"
            />
            <span className="text-white text-sm">{template.rating}</span>
            <span className="text-white/70 text-sm ml-1">
              ({template.reviews})
            </span>
          </div>
        </div>

        {/* Hover overlay for view details */}
        {isHovered && (
          <div
            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => onClick(template.id)}
          >
            <Button variant="secondary" className="rounded-full px-4">
              View Details
            </Button>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {template.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-wrap gap-2">
            {template.tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {template.tags.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded text-xs">
                +{template.tags.length - 2}
              </span>
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="text-purple-600 dark:text-purple-400 p-0 hover:bg-transparent hover:text-purple-700 dark:hover:text-purple-300"
            onClick={() => onClick(template.id)}
          >
            Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
