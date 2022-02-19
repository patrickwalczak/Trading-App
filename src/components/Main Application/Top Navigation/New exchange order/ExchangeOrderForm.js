import Modal from "../../../UI/Modal/Modal";
import classes from "./ExchangeOrderForm.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptocurrencies } from "../../../../store/takeCryptocurrencies";
import { searchResultsActions } from "../../../../store/searchResults-slice";
import InputSearchContainer from "./InputSearchContainer";
import ChosenSecurity from "./ChosenSecurity";
import OrderFormHeader from "./OrderFormHeader";
import TransactionDetail from "./TransactionDetail";
import TransactionSummary from "./TransactionSummary";

const ExchangeOrderForm = (props) => {
  const [isSearching, setIsSearching] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [transactionData, setTransactionData] = useState(null);
  const amountInputRef = useRef();
  const [isFormValid, setFormValidity] = useState(false);

  const submitButtonDisabledState =
    isFormValid === false || transactionData === null;

  const { chosenSecurity } = useSelector((state) => state.searchResults);
  const dispatch = useDispatch();

  const changeFormValidity = (formState) => {
    setFormValidity(formState);
  };

  const onChangeHandler = (e) => {
    setIsSearching(true);
    setSearchInputValue(e.target.value.trim());
  };

  const onBlurHandler = () => {
    setIsSearching(false);
  };

  const clearInputHandler = () => {
    setSearchInputValue("");
  };

  const resetNewOrderForm = (isModal = "") => {
    clearInputHandler();
    dispatch(searchResultsActions.clearSearchResults());
    dispatch(searchResultsActions.removeChosenSecurity());
    setTransactionData(null);
    setTransactionType("");
    amountInputRef.current.resetTransactionDetail();
    setFormValidity(false);

    if (isModal === "close_modal") {
      props.onChangeModalState();
    }
  };

  const getTransactionTypeHandler = (type) => {
    setTransactionType(type);
  };

  const getTransactionData = (data) => {
    if (transactionType === "BUY") {
      setTransactionData(data);
    }
  };

  const sendingTransactionDataHandler = (e) => {
    e.preventDefault();

    // TODO Create a function for making id
    const transaction = {
      purchasedAmount: transactionData.amount,
      type: transactionType,
      orderValue: transactionData.transactionValue,
      commission: transactionData.finalCommission,
      availableFundsAfter: transactionData.availableFundsAfterTransaction,
      purchasedSecurityName: chosenSecurity.name,
      purchasedSecurityID: chosenSecurity.id,
      purchasedSecurityPrice: chosenSecurity.current_price,
      purchasedSecurity: { ...chosenSecurity },
    };

    // TODO Call loading spinner
    // Change button content from 'Place order' to loading spinner

    // TODO Send transaction to reducer and server

    // TODO display error or success msg
    // Change button content from 'Place order' to "tick'

    // TODO close form and reset
    resetNewOrderForm("close_modal");
  };

  useEffect(() => {
    if (!isSearching && searchInputValue.length === 0) return;
    dispatch(fetchCryptocurrencies(searchInputValue));
    setTimeout(setIsSearching(false), 500);
  }, [isSearching, searchInputValue]);

  return (
    <Modal onCloseFormActions={resetNewOrderForm.bind(null, "close_modal")}>
      <div className={classes.exchangeFormContainer}>
        <OrderFormHeader
          onReset={resetNewOrderForm.bind(null, "close_modal")}
        />
        <form className={classes.exchangeForm}>
          {!chosenSecurity && (
            <InputSearchContainer
              onBlur={onBlurHandler}
              onChange={onChangeHandler}
              value={searchInputValue}
              onClearInputHandler={clearInputHandler}
            />
          )}
          {chosenSecurity && (
            <ChosenSecurity data={chosenSecurity} onReset={resetNewOrderForm} />
          )}
          <TransactionDetail
            ref={amountInputRef}
            onGetTransactionType={getTransactionTypeHandler}
            onGetTransactionData={getTransactionData}
            onChangeFormValidity={changeFormValidity}
          />
          <TransactionSummary transactionData={transactionData} />
          <button
            onClick={sendingTransactionDataHandler}
            disabled={submitButtonDisabledState}
            className={`${classes.placeOrderBtn} ${
              submitButtonDisabledState ? classes["disabled"] : ""
            }`}
            type="submit"
          >
            Place Order
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ExchangeOrderForm;
