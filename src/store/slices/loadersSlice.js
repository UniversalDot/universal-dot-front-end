import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: false,
  tasks: false,
};

const loadersSlice = createSlice({
  name: 'loaders',
  initialState,
  reducers: {
    setLoading(state, action) {
      state[action.payload.type] = action.payload.value;
    },
  },
});

export const { setLoading } = loadersSlice.actions;

export default loadersSlice.reducer;
