"use client";

import { useSchematicEntitlement } from "@schematichq/schematic-react";
import React from "react";
import { FeatureFlag } from "../features/flags";
import Usage from "../metrics/Usage";

interface TranscriptionEntry {
  id: string;
  text: string;
}
const TranscriptionGeneration = ({ videoId }: { videoId: string }) => {
  const [transcript] = React.useState<{
    transcript: TranscriptionEntry[];
    cache: string;
  } | null>(null);

  const { featureUsageExceeded } = useSchematicEntitlement(
    FeatureFlag.TRANSCRIPTION
  );

  console.log("featureUsageExceeded", { featureUsageExceeded, videoId });
  return (
    <div>
      <div>
        <Usage
          featureFlag={FeatureFlag.TRANSCRIPTION}
          title="Transcription Generation"
        />
      </div>
      <div>
        {transcript?.transcript.map((entry) => (
          <div key={entry.id}>
            <div>{entry.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranscriptionGeneration;
