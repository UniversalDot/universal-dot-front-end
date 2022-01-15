import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedAccountKey: '',
  selectedAccountUsername: '',
  selectedAccountBalance: '',
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountSelected(state, action) {
      state.selectedAccountKey = action.payload.selectedAccountKey;
      state.selectedAccountUsername = action.payload.selectedAccountUsername;
    },
    setBalance(state, action) {
      state.selectedAccountBalance = action.payload;
    },
  },
});

export const { changeUsername, setAccountSelected, setBalance } =
  accountSlice.actions;

export default accountSlice.reducer;
