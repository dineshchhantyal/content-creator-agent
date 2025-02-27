"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Wand2,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  FileAudio,
  Zap,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Tool } from "@/types/tool";
import { FeaturedTool } from "@/components/ai-tools/featured-tool";
import { ToolGrid } from "@/components/ai-tools/tool-grid";
import { ToolFilters } from "@/components/ai-tools/tool-filters";

// Tool categories
const categories = [
  "All Tools",
  "Video Analysis",
  "Content Generation",
  "Editing",
  "SEO",
  "Analytics",
];

// Sort options
const sortOptions = [
  { name: "Most Popular", value: "popular" },
  { name: "Newest", value: "newest" },
  { name: "Alphabetical", value: "name" },
];

// Sample AI tools data
const aiTools: Tool[] = [
  {
    id: 1,
    name: "Content Analyzer",
    description:
      "AI-powered content analysis to improve engagement and viewer retention.",
    icon: <BarChart3 className="h-6 w-6" />,
    category: "Video Analysis",
    imageUrl: "/ai-tools/content-analyzer.jpeg",
    popular: true,
    new: false,
    proOnly: false,
    features: [
      "Audience retention analysis",
      "Engagement metrics tracking",
      "Content structure optimization",
      "Advanced performance insights",
    ],
  },
  {
    id: 2,
    name: "Script Generator Pro",
    description:
      "Generate compelling video scripts based on your topic and audience.",
    icon: <FileText className="h-6 w-6" />,
    category: "Content Generation",
    imageUrl: "/ai-tools/script-generator.jpeg",
    popular: true,
    new: false,
    proOnly: true,
    features: [
      "Custom voice tone settings",
      "Genre-specific templates",
      "SEO keyword integration",
      "Quick draft generation",
    ],
  },
  {
    id: 3,
    name: "Thumbnail Creator",
    description:
      "Design eye-catching thumbnails that increase click-through rates.",
    icon: <ImageIcon className="h-6 w-6" />,
    category: "Content Generation",
    imageUrl: "/ai-tools/thumbnail-creator.jpeg",
    popular: false,
    new: false,
    proOnly: false,
    features: [
      "Template library",
      "Text overlay optimization",
      "Color scheme suggestions",
      "A/B testing options",
    ],
  },
  {
    id: 4,
    name: "Audio Enhancer",
    description:
      "Clean up audio, remove background noise, and enhance voice clarity.",
    icon: <FileAudio className="h-6 w-6" />,
    category: "Editing",
    imageUrl: "/ai-tools/audio-enhancer.jpg",
    popular: false,
    new: true,
    proOnly: false,
    features: [
      "Noise reduction",
      "Voice clarity enhancement",
      "Audio leveling",
      "Echo removal",
    ],
  },
  {
    id: 5,
    name: "SEO Optimizer",
    description:
      "Optimize your video titles, descriptions, and tags for better discoverability.",
    icon: <Zap className="h-6 w-6" />,
    category: "SEO",
    imageUrl: "/ai-tools/seo-optimizer.jpg",
    popular: false,
    new: false,
    proOnly: true,
    features: [
      "Keyword research",
      "Tag optimization",
      "Title suggestion engine",
      "Description formatting",
    ],
  },
  {
    id: 6,
    name: "Content Coach",
    description:
      "Get personalized feedback and suggestions for improving your content.",
    icon: <MessageSquare className="h-6 w-6" />,
    category: "Analytics",
    imageUrl: "/ai-tools/content-coach.jpg",
    popular: true,
    new: true,
    proOnly: true,
    features: [
      "Performance review",
      "Style suggestions",
      "Trend alignment tips",
      "Audience growth tactics",
    ],
  },
  {
    id: 7,
    name: "Video Enhancer",
    description:
      "Automatically improve video quality, color grading, and stabilization.",
    icon: <Wand2 className="h-6 w-6" />,
    category: "Editing",
    imageUrl: "/ai-tools/video-enhancer.jpg",
    popular: false,
    new: true,
    proOnly: false,
    features: [
      "Auto color correction",
      "Video stabilization",
      "Resolution enhancement",
      "Lighting adjustment",
    ],
  },
  {
    id: 8,
    name: "Trend Analyzer",
    description: "Identify trending topics and content formats in your niche.",
    icon: <BarChart3 className="h-6 w-6" />,
    category: "Analytics",
    imageUrl: "/ai-tools/trend-analyzer.jpg",
    popular: false,
    new: false,
    proOnly: false,
    features: [
      "Real-time trend detection",
      "Niche-specific insights",
      "Competitor content analysis",
      "Content gap identification",
    ],
  },
];

export default function AIToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Tools");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedTab, setSelectedTab] = useState("all");
  const [highlightedTool, setHighlightedTool] = useState<number | null>(null);
  console.log("highlightedTool", highlightedTool);

  // Filter tools based on selected category, search query
  const filteredTools = useMemo(() => {
    return aiTools.filter((tool) => {
      const matchesCategory =
        selectedCategory === "All Tools" || tool.category === selectedCategory;
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Filter further based on tab
  const toolsByTab = useMemo(() => {
    return {
      all: filteredTools,
      pro: filteredTools.filter((tool) => tool.proOnly),
      free: filteredTools.filter((tool) => !tool.proOnly),
    };
  }, [filteredTools]);

  // Sort tools
  const getSortedTools = (tools: Tool[]) => {
    return [...tools].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return a.new === b.new ? 0 : a.new ? -1 : 1;
        case "name":
          return a.name.localeCompare(b.name);
        case "popular":
        default:
          return a.popular === b.popular ? 0 : a.popular ? -1 : 1;
      }
    });
  };

  // Featured tool (first popular tool or just first tool)
  const featuredTool = aiTools.find((tool) => tool.popular) || aiTools[0];

  // Reset filters handler
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Tools");
    setSelectedTab("all");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero section with featured tool */}
      <section className="relative bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-gray-950 pt-16 pb-12 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-100/40 to-fuchsia-100/30 dark:from-purple-900/20 dark:to-fuchsia-900/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-purple-100/40 to-fuchsia-100/30 dark:from-purple-900/20 dark:to-fuchsia-900/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              AI Tools for Content Creators
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Supercharge your content with our suite of AI-powered tools
              designed specifically for creators.
            </motion.p>
          </div>

          {/* Featured tool */}
          <FeaturedTool tool={featuredTool} />
        </div>
      </section>

      {/* Tools listing section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filter controls */}
          <ToolFilters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortOptions={sortOptions}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Tabs */}
          <div className="mb-8">
            <Tabs
              defaultValue="all"
              value={selectedTab}
              onValueChange={setSelectedTab}
            >
              <TabsList className="mb-6 w-full md:w-auto">
                <TabsTrigger value="all" className="flex-1 md:flex-auto">
                  All Tools
                </TabsTrigger>
                <TabsTrigger value="free" className="flex-1 md:flex-auto">
                  Free Tools
                </TabsTrigger>
                <TabsTrigger value="pro" className="flex-1 md:flex-auto">
                  Pro Tools
                  <Sparkles size={16} className="ml-1 text-yellow-500" />
                </TabsTrigger>
              </TabsList>

              {/* Tab content for "all" tools */}
              <TabsContent value="all" className="mt-0">
                <ToolGrid
                  tools={getSortedTools(toolsByTab.all)}
                  onResetFilters={handleResetFilters}
                  onHighlight={setHighlightedTool}
                />
              </TabsContent>

              {/* Tab content for "free" tools */}
              <TabsContent value="free" className="mt-0">
                <ToolGrid
                  tools={getSortedTools(toolsByTab.free)}
                  onResetFilters={handleResetFilters}
                  onHighlight={setHighlightedTool}
                />
              </TabsContent>

              {/* Tab content for "pro" tools */}
              <TabsContent value="pro" className="mt-0">
                <ToolGrid
                  tools={getSortedTools(toolsByTab.pro)}
                  onResetFilters={handleResetFilters}
                  onHighlight={setHighlightedTool}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Upgrade CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-fuchsia-500 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Unlock All Premium Tools with Pro
            </motion.h2>
            <motion.p
              className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Get access to all our pro tools and features with a CreatorAI Pro
              subscription. Boost your content creation workflow and stand out
              from the crowd.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 hover:text-purple-700"
                asChild
              >
                <Link href="/pricing">View Pricing Plans</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
