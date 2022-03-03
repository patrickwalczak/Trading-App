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
      state.purchasedCryptocurrencies = [];

      const transactionsObj = action.payload?.transactions;
      const purchasedCrypto = action.payload?.purchasedCryptocurrencies;

      if (transactionsObj !== undefined) {
        const convertedArrFromFirebase = Object.entries(transactionsObj).map(
          (transaction) => {
            return {
              databaseID: transaction[0],
              transactionData: transaction[1],
            };
          }
        );

        state.transactions = convertedArrFromFirebase;

        const cryptoIDs = new Set(
          convertedArrFromFirebase.map(
            (item) => item.transactionData.purchasedSecurityID
          )
        );

        state.purchasedCryptocurrencies = [...cryptoIDs];
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
        (item) => item.id === cryptoID
      );

      if (checkIfAlreadyIs !== undefined) {
        state.purchasedCryptocurrencies.unshift(cryptoID);
      }
    },
  },
});

export const accountDataActions = accountDataSlice.actions;

export default accountDataSlice;
