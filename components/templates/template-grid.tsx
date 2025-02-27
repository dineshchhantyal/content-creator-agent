"use client";

import { useEffect, useState } from "react";
import { useTemplates } from "@/context/templates-context";
import { motion } from "framer-motion";
import { TemplateCard } from "./template-card";
import { Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TemplateGrid() {
  const { filteredTemplates, searchQuery, selectedCategory, sortBy } =
    useTemplates();
  const [sortedTemplates, setSortedTemplates] = useState(filteredTemplates);
  const [isLoading, setIsLoading] = useState(false);

  // Update sorted templates when filters change
  useEffect(() => {
    setIsLoading(true);

    // Sort templates
    const sorted = [...filteredTemplates].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return a.new === b.new ? 0 : a.new ? -1 : 1;
        case "name":
          return a.name.localeCompare(b.name);
        case "popular":
        default:
          return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
      }
    });

    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setSortedTemplates(sorted);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filteredTemplates, sortBy]);

  // Empty state
  if (!isLoading && sortedTemplates.length === 0) {
    return (
      <motion.div
        className="py-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Search className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-medium mb-2">No templates found</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
          {searchQuery
            ? `We couldn't find any templates matching "${searchQuery}"`
            : `No templates found in ${selectedCategory} category`}
        </p>
        <Button
          variant="outline"
          onClick={() => {
            window.location.reload();
          }}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset filters
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {isLoading
        ? // Skeleton loading state
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
            >
              <div className="aspect-video bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                </div>
                <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              </div>
            </div>
          ))
        : sortedTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onClick={(id) => {
                // Handle template click
                console.log("Template clicked:", id);
              }}
            />
          ))}
    </motion.div>
  );
}
