import { useState } from "react";
import { toast } from "react-toastify";
import api from "../utils/axios"; // your axios instance with refresh token

const useCreatePost = () => {
  const [posting, setPosting] = useState(false);

  const createPost = async ({
    caption,
    visibility,
    tags,
    media,
    contentType,
    sport,
    skills,
    level,
    location,
    onSuccess,
  }) => {
    try {
      setPosting(true);

      const formData = new FormData();

      const metadata = {
        contentType,
        sport,
        skills,
        level,
        location,
        tags,
      };

      formData.append("caption", caption);
      formData.append("visibility", visibility);
      formData.append("metadata", JSON.stringify(metadata));

      media.forEach((item) => {
        formData.append("media", item.file);
      });

      const result = await api.post("/post/createpost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Post created successfully.");

      if (onSuccess) {
        onSuccess(result.data.data);
      }

      return result.data;
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to create post.");

      throw error;
    } finally {
      setPosting(false);
    }
  };

  return {
    createPost,
    posting,
  };
};

export default useCreatePost;
