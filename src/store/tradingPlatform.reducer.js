import { configureStore } from "@reduxjs/toolkit";
import searchResultsSlice from "./searchResults-slice";
import uiSlice from "./ui-slice";


const store = configureStore({
  reducer: {searchResults: searchResultsSlice.reducer, uiNotification: uiSlice.reducer},
});

export default store;
