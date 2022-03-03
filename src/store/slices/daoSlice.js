import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalOrganizations: 0,
  totalVisions: 0,
  joinedOrganizations: [],
  suggestedVisions: [],
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
  },
});

export const {
  setTotalOrganizations,
  setTotalVisions,
  setJoinedOrganizations,
  setSuggestedVisions,
} = daoSlice.actions;

export default daoSlice.reducer;
