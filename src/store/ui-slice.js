import { createSlice } from '@reduxjs/toolkit';


const uiSlice = createSlice({
    name: 'ui',
    initialState: { 
        notification: null 
    },
    reducers: {
      loadingStatus(state, action) {
        state.notification = {
          status: action.payload.status,
        };
      },
    },
  });
  
  export const uiActions = uiSlice.actions;
  
  export default uiSlice;