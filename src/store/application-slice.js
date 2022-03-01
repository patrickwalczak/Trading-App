import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    transactionCounter: 0,
    expirationDate: null,
    activeCrypto: null,
    activeCryptoHistoricalData: [],
  },
  reducers: {
    increaseCounter(state) {
      ++state.transactionCounter;
    },

    initState(state, action) {
      const { expirationDate, transactionCounter } = action.payload;
      state.transactionCounter = transactionCounter;
      state.expirationDate = expirationDate;
    },

    setActiveCrypto(state, action) {
      state.activeCrypto = action.payload;
    },

    fillHistoricalDataArr(state, action) {
      const { data: historicData, dataRange } = action.payload;
      const today = new Date();
      const weekday = today.getDay();
      const monthDay = today.getDate();
      const month = today.getMonth() + 1;

      let pricesFromToday;

      if (+dataRange === 1) {
        pricesFromToday = historicData.prices
          .map((item) => [new Date(item[0]), item[1]])
          .filter(
            (item) =>
              item[0].getDay() === weekday &&
              item[0].getDate() === monthDay &&
              item[0].getMonth() + 1 === month
          )
          .map((item) => {
            const hours = String(item[0].getHours()).padStart(2, 0);
            const minutes = String(item[0].getMinutes()).padStart(2, 0);
            const time = `${hours}:${minutes}`;

            return [time, item[1]];
          });
      }

      if (+dataRange > 1) {
        pricesFromToday = historicData.prices.map((item) => {
          const convertTimestamp = new Date(item[0]);
          const getDay = String(convertTimestamp.getDate()).padStart(2, 0);
          const getMonth = String(convertTimestamp.getMonth() + 1).padStart(
            2,
            0
          );
          const getYear = convertTimestamp.getFullYear();
          const dataTime = `${getDay}-${getMonth}-${getYear}`;

          return [dataTime, item[1]];
        });
      }

      state.activeCryptoHistoricalData = pricesFromToday;
    },
  },
});

export const applicationActions = applicationSlice.actions;

export default applicationSlice;

// expiration date is property which stores a current date.
// Transaction counter starts from zero everyday.
// if date in firebase will be different than date here,
// then we send "PUT" request to overwrite date and start transaction counter from zero

// -MwLmbRjZUUKo8dEZNIX

// [ [1646053825033, 367.64123843136827]
//  [1646054075751, 367.98720215889136]
//  [1646054378967, 367.2280284148458]
//   [1646054629067, 366.8062059761764]
//   [1646054935048, 365.5720121759836]
//   [1646055269058, 365.8363561898928] ]
