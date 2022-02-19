import { createSlice } from "@reduxjs/toolkit";

const accountDataSlice = createSlice({
  name: "accountData",
  initialState: {
    userName: "",
    transactions: [],
    availableFunds: 10000,
    currency: "USD",
    watchList: [],
  },
  reducers: {
    addTransaction(state, action) {
      const { transactionData } = action.payload;
    },
  },
});

export const accountDataActions = accountDataSlice.actions;

export default accountDataSlice;
