import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  form: {
    interests: [],
  },
  data: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.data = action.payload;
    },
    setFormInterests(state, action) {
      state.form = {
        ...state.form,
        interests: action.payload,
      };
    },
  },
});

export const { setProfile, setFormInterests } = profileSlice.actions;

export default profileSlice.reducer;
