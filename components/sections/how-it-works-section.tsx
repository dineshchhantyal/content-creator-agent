"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Link, MessageSquare, SearchCode, Zap } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/lib/constants";

const steps = [
  {
    title: "Connect Your Content with URL",
    description:
      "Simply paste your YouTube or TikTok URL and let our AI agent get to work.",
    icon: <Link className="w-6 h-6 text-white" />,
    image: "/step1-connect.svg",
  },
  {
    title: "AI Agent Will Analyze",
    description:
      "Our powerful AI analyzes your content for engagement, structure, and opportunities.",
    icon: <SearchCode className="w-6 h-6 text-white" />,
    image: "/step2-analyze.svg",
  },
  {
    title: "Receive AI-Powered Insights",
    description:
      "Get actionable recommendations to enhance your content and grow your audience.",
    icon: <Zap className="w-6 h-6 text-white" />,
    image: "/step3-receive.svg",
  },
];

// Sample chat messages to demonstrate AI interaction
const chatMessages = [
  {
    role: "assistant",
    content:
      "I've analyzed your video about smartphone photography. Here are my insights:",
  },
  {
    role: "assistant",
    content:
      "The first 30 seconds could be more engaging. Consider starting with your best shot to hook viewers.",
  },
  {
    role: "user",
    content: "How can I improve the lighting section?",
  },
  {
    role: "assistant",
    content:
      "Your lighting section at 2:45 would benefit from a quick before/after comparison. This would make the impact more obvious to viewers.",
  },
  {
    role: "user",
    content: "Can you suggest a better title for my video?",
  },
  {
    role: "assistant",
    content:
      "Based on trending searches and your content, try: '7 Pro Smartphone Photography Tricks That Will Stun Your Followers'",
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(2);

  // Animate in more messages when user clicks "Continue Chat"
  const showMoreMessages = () => {
    if (visibleMessages < chatMessages.length) {
      setVisibleMessages((prevCount) =>
        Math.min(prevCount + 2, chatMessages.length)
      );
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="container px-4 mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Meet Your AI Agent in{" "}
            <span className="text-purple-600 dark:text-purple-400">
              3 Simple Steps
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Our powerful AI agent transforms your content creation process with
            just a few clicks
          </motion.p>
        </div>

        {/* Steps Section */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute hidden md:block top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 transform -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                onClick={() => setActiveStep(index)}
              >
                {/* Step Number */}
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-full ${
                    activeStep === index
                      ? "bg-gradient-to-br from-purple-600 to-fuchsia-500 ring-4 ring-purple-200 dark:ring-purple-900/30"
                      : "bg-gradient-to-br from-purple-600 to-fuchsia-500"
                  } text-white text-xl font-bold mb-6 shadow-lg shadow-purple-500/25 cursor-pointer transition-all duration-300`}
                >
                  {index + 1}
                </div>

                {/* Illustration */}
                <div
                  className={`relative w-full aspect-square max-w-[240px] mb-6 transition-all duration-300 ${
                    activeStep === index ? "scale-105" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-purple-100 dark:bg-purple-900/20 rounded-xl" />
                  <div className="absolute inset-2 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center">
                    <Image
                      src={step.image}
                      width={200}
                      height={200}
                      alt={`Step ${index + 1}: ${step.title}`}
                      className="w-full h-auto max-h-[160px] object-contain p-4"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="absolute top-14 right-0 transform translate-x-1/2 -translate-y-1/3 hidden md:block">
                    <ArrowRight className="w-8 h-8 text-purple-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive AI Chat Demo */}
        <motion.div
          className="mt-20 mb-16 relative max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 -z-10 blur-3xl opacity-10 bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-3xl" />

          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold">
              Chat with Your{" "}
              <span className="text-purple-600 dark:text-purple-400">
                AI Agent
              </span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Ask questions and refine your content based on the AI analysis
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <div
                  className={`h-8 w-8 rounded-md bg-gradient-to-br from-${
                    siteConfig?.colors?.gradient?.from || "purple-600"
                  } via-${
                    siteConfig?.colors?.gradient?.via || "violet-500"
                  } to-${
                    siteConfig?.colors?.gradient?.to || "fuchsia-500"
                  } flex items-center justify-center`}
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Content Analysis Chat</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Online
                </span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-4 h-[320px] overflow-y-auto flex flex-col gap-3">
              {chatMessages.slice(0, visibleMessages).map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } gap-2`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                      <div
                        className={`w-6 h-6 rounded-full bg-gradient-to-br from-${
                          siteConfig?.colors?.gradient?.from || "purple-600"
                        } to-${
                          siteConfig?.colors?.gradient?.to || "fuchsia-500"
                        } flex items-center justify-center`}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
                            stroke="white"
                            strokeWidth="2"
                          />
                          <path
                            d="M15 9C15 9 13.5 7 12 7C10.5 7 9 8.5 9 10.5C9 12.5 10.5 14 12 14C13.5 14 15 12.5 15 10.5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        message.role === "user"
                          ? "text-white"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {message.content}
                    </p>
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                          fill="#6B7280"
                        />
                        <path
                          d="M12 13C8.13401 13 5 16.134 5 20V21H19V20C19 16.134 15.866 13 12 13Z"
                          fill="#6B7280"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}

              {visibleMessages < chatMessages.length && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={showMoreMessages}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                  >
                    Continue Chat
                  </button>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask your AI agent anything..."
                  className="flex-1 py-2 px-3 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                />
                <button
                  className={`p-2 rounded-full bg-gradient-to-r from-${
                    siteConfig?.colors?.gradient?.from || "purple-600"
                  } to-${
                    siteConfig?.colors?.gradient?.to || "fuchsia-500"
                  } hover:opacity-90 transition-opacity`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 2L11 13"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 2L15 22L11 13L2 9L22 2Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Workflow Diagram */}
        <motion.div
          className="mt-20 relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-3xl" />
          <div className="bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-6 text-center">
              How CreatorAI Works Behind the Scenes
            </h3>
            <div className="relative">
              {/* Workflow Diagram SVG */}
              <svg
                viewBox="0 0 800 250"
                className="w-full h-auto max-h-[300px]"
              >
                <defs>
                  <linearGradient
                    id="flowGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#9333EA" />
                    <stop offset="100%" stopColor="#D946EF" />
                  </linearGradient>
                  {/* Marker definition for the arrows */}
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="0"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3.5, 0 7"
                      fill="url(#flowGradient)"
                    />
                  </marker>
                </defs>

                {/* Background Grid */}
                <pattern
                  id="smallGrid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="rgba(107, 114, 128, 0.1)"
                    strokeWidth="0.5"
                  />
                </pattern>
                <pattern
                  id="grid"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <rect width="100" height="100" fill="url(#smallGrid)" />
                  <path
                    d="M 100 0 L 0 0 0 100"
                    fill="none"
                    stroke="rgba(107, 114, 128, 0.2)"
                    strokeWidth="1"
                  />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Content Input Box */}
                <rect
                  x="50"
                  y="100"
                  width="150"
                  height="75"
                  rx="10"
                  fill="#F3E8FF"
                  stroke="#9333EA"
                  strokeWidth="2"
                />
                <text
                  x="125"
                  y="140"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#9333EA"
                >
                  Content Input
                </text>

                {/* Arrow to AI Engine */}
                <path
                  d="M 200 140 L 250 140"
                  stroke="url(#flowGradient)"
                  strokeWidth="3"
                  markerEnd="url(#arrowhead)"
                />

                {/* AI Engine Box */}
                <rect
                  x="275"
                  y="75"
                  width="200"
                  height="125"
                  rx="10"
                  fill="#F9F5FF"
                  stroke="#9333EA"
                  strokeWidth="2"
                />
                <rect
                  x="300"
                  y="100"
                  width="150"
                  height="75"
                  rx="6"
                  fill="#9333EA"
                  fillOpacity="0.2"
                />
                <text
                  x="375"
                  y="120"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#9333EA"
                >
                  AI Analysis Engine
                </text>
                <text
                  x="375"
                  y="145"
                  textAnchor="middle"
                  fontSize="12"
                  fill="#4B5563"
                >
                  Video Analysis
                </text>
                <text
                  x="375"
                  y="165"
                  textAnchor="middle"
                  fontSize="12"
                  fill="#4B5563"
                >
                  Context Processing
                </text>

                {/* Arrow to Output */}
                <path
                  d="M 475 140 L 525 140"
                  stroke="url(#flowGradient)"
                  strokeWidth="3"
                  markerEnd="url(#arrowhead)"
                />

                {/* Results Box */}
                <rect
                  x="550"
                  y="100"
                  width="150"
                  height="75"
                  rx="10"
                  fill="#F0FDFA"
                  stroke="#9333EA"
                  strokeWidth="2"
                />
                <text
                  x="625"
                  y="140"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#9333EA"
                >
                  Actionable Insights
                </text>

                {/* Labels */}
                <text
                  x="125"
                  y="200"
                  textAnchor="middle"
                  fontSize="12"
                  fill="#6B7280"
                >
                  URL Upload
                </text>
                <text
                  x="375"
                  y="225"
                  textAnchor="middle"
                  fontSize="12"
                  fill="#6B7280"
                >
                  ML Models + AI Processing
                </text>
                <text
                  x="625"
                  y="200"
                  textAnchor="middle"
                  fontSize="12"
                  fill="#6B7280"
                >
                  Recommendations
                </text>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
