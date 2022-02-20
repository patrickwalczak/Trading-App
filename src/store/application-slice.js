import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    transactionCounter: 0,
    processingStatus: null,
    expirationDate: null,
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
  },
});

export const applicationActions = applicationSlice.actions;

export default applicationSlice;

// expiration date is property which stores a current date.
// Transaction counter starts from zero everyday.
// if date in firebase will be different than date here,
// then we send "PUT" request to overwrite date and start transaction counter from zero

// -MwLmbRjZUUKo8dEZNIX
