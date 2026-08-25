import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  opportunities: [],
  selectedOpportunity: null,
  myOpportunities: [],
  myApplications: [],
  loading: false,
};

const opportunitySlice = createSlice({
  name: "opportunity",

  initialState,

  reducers: {
    setOpportunities: (state, action) => {
      state.opportunities = action.payload;
    },

    addOpportunity: (state, action) => {
      state.opportunities.unshift(action.payload);
    },

    updateOpportunity: (state, action) => {
      const index = state.opportunities.findIndex(
        (item) => item._id === action.payload._id,
      );

      if (index !== -1) {
        state.opportunities[index] = action.payload;
      }
    },

    removeOpportunity: (state, action) => {
      state.opportunities = state.opportunities.filter(
        (item) => item._id !== action.payload,
      );
    },

    setSelectedOpportunity: (state, action) => {
      state.selectedOpportunity = action.payload;
    },

    setMyOpportunities: (state, action) => {
      state.myOpportunities = action.payload;
    },

    setMyApplications: (state, action) => {
      state.myApplications = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setOpportunities,
  addOpportunity,
  updateOpportunity,
  removeOpportunity,
  setSelectedOpportunity,
  setMyOpportunities,
  setMyApplications,
  setLoading,
} = opportunitySlice.actions;

export default opportunitySlice.reducer;
