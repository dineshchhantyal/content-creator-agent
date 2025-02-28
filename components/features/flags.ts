export enum FeatureFlag {
  TRANSCRIPTION = "transcription",
  IMAGE_GENERATION = "image-generations",
  ANALYZE_VIDEO = "analysis-video",
  TITLE_GENERATION = "title-generations",
  SCRIPT_GENERATION = "script-generation",
}

export const featureFlagEvents: Record<
  FeatureFlag,
  {
    event: string;
  }
> = {
  [FeatureFlag.TRANSCRIPTION]: {
    event: "transcription",
  },
  [FeatureFlag.IMAGE_GENERATION]: {
    event: "image-generation",
  },
  [FeatureFlag.ANALYZE_VIDEO]: {
    event: "analyze-video",
  },
  [FeatureFlag.TITLE_GENERATION]: {
    event: "title-generation",
  },
  [FeatureFlag.SCRIPT_GENERATION]: {
    event: "",
  },
};
