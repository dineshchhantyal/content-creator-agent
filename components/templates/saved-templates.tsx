"use client";

import { useState } from "react";
import { useTemplates } from "@/context/templates-context";
import { motion, AnimatePresence } from "framer-motion";
import { TemplateCard } from "./template-card";
import { Bookmark, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SavedTemplates() {
  const { templates, savedTemplates } = useTemplates();
  const [isOpen, setIsOpen] = useState(false);

  // Get saved template data
  const savedTemplateData = templates.filter((template) =>
    savedTemplates.includes(template.id)
  );

  // Don't render if no saved templates
  if (savedTemplateData.length === 0) return null;

  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Bookmark
            className="text-purple-500 mr-2 fill-purple-500"
            size={20}
          />
          <h2 className="text-xl font-bold">Saved Templates</h2>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            ({savedTemplateData.length})
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500"
        >
          {isOpen ? (
            <>
              Hide <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Show <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {savedTemplateData.map((template) => (
                <TemplateCard
                  key={`saved-${template.id}`}
                  template={template}
                  onClick={(id) => {
                    // Handle template selection
                    console.log("Selected template:", id);
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
