"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Template = {
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
  duration?: string;
  complexity?: "Beginner" | "Intermediate" | "Advanced";
  lastUpdated?: string;
  usageCount?: number;
  steps?: {
    title: string;
    description: string;
  }[];
};

type TemplatesContextType = {
  templates: Template[];
  featuredTemplates: Template[];
  filteredTemplates: Template[];
  savedTemplates: number[];
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
  toggleSaveTemplate: (id: number) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sort: string) => void;
};

// Sample data
const templateData: Template[] = [
  {
    id: 1,
    name: "YouTube Tutorial Format",
    description:
      "Perfect structure for educational content and tutorials with step-by-step guidance",
    imageUrl: "/templates/youtube-tutorial.jpg",
    category: "YouTube",
    rating: 4.8,
    reviews: 124,
    featured: true,
    new: false,
    tags: ["Educational", "How-to", "Structured"],
    duration: "10-15 min",
    complexity: "Beginner",
    lastUpdated: "2024-01-15",
    usageCount: 9572,
    steps: [
      {
        title: "Hook and Intro",
        description:
          "Start with a clear problem statement and what viewers will learn",
      },
      {
        title: "Quick Overview",
        description: "Preview the end result to build anticipation",
      },
      {
        title: "Step-by-Step Instructions",
        description: "Break down the process with clear demonstrations",
      },
      {
        title: "Common Mistakes",
        description: "Address potential pitfalls and how to avoid them",
      },
      {
        title: "Recap and CTA",
        description: "Summarize key points and suggest next steps",
      },
    ],
  },
  {
    id: 2,
    name: "TikTok Trend Reaction",
    description:
      "Jump on viral trends with this engaging reaction template that maximizes engagement",
    imageUrl: "/templates/tiktok-trend.jpg",
    category: "TikTok",
    rating: 4.5,
    reviews: 87,
    featured: false,
    new: true,
    tags: ["Entertainment", "Reaction", "Trending"],
    duration: "15-60 sec",
    complexity: "Beginner",
    lastUpdated: "2024-02-05",
    usageCount: 6341,
    steps: [
      {
        title: "Hook with Trend Clip",
        description: "Show the trend you're reacting to first",
      },
      {
        title: "Surprise Reaction",
        description: "Express authentic shock, amusement or confusion",
      },
      {
        title: "Your Take",
        description: "Put your unique spin on the trend",
      },
      {
        title: "Call-to-Action",
        description: "Ask viewers to comment their thoughts or try the trend",
      },
    ],
  },
  {
    id: 3,
    name: "Instagram Story Sequence",
    description:
      "Captivate your audience with this story sequence template designed for maximum engagement",
    imageUrl: "/templates/instagram-story.jpg",
    category: "Instagram",
    rating: 4.7,
    reviews: 93,
    featured: true,
    new: false,
    tags: ["Short-form", "Visual", "Storytelling"],
    duration: "60-90 sec",
    complexity: "Intermediate",
    lastUpdated: "2024-01-27",
    usageCount: 7238,
  },
  {
    id: 4,
    name: "Podcast Interview Structure",
    description:
      "Professional format for podcast interviews with guests that creates engaging conversations",
    imageUrl: "/templates/podcast-interview.jpg",
    category: "Podcast",
    rating: 4.9,
    reviews: 56,
    featured: false,
    new: false,
    tags: ["Audio", "Interview", "Professional"],
    duration: "30-60 min",
    complexity: "Intermediate",
    lastUpdated: "2023-12-12",
    usageCount: 3487,
  },
  {
    id: 5,
    name: "Product Review Format",
    description:
      "Balanced approach for honest product reviews and demos that build audience trust",
    imageUrl: "/templates/product-review.jpg",
    category: "YouTube",
    rating: 4.6,
    reviews: 112,
    featured: false,
    new: false,
    tags: ["Review", "Product", "Demonstration"],
    duration: "8-12 min",
    complexity: "Intermediate",
    lastUpdated: "2024-01-03",
    usageCount: 5693,
  },
  {
    id: 6,
    name: "Educational Mini-Series",
    description:
      "Perfect for breaking complex topics into digestible episodes that keep viewers coming back",
    imageUrl: "/templates/educational-series.jpg",
    category: "Educational",
    rating: 4.8,
    reviews: 78,
    featured: true,
    new: true,
    tags: ["Series", "Educational", "In-depth"],
    duration: "5-8 min per episode",
    complexity: "Advanced",
    lastUpdated: "2024-02-18",
    usageCount: 2945,
  },
  {
    id: 7,
    name: "Marketing Case Study",
    description:
      "Showcase customer success stories with this proven format that drives conversions",
    imageUrl: "/templates/marketing-case-study.jpg",
    category: "Marketing",
    rating: 4.7,
    reviews: 42,
    featured: false,
    new: true,
    tags: ["Business", "Case Study", "Professional"],
    duration: "3-5 min",
    complexity: "Advanced",
    lastUpdated: "2024-02-10",
    usageCount: 1876,
  },
  {
    id: 8,
    name: "Promotional Announcement",
    description:
      "Build hype for your product launches and announcements with this attention-grabbing template",
    imageUrl: "/templates/promotional-announcement.jpg",
    category: "Promotional",
    rating: 4.5,
    reviews: 36,
    featured: false,
    new: false,
    tags: ["Promotional", "Launch", "Announcement"],
    duration: "60-90 sec",
    complexity: "Intermediate",
    lastUpdated: "2023-11-25",
    usageCount: 4287,
  },
  {
    id: 9,
    name: "Instagram Carousel Tutorial",
    description:
      "Educational content optimized for Instagram carousel posts that drives saves and shares",
    imageUrl: "/templates/instagram-carousel.jpg",
    category: "Instagram",
    rating: 4.8,
    reviews: 64,
    featured: false,
    new: true,
    tags: ["Educational", "Carousel", "Visual"],
    duration: "10 slides",
    complexity: "Beginner",
    lastUpdated: "2024-02-21",
    usageCount: 3142,
  },
];

const TemplatesContext = createContext<TemplatesContextType | null>(null);

export function TemplatesProvider({ children }: { children: React.ReactNode }) {
  const [templates] = useState<Template[]>(templateData);
  const [savedTemplates, setSavedTemplates] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Templates");
  const [sortBy, setSortBy] = useState("popular");

  // Load saved templates from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedTemplates");
    if (saved) {
      try {
        setSavedTemplates(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved templates:", e);
      }
    }
  }, []);

  // Save templates to localStorage when they change
  useEffect(() => {
    localStorage.setItem("savedTemplates", JSON.stringify(savedTemplates));
  }, [savedTemplates]);

  // Toggle save/unsave a template
  const toggleSaveTemplate = (id: number) => {
    setSavedTemplates((prev) =>
      prev.includes(id)
        ? prev.filter((templateId) => templateId !== id)
        : [...prev, id]
    );
  };

  // Filter templates based on search and category
  const filteredTemplates = templates.filter((template) => {
    // Category filter
    const matchesCategory =
      selectedCategory === "All Templates" ||
      template.category === selectedCategory;

    // Search filter (name, description, tags)
    const matchesSearch =
      searchQuery === "" ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  // Sort templates based on selected sort option
  const sortTemplates = (templates: Template[]) => {
    return [...templates].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return a.new === b.new ? 0 : a.new ? -1 : 1;
        case "name":
          return a.name.localeCompare(b.name);
        case "popular":
        default:
          return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
      }
    });
  };

  // Get featured templates
  const featuredTemplates = templates.filter((t) => t.featured);

  return (
    <TemplatesContext.Provider
      value={{
        templates,
        featuredTemplates,
        filteredTemplates: sortTemplates(filteredTemplates),
        savedTemplates,
        searchQuery,
        selectedCategory,
        sortBy,
        toggleSaveTemplate,
        setSearchQuery,
        setSelectedCategory,
        setSortBy,
      }}
    >
      {children}
    </TemplatesContext.Provider>
  );
}

export const useTemplates = () => {
  const context = useContext(TemplatesContext);
  if (context === null) {
    throw new Error("useTemplates must be used within a TemplatesProvider");
  }
  return context;
};

export type { Template };
