import { Fragment } from 'react';
import classes from './ExchangeOrderForm.module.css'
import { useSelector } from "react-redux"
import searchImg from '../../../../images/search.png'
import loadingSpinnerImg from '../../../../images/loadingSpinner.png'
import FoundElementsContainer from './FoundElementsContainer';
import StatusMsg from './StatusMsg';

const InputSearchContainer = (props) => {
    const {notification} = useSelector(state => state.uiNotification)


    const displayLoadingSpinner = notification?.status === 'loading' && props.value && <img className={classes.loadingSpinner} src={loadingSpinnerImg}></img>;
    const displayClearInputBtn = (notification?.status === 'success' || notification?.status === 'failed') && props.value && <button className={classes.clearInputBtn} onClick={props.onClearInputHandler}>x</button>;


    return(
        <Fragment>
            <div className={classes.inputSearchContainer}>
                    <img className={classes.searchImg} src={searchImg}></img>
                    <input autoFocus value={props.value} onBlur={props.onBlur} onChange={props.onChange} 
                    className={classes.searchInput} type="text" placeholder="Search by symbol or name" ></input>
                    {displayClearInputBtn}
                    {displayLoadingSpinner}
                </div>
                {notification?.status === 'success' && props.value && <FoundElementsContainer/>}
                {notification?.status === 'failed' && <StatusMsg>lost internet connection</StatusMsg>}
        </Fragment>
    )
};

export default InputSearchContainer;