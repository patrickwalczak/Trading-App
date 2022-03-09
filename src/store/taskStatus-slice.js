import { createSlice } from "@reduxjs/toolkit";

// IMPROVE Too much duplicated code

const taskStatusSlice = createSlice({
  name: "taskStatus",
  initialState: {
    searchResultsStatus: null,
    sendTransactionStatus: null,
    loadApplicationDataStatus: null,
    loadAccountDataStatus: null,
    loadSingleCrypto: null,
    fetchingHistoricalDataStatus: null,
    singleFromList: null,
  },
  reducers: {
    changeApplicationDataLoading(state, action) {
      const status = action.payload;

      if (status === null) {
        state.loadApplicationDataStatus = null;
      } else {
        state.loadApplicationDataStatus = {
          status: action.payload.status,
        };
      }
    },
    changeAccountDataLoading(state, action) {
      const status = action.payload;

      if (status === null) {
        state.loadAccountDataStatus = null;
      } else {
        state.loadAccountDataStatus = {
          status: action.payload.status,
        };
      }
    },
    changeSearchResultsStatus(state, action) {
      const status = action.payload;

      if (status === null) {
        state.searchResultsStatus = null;
      } else {
        state.searchResultsStatus = {
          status: action.payload.status,
        };
      }
    },
    changeSendingTransactionStatus(state, action) {
      const status = action.payload;

      if (status === null) {
        state.sendTransactionStatus = null;
      } else {
        state.sendTransactionStatus = {
          status: action.payload.status,
        };
      }
    },
    changeFetchingSingleCryptoStatus(state, action) {
      const status = action.payload;

      if (status === null) {
        state.loadSingleCrypto = null;
      } else {
        state.loadSingleCrypto = {
          status: action.payload.status,
        };
      }
    },
    changeFetchingHistoricalData(state, action) {
      const status = action.payload;

      if (status === null) {
        state.fetchingHistoricalDataStatus = null;
      } else {
        state.fetchingHistoricalDataStatus = {
          status: action.payload.status,
        };
      }
    },
    changeSingleFromListStatus(state, action) {
      const status = action.payload;

      if (status === null) {
        state.singleFromList = null;
      } else {
        state.singleFromList = {
          status: action.payload.status,
        };
      }
    },
  },
});

export const taskStatusActions = taskStatusSlice.actions;

export default taskStatusSlice;
