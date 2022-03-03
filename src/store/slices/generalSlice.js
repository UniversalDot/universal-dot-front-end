import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarWidth: 180,
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {},
});

export const {} = generalSlice.actions;

export default generalSlice.reducer;
