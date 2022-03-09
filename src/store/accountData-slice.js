import { createSlice } from "@reduxjs/toolkit";

const accountDataSlice = createSlice({
  name: "accountData",
  initialState: {
    userName: "",
    transactions: [],
    availableFunds: 0,
    currency: "",
    watchList: [],
    purchasedCryptocurrencies: [],
  },
  reducers: {
    getUserAccountData(state, action) {
      state.userName = action.payload.userName || "User";
      state.availableFunds = action.payload.availableFunds || 10000;
      state.currency = action.payload.currency || "USD";
      state.watchList = [];

      const transactionsObj = action.payload?.transactions;

      if (transactionsObj !== undefined) {
        Object.entries(transactionsObj).map((transaction) => {
          return state.transactions.unshift({
            databaseID: transaction[0],
            transactionData: transaction[1],
          });
        });
      }
      if (action.payload?.cryptoUniqueList) {
        action.payload.cryptoUniqueList.map((item, index) => {
          if (item !== null)
            state.purchasedCryptocurrencies.unshift({
              ...item,
              databaseListIndex: index,
            });
        });
      }
    },

    addTransaction(state, action) {
      state.transactions.unshift({ ...action.payload });
    },

    updateAvailableFunds(state, action) {
      state.availableFunds = action.payload;
    },

    addPurchasedCrypto(state, action) {
      state.purchasedCryptocurrencies = action.payload;
    },
    removePurchasedCrypto(state, action) {
      const { id } = action.payload;

      state.purchasedCryptocurrencies = state.purchasedCryptocurrencies.filter(
        (item) => item.id !== id
      );
    },
  },
});

export const accountDataActions = accountDataSlice.actions;

export default accountDataSlice;
