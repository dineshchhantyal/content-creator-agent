import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

export function useImages(userId: string, videoId: string) {
  const images = useQuery(api.images.getImages, { userId, videoId });
  const generateUploadUrl = useMutation(api.images.generateUploadUrl);
  const createImage = useMutation(api.images.createImage);
  const deleteImage = useMutation(api.images.deleteImage);
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (
    file: File,
    title?: string,
    description?: string,
    type?: string
  ) => {
    try {
      setIsUploading(true);

      // Get a temporary upload URL
      const uploadUrl = await generateUploadUrl();

      // Upload the file to storage
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        throw new Error(`Failed to upload image: ${result.statusText}`);
      }

      // Get the storage ID from the upload result
      const { storageId } = await result.json();

      // Create a record in the database linking the file to this video
      await createImage({
        videoId,
        userId,
        storageId,
        title,
        description,
        type,
      });

      return true;
    } catch (error) {
      console.error("Error uploading image:", error);
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = async (imageId: Id<"images">) => {
    try {
      await deleteImage({ imageId, userId });
      return true;
    } catch (error) {
      console.error("Error deleting image:", error);
      return false;
    }
  };

  return {
    images,
    isUploading,
    uploadImage,
    removeImage,
  };
}
