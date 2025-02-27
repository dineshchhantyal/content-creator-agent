"use client";

import { motion } from "framer-motion";
import { TemplateCard } from "./template-card";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

type TemplatesGridProps = {
  templates: Array<{
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    rating: number;
    reviews: number;
    featured?: boolean;
    new?: boolean;
    tags: string[];
  }>;
  savedTemplates: number[];
  onToggleSave: (id: number) => void;
  onResetFilters: () => void;
  onClickTemplate: (id: number) => void; // Added onClick handler for templates
};

export function TemplatesGrid({
  templates,
  savedTemplates,
  onToggleSave,
  onResetFilters,
  onClickTemplate, // Add the new prop to the destructuring
}: TemplatesGridProps) {
  if (!templates.length) {
    return (
      <div className="text-center py-16 px-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
        <div className="mb-4">
          <FileQuestion className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600" />
        </div>
        <h3 className="text-xl font-medium mb-2">No templates found</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          We couldn&lsquo;t find any templates matching your criteria
        </p>
        <Button variant="outline" onClick={onResetFilters}>
          Reset filters
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          isSaved={savedTemplates.includes(template.id)}
          onToggleSave={onToggleSave}
          onClick={onClickTemplate} // Pass the onClick handler to the TemplateCard
        />
      ))}
    </motion.div>
  );
}
