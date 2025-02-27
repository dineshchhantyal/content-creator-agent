"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Star,
  Download,
  Share2,
  PlayCircle,
  Bookmark,
  Check,
  Calendar,
  Users,
} from "lucide-react";
import { useTemplates } from "@/context/templates-context";

type TemplateDetailsModalProps = {
  templateId: number | null;
  isOpen: boolean;
  onClose: () => void;
};

export function TemplateDetailsModal({
  templateId,
  isOpen,
  onClose,
}: TemplateDetailsModalProps) {
  const { templates, savedTemplates, toggleSaveTemplate } = useTemplates();
  const [activeTab, setActiveTab] = useState("preview");

  // Find selected template
  const template = templates.find((t) => t.id === templateId);

  if (!template) return null;

  const isSaved = savedTemplates.includes(template.id);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center justify-between">
            <span>{template.name}</span>
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span>{template.rating}</span>
              <span className="text-gray-500 text-sm">
                ({template.reviews} reviews)
              </span>
            </div>
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600 dark:text-gray-300">
            {template.description}
          </DialogDescription>
        </DialogHeader>

        {/* Tab navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          <button
            className={`px-4 py-2 focus:outline-none ${
              activeTab === "preview"
                ? "border-b-2 border-purple-500 text-purple-600 dark:text-purple-400 font-medium"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
          <button
            className={`px-4 py-2 focus:outline-none ${
              activeTab === "details"
                ? "border-b-2 border-purple-500 text-purple-600 dark:text-purple-400 font-medium"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`px-4 py-2 focus:outline-none ${
              activeTab === "instructions"
                ? "border-b-2 border-purple-500 text-purple-600 dark:text-purple-400 font-medium"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </button>
        </div>

        {/* Preview tab */}
        {activeTab === "preview" && (
          <div className="py-4">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src={template.imageUrl}
                alt={template.name}
                width={1280}
                height={720}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Button
                  size="lg"
                  className="rounded-full px-6"
                  variant="secondary"
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Preview Template
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Details tab */}
        {activeTab === "details" && (
          <div className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-lg mb-3">
                  Template Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-2">
                    <span className="text-gray-500">Category</span>
                    <span className="font-medium">{template.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-2">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium">
                      {template.duration || "Variable"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-2">
                    <span className="text-gray-500">Complexity</span>
                    <span className="font-medium">
                      {template.complexity || "All levels"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-2">
                    <span className="text-gray-500">Last Updated</span>
                    <span className="font-medium">
                      {template.lastUpdated || "Recent"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">Used by creators</span>
                    <span className="font-medium">
                      {template.usageCount?.toLocaleString() || "Many"}
                    </span>
                  </div>
                </div>

                <h3 className="font-medium text-lg mt-8 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-3">
                  Why use this template?
                </h3>
                <ul className="space-y-3">
                  <li className="flex">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Optimized for audience engagement and retention</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>
                      Proven structure used by successful content creators
                    </span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>
                      Easy to customize to your unique style and brand
                    </span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Designed to increase shares and audience growth</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>
                      Regularly updated based on platform algorithm changes
                    </span>
                  </li>
                </ul>

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      Added {template.lastUpdated || "recently"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {template.usageCount?.toLocaleString() || "Many"} users
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions tab */}
        {activeTab === "instructions" && (
          <div className="py-4">
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-3">
                How to use this template
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Follow these steps to create engaging content using the{" "}
                {template.name} template:
              </p>
            </div>

            {template.steps ? (
              <div className="space-y-6">
                {template.steps.map((step, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 flex-shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-medium">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{step.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <p className="text-center text-gray-500">
                  Detailed instructions for this template are coming soon.
                  <br />
                  Our content team is working on comprehensive guides to help
                  you get the most out of each template.
                </p>
              </div>
            )}

            <div className="mt-8">
              <h3 className="font-medium text-lg mb-3">Pro Tips</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <div className="w-6 h-6 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-xs font-medium">✨</span>
                  </div>
                  <span className="text-sm">
                    Customize the template to match your brand voice and style
                  </span>
                </li>
                <li className="flex">
                  <div className="w-6 h-6 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-xs font-medium">✨</span>
                  </div>
                  <span className="text-sm">
                    Test different variations to see what resonates with your
                    audience
                  </span>
                </li>
                <li className="flex">
                  <div className="w-6 h-6 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-xs font-medium">✨</span>
                  </div>
                  <span className="text-sm">
                    Use our AI content generator to help fill in the template
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          <div className="flex space-x-2 mt-3 sm:mt-0">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="outline"
              onClick={() => toggleSaveTemplate(template.id)}
            >
              {isSaved ? (
                <>
                  <Bookmark className="mr-2 h-4 w-4 fill-current" /> Saved
                </>
              ) : (
                <>
                  <Bookmark className="mr-2 h-4 w-4" /> Save
                </>
              )}
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600">
            <Download className="mr-2 h-4 w-4" /> Use This Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
