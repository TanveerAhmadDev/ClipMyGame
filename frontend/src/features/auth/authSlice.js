import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  roleData: null,
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload.user;
      state.roleData = action.payload.roleData;
      state.isAuthenticated = true;
      state.loading = false;
    },

    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const { setUserData, setAuthLoading, logout } = authSlice.actions;

export default authSlice.reducer;
