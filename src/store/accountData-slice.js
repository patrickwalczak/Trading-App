import { createSlice } from "@reduxjs/toolkit";

const accountDataSlice = createSlice({
  name: "accountData",
  initialState: {
    userName: "",
    transactions: [],
    availableFunds: 10000,
    currency: "USD",
  },
  reducers: {},
});

export const accountDataActions = accountDataSlice.actions;

export default accountDataSlice;
