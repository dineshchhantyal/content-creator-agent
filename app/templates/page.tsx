"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import context provider
import { TemplatesProvider } from "@/context/templates-context";

// Import components
import { FeaturedTemplates } from "@/components/templates/featured-templates";
import { SavedTemplates } from "@/components/templates/saved-templates";
import { FilterSidebar } from "@/components/templates/filter-sidebar";
import { SortControls } from "@/components/templates/sort-controls";
import { TemplateFilters } from "@/components/templates/template-filters";
import { TemplateDetailsModal } from "@/components/templates/template-details-modal";
import { MobileFilter } from "@/components/templates/templates-content";

/**
 * Main Templates Page component that serves as the entry point.
 * This wraps all other components in the TemplatesProvider context.
 */
export default function TemplatesPage() {
  // Local state for template details modal
  const [selectedTemplateId] = useState<number | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Handler for closing template details
  const handleCloseTemplateDetails = () => {
    setIsDetailsModalOpen(false);
  };

  return (
    <TemplatesProvider>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header Section */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Content Creator Templates
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Save time and boost engagement with professionally designed
            templates tailored for content creators.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600 text-white"
          >
            <PlusCircle className="mr-2 h-5 w-5" /> Create Custom Template
          </Button>
        </motion.div>

        {/* Mobile filter button - only shows on mobile/tablet */}
        <div className="mb-6 lg:hidden">
          <MobileFilter />
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Sidebar - only shows on desktop */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Template Filters for mobile and tablet */}
            <div className="lg:hidden mb-8">
              <TemplateFilters
                categories={[
                  "All Templates",
                  "YouTube",
                  "TikTok",
                  "Instagram",
                  "Podcast",
                  "Educational",
                  "Marketing",
                  "Promotional",
                ]}
                selectedCategory="All Templates"
                onSelectCategory={() => {}}
                searchQuery=""
                onSearchChange={() => {}}
                sortOptions={[
                  { name: "Most Popular", value: "popular" },
                  { name: "Highest Rated", value: "rating" },
                  { name: "Newest", value: "newest" },
                  { name: "Alphabetical", value: "name" },
                ]}
                sortBy="popular"
                onSortChange={() => {}}
              />
            </div>

            {/* Featured Templates Section */}
            <FeaturedTemplates />

            {/* Saved Templates Section */}
            <SavedTemplates />

            {/* All Templates Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-purple-500" />
                  <h2 className="text-2xl font-bold">All Templates</h2>
                </div>

                <div className="flex items-center space-x-2">
                  <SortControls />
                </div>
              </div>

              {/* Template Grid - Main content */}
              <div className="flex-1">
                {/* This will pull from context automatically */}
              </div>
            </div>

            {/* Pro Membership CTA */}
            <motion.div
              className="mt-16 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 p-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-lg p-8 sm:p-10">
                <div className="text-center sm:text-left sm:flex sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      Pro Templates
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      Unlock all premium templates and exclusive features with a
                      Pro subscription.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600 text-white">
                      Upgrade to Pro
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Template Details Modal */}
        <TemplateDetailsModal
          templateId={selectedTemplateId}
          isOpen={isDetailsModalOpen}
          onClose={handleCloseTemplateDetails}
        />
      </div>
    </TemplatesProvider>
  );
}
