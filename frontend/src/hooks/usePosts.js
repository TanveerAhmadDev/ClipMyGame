// // src/hooks/usePosts.js

// import { useEffect, useState } from "react";
// import api from "../utils/axios";
// import { buildPostQuery } from "../utils/postFilters";

// const usePosts = (filters) => {
//   const [posts, setPosts] = useState([]);
//   const [loadingPosts, setLoadingPosts] = useState(false);
//   const [postsError, setPostsError] = useState(null);

//   const fetchPosts = async () => {
//     try {
//       setLoadingPosts(true);
//       setPostsError(null);

//       const params = buildPostQuery(filters);

//       console.log("POST FILTER PARAMS:", params);

//       const { data } = await api.get("/post/posts", {
//         params,
//       });

//       setPosts(data.data?.posts || []);
//     } catch (error) {
//       console.error("Failed to fetch posts:", error);
//       setPostsError(error);
//     } finally {
//       setLoadingPosts(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [
//     filters.sport,
//     filters.skill,
//     filters.countryCode,
//     filters.stateCode,
//     filters.city,
//     filters.level,
//     filters.contentType,
//     filters.sortBy,
//   ]);

//   return {
//     posts,
//     setPosts,
//     loadingPosts,
//     postsError,
//     refetchPosts: fetchPosts,
//   };
// };

// export default usePosts;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/axios";
import { buildPostQuery } from "../utils/postFilters";
import { setPosts } from "../features/post/postSlice";
import { useState } from "react";

const usePosts = (filters) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);

  const [loadingPosts, setLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoadingPosts(true);
      setPostsError(null);

      const params = buildPostQuery(filters);

      const { data } = await api.get("/post/posts", {
        params,
      });

      dispatch(setPosts(data.data?.posts || []));
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setPostsError(error);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [
    filters.sport,
    filters.skill,
    filters.countryCode,
    filters.stateCode,
    filters.city,
    filters.level,
    filters.contentType,
    filters.sortBy,
  ]);

  return {
    posts,
    loadingPosts,
    postsError,
    refetchPosts: fetchPosts,
  };
};

export default usePosts;
