"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Tool } from "@/types/tool"; // We'll create this type

type FeaturedToolProps = {
  tool: Tool;
};

export function FeaturedTool({ tool }: FeaturedToolProps) {
  return (
    <motion.div
      className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative aspect-video md:aspect-auto overflow-hidden">
          <Image
            src={tool.imageUrl || "/ai-tools/default.jpg"}
            alt={tool.name}
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <div>
              <Badge className="mb-2 bg-purple-500 hover:bg-purple-600 text-white border-none">
                Featured Tool
              </Badge>
              <h3 className="text-2xl font-bold text-white">{tool.name}</h3>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-8 flex flex-col">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3">
              {tool.icon}
            </div>
            <div>
              <Badge
                variant={tool.proOnly ? "default" : "secondary"}
                className="mr-2"
              >
                {tool.proOnly ? "Pro" : "Free"}
              </Badge>
              {tool.new && <Badge variant="outline">New</Badge>}
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
            {tool.description}
          </p>

          <div className="mb-6">
            <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
              Key Features:
            </h4>
            <ul className="space-y-1">
              {tool.features.map((feature, index) => (
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
            Try {tool.name} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
