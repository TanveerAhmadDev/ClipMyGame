import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },

    updatePostLike: (state, action) => {
      const { postId, liked, likes } = action.payload;

      const post = state.posts.find((post) => post._id === postId);

      if (post) {
        post.liked = liked;
        post.performance.likes = likes;
      }
    },
  },
});

export const { setPosts, addPost, updatePostLike } = postsSlice.actions;

export default postsSlice.reducer;
