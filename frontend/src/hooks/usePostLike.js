import { useState } from "react";
import api from "../utils/axios";

const usePostLike = () => {
  const [liking, setLiking] = useState(false);

  const toggleLike = async (postId) => {
    try {
      setLiking(true);

      const { data } = await api.post(`/post/${postId}/like`);

      return data.data;
    } catch (error) {
      console.error("Failed to like post:", error);

      throw error;
    } finally {
      setLiking(false);
    }
  };

  return {
    toggleLike,
    liking,
  };
};

export default usePostLike;
