import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import analyzeYoutubeVideo from "@/actions/analyzeYoutubeVideo";
import { Loader2 } from "lucide-react";

const AnalyzePage = () => {
  const router = useRouter();
  const { videoId } = router.query;
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (videoId) {
      const fetchAnalysis = async () => {
        try {
          const result = await analyzeYoutubeVideo({ videoId });
          setAnalysisResult(result);
        } catch (err) {
          setError("Failed to analyze the video. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchAnalysis();
    }
  }, [videoId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card>
          <CardContent>
            <CardTitle className="text-lg font-medium">Analysis Results</CardTitle>
            {/* Render analysis results here */}
            <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AnalyzePage;