import { createSlice } from "@reduxjs/toolkit";

const taskStatusSlice = createSlice({
  name: "taskStatus",
  initialState: {
    searchResultsStatus: null,
    sendTransactionStatus: null,
  },
  reducers: {
    changeSearchResultsStatus(state, action) {
      state.searchResultsStatus = {
        status: action.payload.status,
      };
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
  },
});

export const taskStatusActions = taskStatusSlice.actions;

export default taskStatusSlice;
