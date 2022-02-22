import { createSlice } from "@reduxjs/toolkit";

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: {
    searchResults: [],
    chosenSecurity: null,
  },
  reducers: {
    searchByQuery(state, action) {
      const { query, data: resultsArr } = action.payload;
      const filteredArr = resultsArr.filter(
        (cryptoObj) =>
          cryptoObj.symbol.toLowerCase().includes(query.toLowerCase()) ||
          cryptoObj.name.toLowerCase().includes(query.toLowerCase())
      );
      state.searchResults = filteredArr;
    },
    clearSearchResults(state) {
      state.searchResults = [];
    },
    addChosenSecurity(state, action) {
      const securityPrice = action.payload.current_price;
      let maxFractionDigits = 2;

      if (+securityPrice.toFixed(maxFractionDigits) === 0) {
        maxFractionDigits = 4;
      }

      if (+securityPrice.toFixed(maxFractionDigits) === 0) {
        maxFractionDigits = 6;
      }
      const convertedPrice = Number(securityPrice).toLocaleString("en-US", {
        maximumFractionDigits: maxFractionDigits,
        style: "currency",
        currency: "USD",
      });

      state.chosenSecurity = {
        ...action.payload,
        convertedPrice,
        maxFractionDigits,
      };
    },
    removeChosenSecurity(state) {
      state.chosenSecurity = null;
    },
  },
});

export const searchResultsActions = searchResultsSlice.actions;

export default searchResultsSlice;
