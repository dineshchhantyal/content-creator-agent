"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "./tool-card";
import { Tool } from "@/types/tool"; // We'll create this type

type ToolGridProps = {
  tools: Tool[];
  onResetFilters: () => void;
  onHighlight: (id: number | null) => void;
};

export function ToolGrid({
  tools,
  onResetFilters,
  onHighlight,
}: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="mb-4">
          <Search className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600" />
        </div>
        <h3 className="text-xl font-medium mb-2">No tools found</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Try adjusting your search or filter criteria
        </p>
        <Button variant="outline" onClick={onResetFilters}>
          Reset filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} onHighlight={onHighlight} />
      ))}
    </div>
  );
}
