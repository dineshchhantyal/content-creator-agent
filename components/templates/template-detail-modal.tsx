"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, Bookmark, Check, Users } from "lucide-react";

type TemplateDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  template: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    rating: number;
    reviews: number;
    featured?: boolean;
    new?: boolean;
    tags: string[];
  } | null;
  isSaved: boolean;
  onToggleSave: (id: number) => void;
};

export function TemplateDetailModal({
  isOpen,
  onClose,
  template,
  isSaved,
  onToggleSave,
}: TemplateDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="relative aspect-video">
          <Image
            src={template.imageUrl}
            alt={template.name}
            width={800}
            height={450}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex justify-between items-end">
              <div>
                <div className="flex gap-2 mb-2">
                  <span className="px-2 py-1 bg-gray-900/80 text-white text-xs font-medium rounded backdrop-blur-sm">
                    {template.category}
                  </span>
                  {template.new && (
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                      NEW
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {template.name}
                </h3>
                <div className="flex items-center mt-1">
                  <Star
                    className="w-4 h-4 text-yellow-400 mr-1"
                    fill="currentColor"
                  />
                  <span className="text-white text-sm">{template.rating}</span>
                  <span className="text-white/70 text-sm ml-1">
                    ({template.reviews} reviews)
                  </span>
                  <Clock className="w-4 h-4 text-white/70 ml-4 mr-1" />
                  <span className="text-white/70 text-sm">~15 min setup</span>
                </div>
              </div>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                onClick={() => template && onToggleSave(template.id)}
              >
                <Bookmark
                  className={isSaved ? "fill-white text-white" : "text-white"}
                />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="px-6 border-b border-gray-200 dark:border-gray-800">
              <TabsList className="mt-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="structure">Structure</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="overview" className="mt-0">
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    {template.description}. This template is designed to help
                    content creators quickly produce high-quality, engaging
                    content that resonates with their audience. With a proven
                    Layout, structure and format, you&lsquo;ll save time while
                    creating more effective videos.
                  </p>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">Perfect For:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {template.tags.map((tag, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          <span>{tag} content</span>
                        </li>
                      ))}
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span>Beginner creators</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span>Established channels</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Key Benefits:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-3">
                          <Clock className="w-5 h-5" />
                        </div>
                        <h5 className="font-medium mb-1">Save Time</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Start with a proven structure that works
                        </p>
                      </div>
                      <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-3">
                          <Users className="w-5 h-5" />
                        </div>
                        <h5 className="font-medium mb-1">Engage Viewers</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Optimized for maximum audience retention
                        </p>
                      </div>
                      <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-3">
                          <Star className="w-5 h-5" />
                        </div>
                        <h5 className="font-medium mb-1">Stand Out</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Professional format that elevates your content
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="structure" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">
                      Template Structure
                    </h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                        <h5 className="font-medium flex items-center">
                          <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mr-2 text-sm">
                            1
                          </span>
                          Hook (0:00 - 0:30)
                        </h5>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 pl-8">
                          Grab attention in the first 30 seconds. Tease the
                          value and set expectations.
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                        <h5 className="font-medium flex items-center">
                          <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mr-2 text-sm">
                            2
                          </span>
                          Introduction (0:30 - 1:30)
                        </h5>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 pl-8">
                          Briefly explain what viewers will learn and why it
                          matters.
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                        <h5 className="font-medium flex items-center">
                          <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mr-2 text-sm">
                            3
                          </span>
                          Main Content (1:30 - 8:00)
                        </h5>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 pl-8">
                          Deliver the core value in clear, digestible segments
                          with examples.
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                        <h5 className="font-medium flex items-center">
                          <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mr-2 text-sm">
                            4
                          </span>
                          Practical Application (8:00 - 11:00)
                        </h5>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 pl-8">
                          Show real-world application or case study to
                          demonstrate concepts.
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                        <h5 className="font-medium flex items-center">
                          <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mr-2 text-sm">
                            5
                          </span>
                          Conclusion & CTA (11:00 - 12:00)
                        </h5>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 pl-8">
                          Summarize key points and provide a clear
                          call-to-action.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="examples" className="mt-0">
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    See how other creators have successfully used this template
                    to create engaging content.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                      <div className="aspect-video relative bg-gray-200 dark:bg-gray-800">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h5 className="font-medium mb-1">
                          Example: Tech Review
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          See how this template works for product reviews.
                        </p>
                      </div>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                      <div className="aspect-video relative bg-gray-200 dark:bg-gray-800">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h5 className="font-medium mb-1">Example: Tutorial</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          How to adapt this format for educational content.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Used by 2,456 creators
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Preview</Button>
            <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600">
              Use This Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Play({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
        clipRule="evenodd"
      />
    </svg>
  );
}
