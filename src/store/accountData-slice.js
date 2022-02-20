import { createSlice } from "@reduxjs/toolkit";

const accountDataSlice = createSlice({
  name: "accountData",
  initialState: {
    userName: "",
    transactions: [],
    availableFunds: 0,
    currency: "",
    watchList: [],
  },
  reducers: {
    addTransaction(state, action) {
      console.log(action.payload);
    },
    getUserAccountData(state, action) {
      const { userName, transactions, availableFunds, currency, watchList } =
        action.payload;

      state = {
        userName,
        transactions: transactions || [],
        availableFunds: availableFunds || 0,
        currency,
        watchList: watchList || [],
      };
    },
  },
});

export const accountDataActions = accountDataSlice.actions;

export default accountDataSlice;
