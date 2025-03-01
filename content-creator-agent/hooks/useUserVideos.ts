import { useEffect, useState } from "react";

const useUserVideos = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchUserVideos = async () => {
      try {
        const response = await fetch("/api/user/videos"); // Adjust the API endpoint as needed
        const data = await response.json();

        if (data && data.length > 0) {
          setVideos(data);
          setIsEmpty(false);
        } else {
          setVideos([]);
          setIsEmpty(true);
        }
      } catch (error) {
        console.error("Error fetching user videos:", error);
        setVideos([]);
        setIsEmpty(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserVideos();
  }, []);

  return { videos, isLoading, isEmpty };
};

export default useUserVideos;