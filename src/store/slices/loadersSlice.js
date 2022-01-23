import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  queryLoading: false,
};

const loadersSlice = createSlice({
  name: 'loaders',
  initialState,
  reducers: {
    setQueryLoader(state, action) {
      state.queryLoading = action.payload;
    },
  },
});

export const { setQueryLoader } = loadersSlice.actions;

export default loadersSlice.reducer;
