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
      state.userName = action.payload.userName;
      state.availableFunds = action.payload.availableFunds || 10000;
      state.currency = action.payload.currency;
      state.watchList = action.payload?.watchList || [];

      const transactionsObj = action.payload?.transactions;

      if (transactionsObj !== undefined) {
        Object.entries(transactionsObj).map((transaction) => {
          return state.transactions.unshift({
            databaseID: transaction[0],
            transactionData: transaction[1],
          });
        });

        state.purchasedCryptocurrencies = [
          ...new Set(
            state.transactions.map(
              (item) => item.transactionData.purchasedSecurityID
            )
          ),
        ];
      }
    },

    addTransaction(state, action) {
      state.transactions.unshift({ ...action.payload });
    },

    updateAvailableFunds(state, action) {
      state.availableFunds = action.payload;
    },

    addPurchasedCrypto(state, action) {
      const { purchasedSecurityID: cryptoID } = action.payload;

      const checkIfAlreadyIs = state.purchasedCryptocurrencies.find(
        (item) => item === cryptoID
      );

      if (checkIfAlreadyIs === undefined) {
        state.purchasedCryptocurrencies.unshift(cryptoID);
      }
    },
  },
});

export const accountDataActions = accountDataSlice.actions;

export default accountDataSlice;
