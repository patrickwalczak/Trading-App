import { Fragment, useState } from "react"
import { useSelector } from "react-redux"
import classes from './ExchangeOrderForm.module.css'

const TransactionDetail = () => {
    const [buyBtnIsActive, setBuyBtnState] = useState(false)
    const [sellBtnIsActive, setSellBtnState] = useState(false)
    const {chosenSecurity} = useSelector(state => state.searchResults)
    const isChosenClass = chosenSecurity === null ? 'notChosen' : 'chosen';
    const inputState = chosenSecurity === null ? true : false;

    const transactionTypeBtnHandler = (e) => {
        e.preventDefault()
        const transactionType = e.target.dataset.transactionType;
        
        if(transactionType === "BUY") {
            setSellBtnState(false)
            setBuyBtnState(!buyBtnIsActive)};
        if(transactionType === "SELL") {
            setBuyBtnState(false)
            setSellBtnState(!sellBtnIsActive)
        };

    }


    const chosenSecurityPrice = chosenSecurity?.current_price ? `$ ${chosenSecurity.current_price.toFixed(2)}` : '';

    const activeBuyButtonClass = buyBtnIsActive ? 'active' : '';
    const activeSellButtonClass = sellBtnIsActive ? 'active' : '';
    const transactionBtnClasses = `${classes.chooseTransactionBtn} ${classes[isChosenClass]}`;
    const buyBtnClasses = `${classes.buyTransBtn} ${transactionBtnClasses} ${classes[activeBuyButtonClass]}`;
    const sellBtnClasses = `${classes.sellTransBtn} ${transactionBtnClasses} ${classes[activeSellButtonClass]}`;

return ( <Fragment>
            <div className={`${classes.chooseTransactionTypeContainer }`}>
                <button onClick={transactionTypeBtnHandler} data-transaction-type="BUY" disabled={inputState} className={buyBtnClasses}>BUY</button>
                <button onClick={transactionTypeBtnHandler} data-transaction-type="SELL" disabled={inputState} className={sellBtnClasses}>SELL</button>
            </div>
            <div className={classes.transactionDetailContainer}>
                <div className={`${classes.transactionInputLabelContainer} ${classes.priceContainer}`}>
                    <label className={classes.transactionLabel} htmlFor="currentPrice">Price</label>
                    <input disabled={true} className={`${classes.transactionInput}`}  type="text" id="currentPrice" defaultValue={chosenSecurityPrice}></input>
                </div>
            <div className={`${classes.transactionInputLabelContainer} ${classes.amountContainer}`}>
                    <label className={classes.transactionLabel} htmlFor="amount">Amount</label>
                    <input disabled={inputState}  className={`${classes.transactionInput} ${classes[isChosenClass]}`}  type="number" id="amount"></input>
                </div>
            </div>
</Fragment>
)
}

export default TransactionDetail