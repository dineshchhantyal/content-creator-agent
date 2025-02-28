"use client";

import { motion } from "framer-motion";
import React from "react";
import { FeatureFlag } from "../features/flags";
import {
  useSchematicEntitlement,
  useSchematicIsPending,
} from "@schematichq/schematic-react";
import { Progress } from "../ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  Loader2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

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
      <Card className="border border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900/90 backdrop-blur-sm">
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
      <Card className="border border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900/90 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 rounded-lg border border-purple-100 dark:border-purple-900/30 p-4">
            <div className="text-sm text-purple-700 dark:text-purple-400">
              This feature is not available on your current plan.
            </div>
            <Link
              href="/manage-plan"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Upgrade Now <ArrowRight size={14} />
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900/90 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg font-medium">{title}</span>
            {getProgressIcon(progress)}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="mb-3">
            <Progress
              value={progress}
              className={`h-2.5 rounded-full bg-gray-100 dark:bg-gray-800 [&>*]:${progressColorClass}`}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              {hasUsedAllTokens ? (
                <span className="text-red-500">Usage limit reached</span>
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
              {Math.min(progress, 100).toFixed(0)}% used
            </span>
          </div>

          {hasUsedAllTokens && (
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800">
              <Link
                href="/manage-plan"
                className="text-sm text-center w-full inline-flex items-center justify-center gap-1 p-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white rounded-md font-medium transition-colors"
              >
                Upgrade to increase limit <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
