import { loadingTimeLimitHandler } from "../helpers/helpers";
import { fetchHandler } from "./application-actions";
import { applicationActions } from "./application-slice";
import { searchResultsActions } from "./searchResults-slice";
import { taskStatusActions } from "./taskStatus-slice";

export const fetchCryptocurrencies = (query) => {
  return async (dispatch) => {
    try {
      dispatch(
        taskStatusActions.changeSearchResultsStatus({ status: "loading" })
      );

      const response_data = await Promise.race([
        dispatch(
          fetchHandler(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=false`
          )
        ),
        loadingTimeLimitHandler(),
      ]);

      const data = response_data.filter(
        (crypto) => crypto.current_price >= 0.001
      );

      dispatch(searchResultsActions.searchByQuery({ query, data }));

      setTimeout(() => {
        dispatch(
          taskStatusActions.changeSearchResultsStatus({ status: "success" })
        );
      }, 200);
    } catch (err) {
      dispatch(
        taskStatusActions.changeSearchResultsStatus({ status: "failed" })
      );
    }
  };
};

export const fetchSingleFromList = (query) => {
  return async (dispatch) => {
    try {
      dispatch(
        taskStatusActions.changeSingleFromListStatus({ status: "loading" })
      );

      const response_data = await Promise.race([
        dispatch(
          fetchHandler(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=false`
          )
        ),
        loadingTimeLimitHandler(),
      ]);

      const data = response_data.filter(
        (crypto) => crypto.id === query || crypto.name.toLowerCase() === query
      );

      dispatch(searchResultsActions.addChosenSecurity(...data));
      dispatch(
        taskStatusActions.changeSingleFromListStatus({ status: "success" })
      );
    } catch (err) {
      console.log(err);
      dispatch(
        taskStatusActions.changeSingleFromListStatus({ status: "failed" })
      );
    }
  };
};

export const fetchSingleCrypto = (cryptoID) => {
  return async (dispatch) => {
    try {
      dispatch(
        taskStatusActions.changeFetchingSingleCryptoStatus({
          status: "loading",
        })
      );

      const data = await Promise.race([
        dispatch(
          fetchHandler(`https://api.coingecko.com/api/v3/coins/${cryptoID}`)
        ),
        loadingTimeLimitHandler(),
      ]);

      dispatch(applicationActions.setActiveCrypto(data));

      dispatch(
        taskStatusActions.changeFetchingSingleCryptoStatus({
          status: "success",
        })
      );
    } catch (err) {
      dispatch(
        taskStatusActions.changeFetchingSingleCryptoStatus({ status: "failed" })
      );
    }
  };
};

export const fetchHistoricalData = (cryptoID, currency, dataRange) => {
  return async (dispatch) => {
    try {
      dispatch(
        taskStatusActions.changeFetchingHistoricalData({
          status: "loading",
        })
      );

      let url;

      if (+dataRange === 1) {
        url = `https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${currency}&days=${dataRange}`;
      }

      if (+dataRange !== 1) {
        url = `https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${currency}&days=${dataRange}&interval=daily`;
      }

      const data = await Promise.race([
        dispatch(fetchHandler(url)),
        loadingTimeLimitHandler(),
      ]);

      dispatch(applicationActions.fillHistoricalDataArr({ data, dataRange }));

      dispatch(
        taskStatusActions.changeFetchingHistoricalData({
          status: "success",
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(
        taskStatusActions.changeFetchingHistoricalData({
          status: "failed",
        })
      );
    }
  };
};

/* 

https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=daily

https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}


export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
*/
