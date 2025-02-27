"use client";

import { Search, Filter, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTemplates } from "@/context/templates-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Template categories
const categories = [
  "All Templates",
  "YouTube",
  "TikTok",
  "Instagram",
  "Podcast",
  "Educational",
  "Marketing",
  "Promotional",
];

const sortOptions = [
  { name: "Most Popular", value: "popular" },
  { name: "Highest Rated", value: "rating" },
  { name: "Newest", value: "newest" },
  { name: "Alphabetical", value: "name" },
];

export function FilterSidebar() {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } =
    useTemplates();

  return (
    <div className="w-full lg:w-64 space-y-6">
      <div>
        <h3 className="font-medium mb-3">Search Templates</h3>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="ghost"
              className={`w-full justify-start px-3 ${
                selectedCategory === category
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              {selectedCategory === category && (
                <Badge className="ml-auto bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400 border-0">
                  {category === "All Templates" ? "All" : ""}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Template Type</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="video-templates"
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label
              htmlFor="video-templates"
              className="ml-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Video Templates
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="audio-templates"
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label
              htmlFor="audio-templates"
              className="ml-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Audio Templates
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="image-templates"
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label
              htmlFor="image-templates"
              className="ml-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Image Templates
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="text-templates"
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label
              htmlFor="text-templates"
              className="ml-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Text Templates
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Complexity</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="beginner"
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label
              htmlFor="beginner"
              className="ml-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Beginner
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="intermediate"
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label
              htmlFor="intermediate"
              className="ml-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Intermediate
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="advanced"
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label
              htmlFor="advanced"
              className="ml-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Advanced
            </label>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setSearchQuery("");
            setSelectedCategory("All Templates");
          }}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}

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
          <span>{currentSortName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setSortBy(option.value)}
            className={
              sortBy === option.value
                ? "bg-purple-50 dark:bg-purple-900/20"
                : ""
            }
          >
            {option.name}
            {sortBy === option.value && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
