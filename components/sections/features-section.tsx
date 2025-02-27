"use client";

import { motion } from "framer-motion";
import { AirVent, Play, Sparkles, Subscript, Wand2 } from "lucide-react";

export const featureHighlights = [
  {
    title: "AI-Powered Script Generation",
    description:
      "Create engaging scripts for your videos with our advanced AI assistant.",
    icon: <Subscript className="text-purple-600 dark:text-purple-400" />,
  },
  {
    title: "Video Analysis",
    description:
      "Get detailed insights and suggestions to improve your video content.",
    icon: <Play className="text-purple-600 dark:text-purple-400" />,
  },
  {
    title: "Image Generation",
    description:
      "Create stunning thumbnails and imagery for your content with AI.",
    icon: <Sparkles className="text-purple-600 dark:text-purple-400" />,
  },
  {
    title: "Title Optimization",
    description: "Generate high-performing titles with our AI engine.",
    icon: <AirVent className="text-purple-600 dark:text-purple-400" />,
  },
  {
    title: "Transcription Service",
    description:
      "Automatically convert your videos to text with high accuracy.",
    icon: <Subscript className="text-purple-600 dark:text-purple-400" />,
  },
  {
    title: "Plan with AI Tools",
    description:
      "Get personalized content suggestions and planning tools to boost your creativity.",
    icon: <Wand2 className="text-purple-600 dark:text-purple-400" />,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Everything You Need To Create Better Content
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our AI-powered tools help you create, optimize, and analyze your
            content for maximum engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureHighlights.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
