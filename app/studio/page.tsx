"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Film,
  FileText,
  Code2,
  PenTool,
  Rocket,
  ArrowRight,
  Construction,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function StudioPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-gray-950 pt-16 pb-12 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-100/40 to-fuchsia-100/30 dark:from-purple-900/20 dark:to-fuchsia-900/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-purple-100/40 to-fuchsia-100/30 dark:from-purple-900/20 dark:to-fuchsia-900/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-none">
                Coming Soon
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-fuchsia-500">
                  Creator Studio
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Your all-in-one workspace for creating, editing, and publishing
                content. Harness the power of AI to streamline your creative
                workflow.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <div className="relative w-full sm:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:w-80 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                className="bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600 text-white px-6 py-3 w-full sm:w-auto"
                size="lg"
              >
                Get Early Access <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Construction Status */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center justify-center p-10 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50 text-center">
          <Construction className="h-16 w-16 text-purple-500 dark:text-purple-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Under Construction</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-md">
            We&lsquo;re building something amazing! The Creator Studio is
            currently in development. Sign up above to get notified when we
            launch.
          </p>
        </div>
      </section>

      {/* Features Preview */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          What&lsquo;s Coming to Creator Studio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Film className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-lg">Video Editor</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Edit videos with AI-assisted tools that simplify the production
                process. Add captions, effects, and transitions effortlessly.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-lg">Script Generator</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Generate scripts based on your topics and outlines. Adapt tone
                and style to match your audience and platform.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <PenTool className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-lg">Graphic Design</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Create thumbnails, social media graphics, and animations with
                AI-powered design tools that match your brand.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <LayoutGrid className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-lg">Content Calendar</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Plan, schedule, and publish your content across platforms from a
                single dashboard with intelligent recommendations.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Code2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-lg">Analytics Dashboard</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Track performance metrics, audience engagement, and content
                effectiveness with detailed insights and suggestions.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Rocket className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-lg">
                  Multi-Platform Publishing
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Publish and optimize your content for multiple platforms with
                one-click distribution and format adaptation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-12 px-4">
        <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-500 p-1">
          <div className="bg-white dark:bg-gray-950 rounded-xl p-8 sm:p-10">
            <div className="text-center sm:text-left sm:flex sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Ready to transform your content creation?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Be the first to get access when we launch the Creator Studio.
                </p>
              </div>
              <div className="mt-5 sm:mt-0">
                <Link href="/templates">
                  <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600 text-white">
                    Explore Templates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
