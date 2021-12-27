import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: 'Malcolm 2X',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUsername(state, action) {
      console.log({ state });
      console.log({ action });
      state.username = action.payload;
    },
  },
});

export const { changeUsername } = userSlice.actions;

export default userSlice.reducer;
