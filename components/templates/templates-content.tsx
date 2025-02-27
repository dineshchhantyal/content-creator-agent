"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Bookmark, Sparkles, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TemplatesProvider, useTemplates } from "@/context/templates-context";
import { FilterSidebar } from "@/components/templates/filter-sidebar";
import { SortControls } from "@/components/templates/sort-controls";
import { TemplateCard } from "@/components/templates/template-card";
import { TemplateDetailsModal } from "@/components/templates/template-details-modal";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function TemplatesContent() {
  const { filteredTemplates, featuredTemplates, savedTemplates } =
    useTemplates();
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(
    null
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Open template details modal
  const openTemplateDetails = (id: number) => {
    setSelectedTemplateId(id);
    setIsDetailsModalOpen(true);
  };

  // Close template details modal
  const closeTemplateDetails = () => {
    setIsDetailsModalOpen(false);
  };

  // Get saved templates data
  const savedTemplateItems = filteredTemplates.filter((template) =>
    savedTemplates.includes(template.id)
  );

  return (
    <>
      {/* Featured Templates Section */}
      {featuredTemplates.length > 0 && (
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center mb-6"
          >
            <Sparkles className="mr-2 h-5 w-5 text-purple-500" />
            <h2 className="text-2xl font-bold">Featured Templates</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTemplates.map((template) => (
              <TemplateCard
                key={`featured-${template.id}`}
                template={template}
                onClick={openTemplateDetails}
                isFeatured
              />
            ))}
          </div>
        </section>
      )}

      {/* Saved Templates Section (collapsible) */}
      {savedTemplateItems.length > 0 && (
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Bookmark className="mr-2 h-5 w-5 text-purple-500 fill-purple-500" />
              <h2 className="text-2xl font-bold">Saved Templates</h2>
              <span className="ml-2 text-gray-500">
                ({savedTemplateItems.length})
              </span>
            </div>

            <Button variant="outline" size="sm">
              View All Saved
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedTemplateItems.slice(0, 3).map((template) => (
              <TemplateCard
                key={`saved-${template.id}`}
                template={template}
                onClick={openTemplateDetails}
              />
            ))}
          </div>
        </motion.section>
      )}

      {/* All Templates Section with Filter */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Zap className="mr-2 h-5 w-5 text-purple-500" />
            <h2 className="text-2xl font-bold">All Templates</h2>
            <span className="ml-2 text-gray-500">
              ({filteredTemplates.length})
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative lg:hidden">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input placeholder="Search..." className="pl-9 h-9 w-[180px]" />
            </div>
            <SortControls />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar for large screens */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Template grid */}
          <div className="flex-1">
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onClick={openTemplateDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
                <Search className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-medium mb-2">No templates found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button variant="outline">Reset Filters</Button>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Template details modal */}
      <TemplateDetailsModal
        templateId={selectedTemplateId}
        isOpen={isDetailsModalOpen}
        onClose={closeTemplateDetails}
      />
    </>
  );
}

export function MobileFilter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="lg:hidden w-full flex items-center justify-center"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter Templates
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-lg">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex justify-between items-center">
            <span>Filter Templates</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto max-h-[calc(100vh-6rem)]">
          <FilterSidebar />
        </div>
        <div className="mt-6">
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600 text-white"
            onClick={() => setIsOpen(false)}
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function TemplatesPage() {
  return (
    <TemplatesProvider>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Page header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h1
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Content Creator Templates
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Save time and boost engagement with our professionally designed
            content templates. Browse by platform, content type, or audience to
            find the perfect starting point.
          </motion.p>
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600 text-white"
            >
              Create Custom Template
            </Button>
          </motion.div>
        </div>

        {/* Mobile filter button (for small screens) */}
        <div className="mb-6 lg:hidden">
          <MobileFilter />
        </div>

        {/* Main content */}
        <TemplatesContent />

        {/* Pro membership CTA */}
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
                  Unlock all premium templates and exclusive features with a Pro
                  subscription.
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
    </TemplatesProvider>
  );
}
