import { useState, useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

export function useImages(videoId: string, userId: string) {
  const images = useQuery(api.images.getImages, { videoId, userId });
  const generateUploadUrl = useMutation(api.images.generateUploadUrl);
  const createImage = useMutation(api.images.createImage);
  const deleteImage = useMutation(api.images.deleteImage);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<Record<string, boolean>>({});

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
      setIsDeleting((prev) => ({ ...prev, [imageId]: true }));
      await deleteImage({ imageId, userId });
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    } finally {
      setIsDeleting((prev) => ({ ...prev, [imageId]: false }));
    }
  };

  // Function to refresh images from the server
  const refreshImages = async () => {
    // This will trigger a refetch of the useQuery hook
    // Convex React hooks automatically handle refetching when dependencies change
    return true;
  };

  return {
    images,
    isUploading,
    uploadImage,
    removeImage,
    refreshImages,
    isDeleting,
  };
}
