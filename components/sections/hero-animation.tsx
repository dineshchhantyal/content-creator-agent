"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/constants";
import {
  Play,
  ArrowRight,
  CheckCircle2,
  LineChart,
  PenSquare,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroAnimation() {
  const [animationStep, setAnimationStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance animation or reset when completed
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        if (animationStep < 5) {
          setAnimationStep(animationStep + 1);
        } else {
          // Reset after a delay when animation completes
          const resetTimer = setTimeout(() => {
            setAnimationStep(0);
            setIsPlaying(false);
          }, 2000);
          return () => clearTimeout(resetTimer);
        }
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [animationStep, isPlaying]);

  const startAnimation = () => {
    setAnimationStep(0);
    setIsPlaying(true);
  };

  // Sample video to analyze
  const sampleVideo = {
    title: "10 Photography Tips for Beginners",
    duration: "12:45",
    thumbnail: "/thumbnail.jpg",
  };

  // Sample insights generated by AI
  const insights = [
    {
      id: 1,
      icon: <LineChart size={18} />,
      text: "Viewer retention drops at 2:35",
    },
    {
      id: 2,
      icon: <PenSquare size={18} />,
      text: "Title could be more engaging",
    },
    {
      id: 3,
      icon: <Sparkles size={18} />,
      text: "Add B-roll during explanation",
    },
  ];

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
          {/* App UI Chrome */}
          <div className="h-10 w-full bg-gray-100 dark:bg-gray-800 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-500 dark:text-gray-400">
              {siteConfig.name} Dashboard
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-10 pb-6 px-6 mt-4 h-full">
        <div className="flex flex-col h-full">
          <AnimatePresence mode="wait">
            {/* Step 0: Initial State / Video Selection */}
            {animationStep === 0 && (
              <motion.div
                key="step0"
                className="flex flex-col items-center justify-center h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden bg-gray-800 mb-6 shadow-lg">
                  <img
                    src="/thumbnail.jpg"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play
                        size={30}
                        className="text-white ml-1"
                        fill="white"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <h3 className="text-white font-medium">
                      {sampleVideo.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {sampleVideo.duration}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={startAnimation}
                  className="bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:opacity-90 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-md"
                  size="lg"
                >
                  Analyze Video <ArrowRight size={18} />
                </Button>

                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                  AI-powered analysis to improve your content
                </p>
              </motion.div>
            )}

            {/* Step 1: Scanning/Processing Animation */}
            {animationStep === 1 && (
              <motion.div
                key="step1"
                className="flex flex-col items-center justify-center h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden bg-gray-800 shadow-lg">
                  <img
                    src="/thumbnail.jpg"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover opacity-70"
                  />

                  {/* Scanning effect */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-fuchsia-500"
                    initial={{ y: -10 }}
                    animate={{ y: 400 }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Data points being collected */}
                  <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-full bg-purple-500/80"
                        initial={{
                          x: Math.random() * 100 + 50,
                          y: Math.random() * 100 + 50,
                          opacity: 0,
                          scale: 0,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1,
                          delay: Math.random() * 1.5,
                          repeat: Infinity,
                          repeatDelay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="w-full max-w-md mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <LineChart
                        size={24}
                        className="text-purple-600 dark:text-purple-400"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-1">
                        Analyzing Content
                      </h3>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-500"
                          initial={{ width: "0%" }}
                          animate={{ width: "60%" }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: AI Processing */}
            {animationStep === 2 && (
              <motion.div
                key="step2"
                className="flex flex-col items-center justify-center h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full max-w-md">
                  <div className="mb-6">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                        <svg
                          className="w-10 h-10 text-purple-600 animate-pulse"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2a5 5 0 0 0-5 5v2a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z"></path>
                          <path d="M15 8a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V8Z"></path>
                          <path d="M9 8a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V8Z"></path>
                          <path d="M12 16a5 5 0 0 0 5-5V9a5 5 0 0 0-10 0v2a5 5 0 0 0 5 5Z"></path>
                          <path d="m19 12-2 2 2 2"></path>
                          <path d="m5 12 2 2-2 2"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium">
                        Processing with AI
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Analyzing content structure, engagement patterns, and
                        visual elements...
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Animated typing effect for code/data analysis */}
                    {[
                      "Content structure",
                      "Audience retention",
                      "SEO analysis",
                      "Visual components",
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.3 }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-purple-500 animate-pulse" />
                          <span>{item}</span>
                        </div>
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ delay: i * 0.3, duration: 1 }}
                          className="h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Generating Insights */}
            {animationStep === 3 && (
              <motion.div
                key="step3"
                className="flex flex-col items-center justify-center h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full max-w-md">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 relative">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-purple-200 dark:bg-purple-900/20"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles
                          size={28}
                          className="text-purple-600 dark:text-purple-400"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-medium text-center mb-6">
                    Generating Content Insights
                  </h3>

                  <div className="space-y-4">
                    {insights.map((insight, i) => (
                      <motion.div
                        key={insight.id}
                        className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.4 }}
                      >
                        <div className="flex gap-3">
                          <div className="mt-0.5 text-purple-600 dark:text-purple-400">
                            {insight.icon}
                          </div>
                          <div>
                            <p className="text-gray-800 dark:text-gray-200">
                              {insight.text}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Recommendations */}
            {animationStep === 4 && (
              <motion.div
                key="step4"
                className="flex flex-col items-center justify-center h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full max-w-md">
                  <div className="bg-gradient-to-r from-purple-600/10 to-fuchsia-500/10 p-6 rounded-xl border border-purple-200 dark:border-purple-900/30 mb-6">
                    <h3 className="text-xl font-medium mb-4 text-center">
                      AI Recommendations
                    </h3>

                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-3 items-start"
                      >
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 text-green-500"
                        />
                        <div>
                          <p className="font-medium">Suggested Title</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                            "Master Photography: 10 Pro Tips for Stunning Shots"
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex gap-3 items-start"
                      >
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 text-green-500"
                        />
                        <div>
                          <p className="font-medium">Content Structure</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                            Add timestamps in description and open with your
                            best tip
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex gap-3 items-start"
                      >
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 text-green-500"
                        />
                        <div>
                          <p className="font-medium">Visual Enhancement</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                            Use side-by-side comparison for before/after effects
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Final Results Dashboard */}
            {animationStep === 5 && (
              <motion.div
                key="step5"
                className="flex flex-col h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-medium mb-4">
                  Content Performance Dashboard
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Engagement Score
                    </h4>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      74%
                    </div>
                    <div className="mt-2 w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-yellow-500 to-green-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "74%" }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Title Effectiveness
                    </h4>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      58%
                    </div>
                    <div className="mt-2 w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "58%" }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                    Viewer Retention
                  </h4>
                  <div className="h-24 w-full relative">
                    {/* Viewer retention graph */}
                    <svg className="w-full h-full" viewBox="0 0 300 100">
                      <motion.path
                        d="M0,80 C30,70 60,20 90,40 C120,60 150,10 180,30 C210,50 240,60 270,40 C300,20 300,50 300,50"
                        fill="none"
                        stroke="url(#retention-gradient)"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                      />
                      <defs>
                        <linearGradient
                          id="retention-gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#9333EA" />
                          <stop offset="100%" stopColor="#D946EF" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {/* Drop-off point marker */}
                    <motion.div
                      className="absolute w-4 h-4 rounded-full bg-red-500 border-2 border-white dark:border-gray-800"
                      style={{ top: "20%", left: "30%" }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, type: "spring" }}
                    />
                    <motion.div
                      className="absolute text-xs font-medium text-red-500 px-1 py-0.5 rounded bg-red-100 dark:bg-red-900/20"
                      style={{ top: "10%", left: "29%" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      Drop-off
                    </motion.div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 p-4 rounded-lg shadow-sm text-white mt-auto">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Overall Score</h4>
                      <p className="text-sm text-white/80">
                        Content quality assessment
                      </p>
                    </div>
                    <div className="text-3xl font-bold">B+</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Play/Demo Overlay */}
      {!isPlaying && animationStep === 0 && isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity z-20">
          <Button
            size="lg"
            onClick={startAnimation}
            className="flex items-center gap-2 bg-white text-black hover:bg-gray-100"
            variant="secondary"
          >
            <Play size={18} fill="currentColor" /> Watch Demo
          </Button>
        </div>
      )}
    </div>
  );
}
