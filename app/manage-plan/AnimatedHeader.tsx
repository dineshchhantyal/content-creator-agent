"use client";

import { motion } from "framer-motion";
import React from "react";

export default function AnimatedHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-3">
        Subscription Management
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Manage your plan, view billing history, and update payment information
      </p>
    </motion.div>
  );
}
