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
    getUserAccountData(state, action) {
      state.userName = action.payload.userName;
      state.availableFunds = action.payload.availableFunds || 10000;
      state.currency = action.payload.currency;
      state.watchList = action.payload?.watchList || [];

      const transactionsObj = action.payload?.transactions;

      if (transactionsObj === undefined) return;

      const convertedArrFromFirebase = Object.entries(transactionsObj).map(
        (transaction) => {
          return {
            databaseID: transaction[0],
            transactionData: transaction[1],
          };
        }
      );

      state.transactions = convertedArrFromFirebase;
    },

    addTransaction(state, action) {
      state.transactions.unshift({ ...action.payload });
    },

    updateAvailableFunds(state, action) {
      state.availableFunds = action.payload;
    },
  },
});

export const accountDataActions = accountDataSlice.actions;

export default accountDataSlice;
