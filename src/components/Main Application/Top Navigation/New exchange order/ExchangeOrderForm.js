import Modal from "../../../UI/Modal/Modal"
import classes from './ExchangeOrderForm.module.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCryptocurrencies } from "../../../../store/takeCryptocurrencies"
import { searchResultsActions } from "../../../../store/searchResults-slice"
import InputSearchContainer from "./InputSearchContainer"
import ChosenSecurity from "./ChosenSecurity"

const ExchangeOrderForm = (props) => {
    const [isSearching, setIsSearching] = useState(false)
    const [searchInputValue, setSearchInputValue] = useState('')
    const {chosenSecurity} = useSelector(state => state.searchResults)
    const dispatch = useDispatch()


    const onChangeHandler = (e) => {
        setIsSearching(true)
        setSearchInputValue(e.target.value.trim())
    }

    const onBlurHandler = () => {
        setIsSearching(false)
    }

    const clearInputHandler = () => {
        setSearchInputValue('')
    }

    const resetSearchResults = (isModal = false) => {
        clearInputHandler();
        dispatch(searchResultsActions.clearSearchResults());
        dispatch(searchResultsActions.removeChosenSecurity())

        if(isModal === 'yes') {
            props.onChangeModalState()
        }
    }

    useEffect(()=> {
        if(!isSearching && searchInputValue.length === 0) return;
        dispatch(fetchCryptocurrencies(searchInputValue))
        setTimeout(setIsSearching(false), 500)
    }, [dispatch, isSearching, searchInputValue])


    return <Modal onCloseFormActions={resetSearchResults.bind(null, 'yes')}>
        <div className={classes.exchangeFormContainer}>
            <div className={classes.formHeaderContainer}>
            <h3 className={classes.exchangeFormHeader}>Order new exchange</h3>
            <button className={classes.formCloseBtn} onClick={resetSearchResults.bind(null, 'yes')}>X</button>
            </div>
            <form className={classes.exchangeForm}>
                {!chosenSecurity?.id && <InputSearchContainer onBlur={onBlurHandler} onChange={onChangeHandler} value={searchInputValue} onClearInputHandler={clearInputHandler} />}
                {chosenSecurity?.id && <ChosenSecurity data={chosenSecurity} onReset={resetSearchResults}  />}
                <div className={classes.chooseTransactionTypeContainer}>
                    <button className={`${classes.chooseTransactionBtn}`}>BUY</button>
                    <button className={`${classes.chooseTransactionBtn}`}>SELL</button>
                </div>
                <div className={classes.transactionDetailContainer}>
                    <div className={`${classes.transactionInputLabelContainer} ${classes.priceContainer}`}>
                        <label className={classes.transactionLabel} htmlFor="currentPrice">Price</label>
                        <input className={classes.transactionInput}  type="number" id="currentPrice"></input>
                    </div>
                    <div className={`${classes.transactionInputLabelContainer} ${classes.amountContainer}`}>
                        <label className={classes.transactionLabel} htmlFor="amount">Amount</label>
                        <input className={classes.transactionInput} type="number" id="amount"></input>
                    </div>
                </div>
                <div className={classes.transactionSummaryContainer}>
                    <div className={classes.transactionSummaryFragment}>
                        <h6 className={classes.transactionSummaryHeader}> Available funds </h6> <span className={classes.transactionSummaryValue}>699$</span>
                    </div>
                    <div className={classes.transactionSummaryFragment}>
                        <h6 className={classes.transactionSummaryHeader}> Commission</h6> <span className={classes.transactionSummaryValue}>10$</span>
                    </div>
                    <div className={classes.transactionSummaryFragment}>
                        <h6 className={classes.transactionSummaryHeader}> Order value</h6> <span className={classes.transactionSummaryValue}>10$</span>
                    </div>
                    <div className={classes.transactionSummaryFragment}>
                        <h6 className={classes.transactionSummaryHeader}> Available funds after order</h6> <span className={classes.transactionSummaryValue}>10$</span>
                    </div>
                </div>
                <button className={classes.placeOrderBtn} type="submit">Place Order</button>
            </form>
        </div>
    </Modal>
}

export default ExchangeOrderForm;