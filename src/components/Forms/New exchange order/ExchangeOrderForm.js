import Modal from "../../UI/Modal/Modal"
import classes from './ExchangeOrderForm.module.css'
import searchImg from '../../../images/search.png'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCryptocurrencies } from "../../../store/takeCryptocurrencies"
import FoundElementsContainer from "./FoundElementsContainer"
import StatusMsg from "./StatusMsg"

const ExchangeOrderForm = (props) => {
    const [isSearching, setIsSearching] = useState(false)
    const [searchInputValue, setSearchInputValue] = useState('')
    const dispatch = useDispatch()
    const {searchingResults} = useSelector(state => state.searchResults)
    const {notification} = useSelector(state => state.uiNotification)


    const onChangeHandler = (e) => {
        setIsSearching(true)

        setSearchInputValue(e.target.value.trim())
    }


    const onBlurHandler = () => {
        setIsSearching(false)
    }

    useEffect(()=> {
        if(!isSearching) return;
        console.log(searchInputValue)
        dispatch(fetchCryptocurrencies(searchInputValue))


        setTimeout(setIsSearching(false), 500)
    }, [dispatch, isSearching, searchInputValue])

    return <Modal onChangeModalState={props.onChangeModalState}>
        <div className={classes.exchangeFormContainer}>
            <div className={classes.formHeaderContainer}>
            <h3 className={classes.exchangeFormHeader}>Order new exchange</h3>
            <button className={classes.formCloseBtn} onClick={props.onChangeModalState}>X</button>
            </div>
            <form className={classes.exchangeForm}>
                <div className={classes.inputSearchContainer}>
                    <img className={classes.searchImg} src={searchImg}></img>
                    <input value={searchInputValue} onBlur={onBlurHandler} onChange={onChangeHandler} 
                    className={classes.searchInput} type="search" placeholder="Search by symbol or name" ></input>
                </div>
                {notification?.status === 'success' && <FoundElementsContainer searchingResults={searchingResults} />}
                {notification?.status === 'failed' && <StatusMsg>lost internet connection</StatusMsg>}

            </form>
        </div>
    </Modal>
}

export default ExchangeOrderForm;