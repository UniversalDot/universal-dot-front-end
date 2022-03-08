import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalOrganizations: 0,
  totalVisions: 0,
  joinedOrganizations: [],
  suggestedVisions: [],
  visionNameForAction: '',
};

const daoSlice = createSlice({
  name: 'dao',
  initialState,
  reducers: {
    setTotalOrganizations(state, action) {
      state.totalOrganizations = action.payload;
    },
    setTotalVisions(state, action) {
      state.totalVisions = action.payload;
    },
    setJoinedOrganizations(state, action) {
      state.joinedOrganizations = action.payload;
    },
    setSuggestedVisions(state, action) {
      state.suggestedVisions = action.payload;
    },
    setVisionName(state, action) {
      state.visionNameForAction = action.payload;
    },
  },
});

export const {
  setTotalOrganizations,
  setTotalVisions,
  setJoinedOrganizations,
  setSuggestedVisions,
  setVisionName,
} = daoSlice.actions;

export default daoSlice.reducer;
