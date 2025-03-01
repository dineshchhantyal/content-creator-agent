import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalVideos: number;
}

const SearchFilters = ({
  searchQuery,
  setSearchQuery,
  totalVideos,
}: SearchFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search videos..."
            className="pl-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-gray-200 dark:border-gray-800"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Sort by Latest</DropdownMenuItem>
            <DropdownMenuItem>Sort by Oldest</DropdownMenuItem>
            <DropdownMenuItem>Has Thumbnails</DropdownMenuItem>
            <DropdownMenuItem>Has Titles</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        Showing {totalVideos} videos
      </div>
    </div>
  );
};

export default SearchFilters;
