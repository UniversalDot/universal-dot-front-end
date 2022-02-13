import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const daoSlice = createSlice({
  name: 'dao',
  initialState,
  reducers: {
    todo(state, action) {
      state.tasks = action.payload;
    },
  },
});

export const { todo } = daoSlice.actions;

export default daoSlice.reducer;
