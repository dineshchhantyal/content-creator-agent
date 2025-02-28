"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Video, Loader2 } from "lucide-react";
import { HeroAnimation } from "@/components/sections/hero-animation";
import analyzeYoutubeVideo from "@/actions/analyzeYoutubeVideo";

export function HeroSection() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;

    setIsAnalyzing(true);
    setError("");

    const formData = new FormData();
    formData.append("url", videoUrl);

    try {
      await analyzeYoutubeVideo(formData);
    } catch (error) {
      console.error(error);
      setError("Failed to analyze video. Please check the URL and try again.");
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Hero Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-block mb-4 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-900/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-xs font-medium text-purple-600 dark:text-purple-400 flex items-center gap-1">
                <Sparkles size={14} /> Powered by advanced AI
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Transform Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-fuchsia-500">
                Content Creation
              </span>{" "}
              With AI
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Generate scripts, analyze videos, create thumbnails, and optimize
              titles with our all-in-one AI assistant for content creators.
            </motion.p>

            <motion.form
              className="flex flex-col sm:flex-row gap-3 mb-3 max-w-md mx-auto lg:mx-0"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex-1 relative">
                <Video
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  placeholder="Paste YouTube URL..."
                  className="pl-10 h-12 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  disabled={isAnalyzing}
                />
              </div>
              <Button
                type="submit"
                className={`h-12 bg-gradient-to-r from-${siteConfig.colors.gradient.from} to-${siteConfig.colors.gradient.to} hover:opacity-90 transition-all text-white px-6`}
                disabled={!videoUrl.trim() || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Video <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </motion.form>

            {error && (
              <motion.div
                className="text-sm text-red-500 mb-4 max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            <motion.div
              className="text-sm text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              No account required for basic analysis.{" "}
              <Link
                href="/pricing"
                className="text-purple-600 dark:text-purple-400 underline underline-offset-2"
              >
                Join Pro
              </Link>{" "}
              for advanced features.
            </motion.div>
          </motion.div>

          {/* Hero Visual - Using our new animation component */}
          <div className="flex-1 hidden lg:block">
            <motion.div
              className="relative aspect-video max-w-xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-2xl blur-sm opacity-30 dark:opacity-40" />

              <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden h-full">
                <HeroAnimation />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Bar */}
        <StatsBar />
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
          500k+
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Videos Analyzed
        </div>
      </div>
      <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
          1.2M+
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Scripts Generated
        </div>
      </div>
      <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
          30k+
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Active Creators
        </div>
      </div>
      <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
          98%
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Satisfaction Rate
        </div>
      </div>
    </motion.div>
  );
}
