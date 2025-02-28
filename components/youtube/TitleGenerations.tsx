import { useUser } from "@clerk/nextjs";
import React from "react";
import Usage from "../metrics/Usage";
import { FeatureFlag } from "../features/flags";
import { Copy } from "lucide-react";

const TitleGenerations = ({ videoId }: { videoId: string }) => {
  const { user } = useUser();

  interface Title {
    id: string;
    text: string;
  }
  console.log(videoId, user);
  const titles: Title[] = [];
  return (
    <div>
      <div>
        <Usage
          featureFlag={FeatureFlag.TITLE_GENERATION}
          title="Title Generation"
        />
      </div>

      {titles.map((title) => (
        <div key={title.id}>
          <div>{title.text}</div>
          <button
            onClick={() => {
              // Copy to clipboard
              navigator.clipboard.writeText(title.text);
            }}
            className="flex items-center justify-center"
          >
            <Copy className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      ))}
      {!titles.length && (
        <div>
          <p>No titles generated yet.</p>
        </div>
      )}
    </div>
  );
};

export default TitleGenerations;
