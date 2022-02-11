import { configureStore } from "@reduxjs/toolkit";
import searchResultsSlice from "./searchResults-slice";


const store = configureStore({
  reducer: searchResultsSlice.reducer,
});

export default store;
