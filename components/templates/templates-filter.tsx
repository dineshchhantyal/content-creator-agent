"use client";

import { Search, Filter, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

type TemplatesFilterProps = {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOptions: Array<{ name: string; value: string }>;
  sortBy: string;
  onSortChange: (sort: string) => void;
};

export function TemplatesFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortOptions,
  sortBy,
  onSortChange,
}: TemplatesFilterProps) {
  return (
    <motion.div
      className="mb-8 flex flex-col lg:flex-row justify-between gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex overflow-x-auto pb-2 lg:pb-0 gap-2 hide-scrollbar">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`whitespace-nowrap ${
              selectedCategory === category
                ? "bg-purple-600 hover:bg-purple-700"
                : ""
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-2 lg:mt-0">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search templates..."
            className="pl-9 w-full lg:w-[250px]"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Filter className="h-4 w-4" />
              Sort
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                className={
                  sortBy === option.value ? "bg-gray-100 dark:bg-gray-800" : ""
                }
                onClick={() => onSortChange(option.value)}
              >
                {option.name}
                {sortBy === option.value && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}
