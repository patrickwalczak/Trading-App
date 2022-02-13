import { searchResultsActions } from "./searchResults-slice";
import {uiActions} from './ui-slice'

export const fetchCryptocurrencies = (query) => {
    return async (dispatch) => {
        
        try{
            dispatch(uiActions.loadingStatus({status: 'loading'}))

            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)

            if (!response.ok) {
                throw new Error('Lost internet connecton!');
              }
    
            const data = await response.json()
    
            dispatch(searchResultsActions.searchByQuery({query, data}))

            if(query !== '') {
              setTimeout(() => {
                dispatch(uiActions.loadingStatus({status: 'success'}))
              }, 200);
            }
           

        } catch (err) {
          dispatch(uiActions.loadingStatus({status: 'failed'}))
        }

       
        
    }
}


/* 
export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
*/