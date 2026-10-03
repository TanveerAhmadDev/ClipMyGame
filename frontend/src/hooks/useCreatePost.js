// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import api from "../utils/axios";
// import { addPost } from "../features/post/postSlice";

// const useCreatePost = () => {
//   const dispatch = useDispatch();

//   const [posting, setPosting] = useState(false);

//   const createPost = async ({
//     caption,
//     visibility,
//     tags,
//     media,
//     contentType,
//     sport,
//     skills,
//     level,
//     location,
//     onSuccess,
//   }) => {
//     try {
//       setPosting(true);

//       const formData = new FormData();

//       const metadata = {
//         contentType,
//         sport,
//         skills,
//         level,
//         location,
//         tags,
//       };

//       formData.append("caption", caption);
//       formData.append("visibility", visibility);
//       formData.append("metadata", JSON.stringify(metadata));

//       media.forEach((item) => {
//         formData.append("media", item.file);
//       });

//       const result = await api.post("/post/createpost", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const newPost = result.data.data;

//       // Add immediately to Redux
//       dispatch(addPost(newPost));

//       toast.success("Post created successfully.");

//       if (onSuccess) {
//         onSuccess(newPost);
//       }

//       return result.data;
//     } catch (error) {
//       console.error(error);

//       toast.error(error.response?.data?.message || "Failed to create post.");

//       throw error;
//     } finally {
//       setPosting(false);
//     }
//   };

//   return {
//     createPost,
//     posting,
//   };
// };

// export default useCreatePost;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import api from "../utils/axios";
import { addPost } from "../features/post/postSlice";

const useCreatePost = () => {
  const dispatch = useDispatch();

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

      // -----------------------------
      // Separate uploaded & external media
      // -----------------------------

      const uploadedMedia = media.filter(
        (item) => item.type === "image" || item.type === "video",
      );

      const externalMedia = media
        .filter((item) => item.type === "external")
        .map((item) => ({
          url: item.url,
          type: "external",
          platform: item.platform,
        }));

      // -----------------------------
      // Metadata
      // -----------------------------

      const metadata = {
        contentType,
        sport,
        skills,
        level,
        location,
        tags,
        externalMedia,
      };

      // -----------------------------
      // Basic fields
      // -----------------------------

      formData.append("caption", caption);
      formData.append("visibility", visibility);

      // Convert metadata object to JSON
      formData.append("metadata", JSON.stringify(metadata));

      // -----------------------------
      // Upload only actual files
      // -----------------------------

      uploadedMedia.forEach((item) => {
        formData.append("media", item.file);
      });

      // -----------------------------
      // Send request
      // -----------------------------

      const result = await api.post("/post/createpost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newPost = result.data.data;

      // Add immediately to Redux
      dispatch(addPost(newPost));

      toast.success("Post created successfully.");

      if (onSuccess) {
        onSuccess(newPost);
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
