"use client";

import { Filter, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTemplates } from "@/context/templates-context";

const sortOptions = [
  { name: "Most Popular", value: "popular" },
  { name: "Highest Rated", value: "rating" },
  { name: "Newest", value: "newest" },
  { name: "Alphabetical", value: "name" },
];

export function SortControls() {
  const { sortBy, setSortBy } = useTemplates();

  // Find the current sort option name for display
  const currentSortName =
    sortOptions.find((opt) => opt.value === sortBy)?.name || "Sort";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">{currentSortName}</span>
          <span className="sm:hidden">Sort</span>
          <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setSortBy(option.value)}
            className={`flex items-center justify-between ${
              sortBy === option.value
                ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium"
                : ""
            }`}
          >
            {option.name}
            {sortBy === option.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
