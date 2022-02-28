import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    transactionCounter: 0,
    expirationDate: null,
    activeCrypto: null,
    activeCryptoHistoricalData: [],
  },
  reducers: {
    increaseCounter(state) {
      ++state.transactionCounter;
    },

    initState(state, action) {
      const { expirationDate, transactionCounter } = action.payload;
      state.transactionCounter = transactionCounter;
      state.expirationDate = expirationDate;
    },

    setActiveCrypto(state, action) {
      state.activeCrypto = action.payload;
    },

    fillHistoricalDataArr(state, action) {
      state.activeCryptoHistoricalData = action.payload.prices;
    },
  },
});

export const applicationActions = applicationSlice.actions;

export default applicationSlice;

// expiration date is property which stores a current date.
// Transaction counter starts from zero everyday.
// if date in firebase will be different than date here,
// then we send "PUT" request to overwrite date and start transaction counter from zero

// -MwLmbRjZUUKo8dEZNIX
