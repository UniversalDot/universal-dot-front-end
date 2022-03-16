import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedAccountBalance: '',
  keyringOptions: [],
  selectedKeyring: {
    key: '',
    value: '',
    text: '',
  },
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setSelectedKeyringAction(state, action) {
      state.selectedKeyring = action.payload;
    },
    setBalance(state, action) {
      state.selectedAccountBalance = action.payload;
    },
    setKeyringOptionsAction(state, action) {
      state.keyringOptions = action.payload;
    },
  },
});

export const {
  changeUsername,
  setSelectedKeyringAction,
  setBalance,
  setKeyringOptionsAction,
} = accountSlice.actions;

export default accountSlice.reducer;
