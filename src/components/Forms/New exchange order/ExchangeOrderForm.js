import Modal from "../../UI/Modal/Modal"
import classes from './ExchangeOrderForm.module.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCryptocurrencies } from "../../../store/takeCryptocurrencies"
import { searchResultsActions } from "../../../store/searchResults-slice"
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


    return <Modal onChangeModalState={props.onChangeModalState} onCloseFormActions={closeFormActionsHandler}>
        <div className={classes.exchangeFormContainer}>
            <div className={classes.formHeaderContainer}>
            <h3 className={classes.exchangeFormHeader}>Order new exchange</h3>
            <button className={classes.formCloseBtn} onClick={closeFormActionsHandler}>X</button>
            </div>
            <form className={classes.exchangeForm}>
                {!chosenSecurity?.id && <InputSearchContainer onBlur={onBlurHandler} onChange={onChangeHandler} value={searchInputValue} onClearInputHandler={clearInputHandler} />}
                {chosenSecurity?.id && <ChosenSecurity data={chosenSecurity} />}
            </form>
        </div>
    </Modal>
}

export default ExchangeOrderForm;