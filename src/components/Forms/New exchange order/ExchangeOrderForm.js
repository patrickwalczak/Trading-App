import Modal from "../../UI/Modal/Modal"
import classes from './ExchangeOrderForm.module.css'
import searchImg from '../../../images/search.png'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCryptocurrencies } from "../../../store/takeCryptocurrencies"
import FoundElementsContainer from "./FoundElementsContainer"
import StatusMsg from "./StatusMsg"
import loadingSpinnerImg from '../../../images/loadingSpinner.png'
import { searchResultsActions } from "../../../store/searchResults-slice"

const ExchangeOrderForm = (props) => {
    const [isSearching, setIsSearching] = useState(false)
    const [searchInputValue, setSearchInputValue] = useState('')
    const dispatch = useDispatch()
    const {searchResults} = useSelector(state => state.searchResults)
    const {notification} = useSelector(state => state.uiNotification)


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

    const closeFormActionsHandler = () => {
        clearInputHandler();
        searchResultsActions.clearSearchResults();
        props.onChangeModalState()
    }

    useEffect(()=> {
        if(!isSearching && searchInputValue.length === 0) return;
        dispatch(fetchCryptocurrencies(searchInputValue))
        setTimeout(setIsSearching(false), 500)
    }, [dispatch, isSearching, searchInputValue])

    const displayLoadingSpinner = notification?.status === 'loading' && searchInputValue && <img className={classes.loadingSpinner} src={loadingSpinnerImg}></img>;
    const displayClearInputBtn = (notification?.status === 'success' || notification?.status === 'failed') && searchInputValue && <button className={classes.clearInputBtn} onClick={clearInputHandler}>x</button>;

    return <Modal onChangeModalState={props.onChangeModalState} onCloseFormActions={closeFormActionsHandler}>
        <div className={classes.exchangeFormContainer}>
            <div className={classes.formHeaderContainer}>
            <h3 className={classes.exchangeFormHeader}>Order new exchange</h3>
            <button className={classes.formCloseBtn} onClick={closeFormActionsHandler}>X</button>
            </div>
            <form className={classes.exchangeForm}>
                <div className={classes.inputSearchContainer}>
                    <img className={classes.searchImg} src={searchImg}></img>
                    <input value={searchInputValue} onBlur={onBlurHandler} onChange={onChangeHandler} 
                    className={classes.searchInput} type="text" placeholder="Search by symbol or name" ></input>
                    {displayClearInputBtn}
                    {displayLoadingSpinner}
                </div>
                {notification?.status === 'success' && searchInputValue && <FoundElementsContainer searchResults={searchResults} />}
                {notification?.status === 'failed' && <StatusMsg>lost internet connection</StatusMsg>}

            </form>
        </div>
    </Modal>
}

export default ExchangeOrderForm;