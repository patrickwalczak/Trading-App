import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    transactionCounter: 0,
    expirationDate: null,
    activeCrypto: null,
    activeCryptoHistoricalData: [],
    webCounter: null,
    modalVisibility: false,
    transactionType: "",
  },
  reducers: {
    changeModalState(state) {
      state.modalVisibility = !state.modalVisibility;
    },

    changeTransactionType(state, action) {
      state.transactionType = action.payload;
    },

    increaseCounter(state) {
      ++state.transactionCounter;
    },

    initState(state, action) {
      const { expirationDate, transactionCounter } = action.payload;
      state.transactionCounter = transactionCounter;
      state.expirationDate = expirationDate;
    },

    setActiveCrypto(state, action) {
      const cyrptoData = action.payload;

      let priceHigh24 = cyrptoData.market_data.high_24h["usd"];
      let priceLow24 = cyrptoData.market_data.low_24h["usd"];
      const totalVolume =
        cyrptoData.market_data.total_volume["usd"].toLocaleString("en-US") || 0;

      let maxFractionDigits = 2;

      const localStringOptions = {
        maximumFractionDigits: maxFractionDigits,
        style: "currency",
        currency: "USD",
      };

      if (+priceHigh24.toFixed(maxFractionDigits) === 0) {
        maxFractionDigits = 4;
      }

      if (+priceHigh24.toFixed(maxFractionDigits) === 0) {
        maxFractionDigits = 6;
      }

      priceHigh24 = Number(priceHigh24).toLocaleString(
        "en-US",
        localStringOptions
      );

      priceLow24 = Number(priceLow24).toLocaleString(
        "en-US",
        localStringOptions
      );

      state.activeCrypto = {
        ...action.payload,
        priceHigh24,
        priceLow24,
        totalVolume,
      };
    },
    removeActiveCrypto(state) {
      state.activeCrypto = null;
    },

    fillHistoricalDataArr(state, action) {
      const { data: historicData, dataRange } = action.payload;
      const today = new Date();
      const weekday = today.getDay();
      const monthDay = today.getDate();
      const month = today.getMonth() + 1;

      let prices;

      if (+dataRange === 1) {
        prices = historicData.prices
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
        prices = historicData.prices.map((item) => {
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

      state.activeCryptoHistoricalData = prices;
    },
  },
});

export const applicationActions = applicationSlice.actions;

export default applicationSlice;
