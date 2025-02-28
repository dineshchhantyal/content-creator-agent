import { useUser } from "@clerk/nextjs";
import React from "react";
import Usage from "../metrics/Usage";
import { FeatureFlag } from "../features/flags";
import Image from "next/image";
import { useImages } from "@/hooks/useImages";

const ThumbnailGeneration = ({ videoId }: { videoId: string }) => {
  const { user } = useUser();

  const { images = [] } = useImages(videoId, user?.id ?? "");
  console.log("ThumbnailGeneration", { videoId, user, images });

  return (
    <div>
      <div>
        <Usage
          featureFlag={FeatureFlag.IMAGE_GENERATION}
          title="Thumbnail Generation"
        />
      </div>

      <div>
        {images.map((image) => (
          <div key={image._id}>
            {image.url && (
              <div>
                <Image
                  src={image.url}
                  alt="Thumbnail"
                  width={1280}
                  height={720}
                />
              </div>
            )}
          </div>
        ))}

        {!images.length && (
          <div>
            <p>No thumbnails generated yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThumbnailGeneration;
