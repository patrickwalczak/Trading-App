import { configureStore } from "@reduxjs/toolkit";
import accountDataSlice from "./accountData-slice";
import searchResultsSlice from "./searchResults-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    searchResults: searchResultsSlice.reducer,
    uiNotification: uiSlice.reducer,
    accountData: accountDataSlice.reducer,
  },
});

export default store;
