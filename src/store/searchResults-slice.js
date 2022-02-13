import { createSlice } from '@reduxjs/toolkit';

const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState: {
        searchResults: []
    },
    reducers: {
        searchByQuery(state, action) {
            const {query, data: resultsArr} = action.payload
            const filteredArr = resultsArr.filter(cryptoObj => cryptoObj.symbol.toLowerCase().includes(query.toLowerCase()) || cryptoObj.name.toLowerCase().includes(query.toLowerCase()))
            state.searchResults = filteredArr;
        },
        clearSearchResults(state) {
            state.searchResults = []
        }


    }

})

export const searchResultsActions = searchResultsSlice.actions;

export default searchResultsSlice;