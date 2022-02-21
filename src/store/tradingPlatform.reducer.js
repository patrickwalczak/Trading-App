import { configureStore } from "@reduxjs/toolkit";
import accountDataSlice from "./accountData-slice";
import applicationSlice from "./application-slice";
import searchResultsSlice from "./searchResults-slice";
import taskStatusSlice from "./taskStatus-slice";

const store = configureStore({
  reducer: {
    searchResults: searchResultsSlice.reducer,
    taskStatus: taskStatusSlice.reducer,
    accountData: accountDataSlice.reducer,
    applicationData: applicationSlice.reducer,
  },
});

export default store;
