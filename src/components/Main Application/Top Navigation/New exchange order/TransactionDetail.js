import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { accountDataActions } from "../../../../store/accountData-slice"
import classes from './TransactionDetail.module.css'

const TransactionDetail = (props) => {
    const [buyBtnIsActive, setBuyBtnState] = useState(false);
    const [sellBtnIsActive, setSellBtnState] = useState(false);
    const [sellNotAvailable, setSellAvailable] = useState(null);
    const [amountInputValue, setAmountInputValue] = useState('');
    const [amountInputIsValid, setAmountInputValidation] = useState(true);


    const {chosenSecurity} = useSelector(state => state.searchResults);
    const {transactions} = useSelector(state => state.accountData);

    // If security will be chosen (for example cryptocurrency such as bitcoin), then we remove disabled property from buttons and input
    const isChoosing = chosenSecurity === null ? true : false;
    // This assures that if security is not chosen but button will be hovered then no styling will be applied for buttons
    const isChosenClass = chosenSecurity === null ? 'notChosen' : 'chosen';

    // These two classes apply styling for transaction type button when its clicked
    const activeBuyButtonClass = buyBtnIsActive ? 'active' : '';
    const activeSellButtonClass = sellBtnIsActive ? 'active' : '';
    const transactionBtnClasses = `${classes.transactionTypeBtnGeneral} ${classes[isChosenClass]}`;
    const buyBtnClasses = `${classes.buyBtnClass} ${transactionBtnClasses} ${classes[activeBuyButtonClass]}`;
    const sellBtnClasses = `${classes.sellBtnClass} ${transactionBtnClasses} ${classes[activeSellButtonClass]}`;
    const chosenSecurityPrice = chosenSecurity?.current_price ? `$ ${chosenSecurity.current_price}` : '';



    const transactionTypeBtnHandler = (e) => {
        e.preventDefault()
        const transactionType = e.target.dataset.transactionType;
        
        if(transactionType === "BUY") {
            setSellBtnState(false)
            setBuyBtnState(!buyBtnIsActive)
            props.onGetTransactionType(transactionType)
        };

        if(transactionType === "SELL") {
            setBuyBtnState(false)

            const foundTransactionIndex = Number(transactions.findIndex(item => item.securityID === chosenSecurity.id));

            if(foundTransactionIndex === -1) {
                return setSellAvailable(false);
            }
            
            props.onGetTransactionType(transactionType)
            setSellBtnState(!sellBtnIsActive)
        };

    }

    const amountHandler = (e) => {
        setAmountInputValidation(true)

        const enteredAmount = e.target.value.trim();

        if(enteredAmount.includes(',')) enteredAmount.replace(',', '.');


        if(enteredAmount <= 0 && enteredAmount.length === 1) {
            setAmountInputValidation(false);
            return
        }
           
    }

    useEffect(()=> {
        setTimeout(() =>{
            if(sellNotAvailable === false) {
                setSellAvailable(null)
        }
        
        }, 1000 )

    }, [sellNotAvailable])




return ( <Fragment>
            <div className={`${classes.chooseTransactionTypeContainer }`}>
                <button onClick={transactionTypeBtnHandler} data-transaction-type="BUY" disabled={isChoosing} className={buyBtnClasses}>BUY</button>
                <div className={classes.sellBtnContainer}>
                <button onClick={transactionTypeBtnHandler} data-transaction-type="SELL" disabled={isChoosing} className={sellBtnClasses}>SELL</button>
                {sellNotAvailable === false && <p className={classes.sellNotAvailable}>Sell not available!</p>}
                </div>
            </div>
            <div className={classes.transactionDetailContainer}>
                <div className={`${classes.transactionInputLabelContainer} ${classes.priceContainer}`}>
                    <label className={classes.transactionLabel} htmlFor="currentPrice">Price</label>
                    <input disabled={true} className={`${classes.transactionInput}`}  type="text" id="currentPrice" defaultValue={chosenSecurityPrice}></input>
                </div>
            <div className={`${classes.transactionInputLabelContainer} ${classes.amountContainer}`}>
                    <label className={classes.transactionLabel} htmlFor="amount">Amount</label>
                    <input disabled={isChoosing}  className={`${classes.transactionInput} ${classes[isChosenClass]}`} 
                    onChange={amountHandler}  type="number" id="amount"></input>
                </div>
            </div>
                {!amountInputIsValid && <p className={classes.invalidInputAmount}>Invalid input</p>}
</Fragment>)
}

export default TransactionDetail