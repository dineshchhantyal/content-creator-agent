"use client";

import { motion } from "framer-motion";
import React from "react";
import { FeatureFlag } from "../features/flags";
import {
  useSchematicEntitlement,
  useSchematicIsPending,
} from "@schematichq/schematic-react";
import { Progress } from "../ui/progress";
import { Card, CardContent } from "../ui/card";
import { BatteryFull, BatteryLow, BatteryMedium, Loader2 } from "lucide-react";

export default function Usage({
  featureFlag,
  title,
}: {
  featureFlag: FeatureFlag;
  title: string;
}) {
  const isPending = useSchematicIsPending();

  const {
    featureAllocation,
    featureUsage,
    featureUsageExceeded,
    value: isFeatureEnabled,
  } = useSchematicEntitlement(featureFlag);

  const hasUsedAllTokens = featureUsageExceeded;
  const progress =
    featureUsage && featureAllocation
      ? (featureUsage / featureAllocation) * 100
      : 0;

  const getProgressColor = (p: number) => {
    if (p < 50) return "bg-emerald-500";
    if (p < 80) return "bg-amber-500";
    return "bg-red-500";
  };

  const getProgressIcon = (p: number) => {
    if (p < 50) return <BatteryFull className="h-5 w-5 text-emerald-500" />;
    if (p < 80) return <BatteryMedium className="h-5 w-5 text-amber-500" />;
    return <BatteryLow className="h-5 w-5 text-red-500" />;
  };

  const progressColorClass = getProgressColor(progress);

  if (isPending) {
    return (
      <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
        <CardContent className="p-6 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Loading usage data...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isFeatureEnabled) {
    return (
      <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
        <CardContent className="p-6">
          <div className="text-center py-4">
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            <div className="bg-gray-100 dark:bg-gray-800/60 rounded-lg p-4 mt-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This feature is not available on your current plan.
              </p>
              <a
                href="/manage-plan"
                className="inline-block mt-3 text-sm text-purple-600 dark:text-purple-400 font-medium hover:underline"
              >
                Upgrade to access {title}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">{title}</h3>
            {getProgressIcon(progress)}
          </div>

          <div className="mb-4">
            <Progress
              value={progress}
              className={`h-2.5 rounded-full bg-gray-100 dark:bg-gray-800 [&>*]:${progressColorClass}`}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {hasUsedAllTokens ? (
                <span className="text-red-500">Limit reached</span>
              ) : (
                <span>
                  <span className="font-semibold">
                    {featureUsage?.toLocaleString() ?? 0}
                  </span>{" "}
                  of <span>{featureAllocation?.toLocaleString() ?? 0}</span>
                </span>
              )}
            </span>

            <span className="text-xs text-gray-500 dark:text-gray-400">
              {progress.toFixed(0)}% used
            </span>
          </div>

          {hasUsedAllTokens && (
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
              <a
                href="/manage-plan"
                className="text-sm text-center w-full inline-block p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-md font-medium hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                Upgrade to increase limit
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
