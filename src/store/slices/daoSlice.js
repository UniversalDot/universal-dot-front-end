import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalOrganizations: 0,
  totalVisions: 0,
  joinedOrganizations: [],
  suggestedVisions: [],
  visionNameForAction: '',
  organizationNameForAction: '',
  memberOrTaskForAction: '',
  applicantsToOrganization: [],
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
    setOrganizationName(state, action) {
      state.organizationNameForAction = action.payload;
    },
    setMemberOrTask(state, action) {
      state.memberOrTaskForAction = action.payload;
    },
    setApplicants(state, action) {
      state.applicantsToOrganization = action.payload;
    },
    resetState(state) {
      state.visionNameForAction = '';
      state.organizationNameForAction = '';
      state.memberOrTaskForAction = '';
    },
  },
});

export const {
  setTotalOrganizations,
  setTotalVisions,
  setJoinedOrganizations,
  setSuggestedVisions,
  setVisionName,
  setOrganizationName,
  setMemberOrTask,
  setApplicants,
  resetState,
} = daoSlice.actions;

export default daoSlice.reducer;
