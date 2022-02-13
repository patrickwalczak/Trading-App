import classes from './ExchangeOrderForm.module.css'
import { useDispatch } from 'react-redux'
import { searchResultsActions } from '../../../store/searchResults-slice';



const FoundElement = (props) => {
    const dispatch = useDispatch();


    const clickHandler = () => {
        console.log(props.data)

        dispatch(searchResultsActions.addChosenSecurity({...props.data}))
        
    }

    return <li className={classes.foundElement} onClick={clickHandler}>
        <div className={classes.foundElementImgContainer}>

        <img src={props.data.image} className={classes.foundElementImg}></img>
        </div>
        <div className={classes.foundElementNameSymbolContainer}>
            <h6 className={classes.foundElName}>{props.data.name}</h6>
            <span className={classes.foundElSymbol}>{props.data.symbol}</span>
        </div>
        <span className={classes.foundElType}>cryptocurrency</span>
    </li>
}

export default FoundElement

/* 
ath: 489.75
ath_change_percentage: -80.74611
ath_date: "2021-04-16T17:09:04.630Z"
atl: 42.02
atl_change_percentage: 124.42198
atl_date: "2018-11-23T00:00:00.000Z"
circulating_supply: 18977945.394239
current_price: 94.23
fully_diluted_valuation: null
high_24h: 95.41
id: "bitcoin-cash-sv"
image: "https://assets.coingecko.com/coins/images/6799/large/BSV.png?1558947902"
last_updated: "2022-02-13T08:04:17.696Z"
low_24h: 93.09
market_cap: 1788197556
market_cap_change_24h: 6582215
market_cap_change_percentage_24h: 0.36945
market_cap_rank: 67
max_supply: null
name: "Bitcoin SV"
price_change_24h: 0.114148
price_change_percentage_24h: 0.12129
roi: null
symbol: "bsv"
total_supply: 21000000
total_volume: 46965665
*/