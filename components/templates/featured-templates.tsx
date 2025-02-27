"use client";

import { useTemplates } from "@/context/templates-context";
import { motion } from "framer-motion";
import { TemplateCard } from "./template-card";
import { Sparkles } from "lucide-react";

export function FeaturedTemplates() {
  const { featuredTemplates } = useTemplates();

  if (featuredTemplates.length === 0) return null;

  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center mb-6">
        <Sparkles className="text-purple-500 mr-2" size={20} />
        <h2 className="text-2xl font-bold">Featured Templates</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredTemplates.map((template) => (
          <TemplateCard
            key={`featured-${template.id}`}
            template={template}
            isFeatured={true}
            onClick={() => {}}
          />
        ))}
      </div>
    </motion.div>
  );
}
