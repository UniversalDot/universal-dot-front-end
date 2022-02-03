import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: '',
  message: '',
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setStatusMessage(state, action) {
      state.message = action.payload;
    },
  },
});

export const { setStatus, setStatusMessage } = statusSlice.actions;

export default statusSlice.reducer;
