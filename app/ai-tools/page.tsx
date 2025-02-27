"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ChevronDown,
  Sparkles,
  Wand2,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  FileAudio,
  Zap,
  BarChart3,
  Check,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";

// Tool categories
const categories = [
  "All Tools",
  "Video Analysis",
  "Content Generation",
  "Editing",
  "SEO",
  "Analytics",
];

// Sample AI tools data
const aiTools = [
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

// Sort options
const sortOptions = [
  { name: "Most Popular", value: "popular" },
  { name: "Newest", value: "newest" },
  { name: "Alphabetical", value: "name" },
];

export default function AIToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Tools");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedTab, setSelectedTab] = useState("all");
  const [highlightedTool, setHighlightedTool] = useState<number | null>(null);
  console.log("highlightedTool", highlightedTool);

  // Filter tools based on selected category, search query, and tab
  const filteredTools = aiTools.filter((tool) => {
    const matchesCategory =
      selectedCategory === "All Tools" || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "pro" && tool.proOnly) ||
      (selectedTab === "free" && !tool.proOnly);

    return matchesCategory && matchesSearch && matchesTab;
  });

  // Sort tools
  const sortedTools = [...filteredTools].sort((a, b) => {
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

  // Featured tool (first popular tool or just first tool)
  const featuredTool = aiTools.find((tool) => tool.popular) || aiTools[0];

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

          {/* Featured tool card */}
          <motion.div
            className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative aspect-video md:aspect-auto overflow-hidden">
                <Image
                  src={featuredTool.imageUrl || "/ai-tools/default.jpg"}
                  alt={featuredTool.name}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div>
                    <Badge className="mb-2 bg-purple-500 hover:bg-purple-600 text-white border-none">
                      Featured Tool
                    </Badge>
                    <h3 className="text-2xl font-bold text-white">
                      {featuredTool.name}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3">
                    {featuredTool.icon}
                  </div>
                  <div>
                    <Badge
                      variant={featuredTool.proOnly ? "default" : "secondary"}
                      className="mr-2"
                    >
                      {featuredTool.proOnly ? "Pro" : "Free"}
                    </Badge>
                    {featuredTool.new && <Badge variant="outline">New</Badge>}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {featuredTool.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {featuredTool.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600 dark:text-gray-300"
                      >
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600 text-white"
                >
                  Try {featuredTool.name}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools listing section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filter controls */}
          <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar flex-nowrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Search input */}
              <div className="relative flex-grow md:max-w-xs">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Search tools..."
                  className="pl-10 h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Sort dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10">
                    <Filter size={16} className="mr-2" />
                    Sort
                    <ChevronDown size={16} className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={
                        sortBy === option.value
                          ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                          : ""
                      }
                    >
                      {option.name}
                      {sortBy === option.value && (
                        <Check className="ml-2 h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

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

              {/* Tools grid - shared for all tabs */}
              <TabsContent value="all" className="mt-0">
                {sortedTools.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedTools.map((tool) => (
                      <motion.div
                        key={tool.id}
                        className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all"
                        onMouseEnter={() => setHighlightedTool(tool.id)}
                        onMouseLeave={() => setHighlightedTool(null)}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative aspect-video">
                          <Image
                            src={tool.imageUrl || "/ai-tools/default.jpg"}
                            alt={tool.name}
                            width={400}
                            height={225}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                            {tool.proOnly ? (
                              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 border-none text-white">
                                Pro Tool
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Free Tool</Badge>
                            )}
                          </div>
                          {tool.new && (
                            <Badge className="absolute top-3 right-3 bg-green-500 text-white border-none">
                              New
                            </Badge>
                          )}
                        </div>

                        <div className="p-5">
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3">
                              {tool.icon}
                            </div>
                            <h3 className="font-semibold text-lg">
                              {tool.name}
                            </h3>
                          </div>

                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                            {tool.description}
                          </p>

                          <div className="mb-4">
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              Category:{" "}
                              <span className="font-medium">
                                {tool.category}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {tool.features
                                .slice(0, 2)
                                .map((feature, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {feature}
                                  </Badge>
                                ))}
                              {tool.features.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{tool.features.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <Button
                            className={`w-full ${
                              tool.proOnly
                                ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                                : ""
                            }`}
                            variant={tool.proOnly ? "default" : "outline"}
                          >
                            {tool.proOnly ? "Upgrade to Access" : "Try Now"}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 px-4">
                    <div className="mb-4">
                      <Search className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No tools found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All Tools");
                        setSelectedTab("all");
                      }}
                    >
                      Reset filters
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="free" className="mt-0">
                {/* Content shown in the "free" tab */}
                {/* The shared rendering logic above will handle this */}
              </TabsContent>

              <TabsContent value="pro" className="mt-0">
                {/* Content shown in the "pro" tab */}
                {/* The shared rendering logic above will handle this */}
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
