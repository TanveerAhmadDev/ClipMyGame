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

    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },

    clearPosts: (state) => {
      state.posts = [];
    },
  },
});

export const { setPosts, addPost, removePost, clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
