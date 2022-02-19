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

  const { chosenSecurity } = useSelector((state) => state.searchResults);
  const dispatch = useDispatch();

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

  const resetSearchResults = (isModal = false) => {
    clearInputHandler();
    dispatch(searchResultsActions.clearSearchResults());
    dispatch(searchResultsActions.removeChosenSecurity());
    setTransactionData(null);
    setTransactionType("");
    amountInputRef.current.resetTransactionDetail();

    if (isModal === "yes") {
      props.onChangeModalState();
    }
  };

  useEffect(() => {
    if (!isSearching && searchInputValue.length === 0) return;
    dispatch(fetchCryptocurrencies(searchInputValue));
    setTimeout(setIsSearching(false), 500);
  }, [isSearching, searchInputValue]);

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
      type: transactionType,
      orderValue: transactionData.transactionValue,
      commission: transactionData.commission,
      availableFundsAfter: transactionData.availableFundsAfterTransaction,
      securityName: chosenSecurity.name,
      securityID: chosenSecurity.id,
      securityPrice: chosenSecurity.current_price,
    };
  };

  return (
    <Modal onCloseFormActions={resetSearchResults.bind(null, "yes")}>
      <div className={classes.exchangeFormContainer}>
        <OrderFormHeader onReset={resetSearchResults.bind(null, "yes")} />
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
            <ChosenSecurity
              data={chosenSecurity}
              onReset={resetSearchResults}
            />
          )}
          <TransactionDetail
            ref={amountInputRef}
            onGetTransactionType={getTransactionTypeHandler}
            onGetTransactionData={getTransactionData}
          />
          <TransactionSummary transactionData={transactionData} />
          <button
            onClick={sendingTransactionDataHandler}
            disabled={transactionData === null}
            className={`${classes.placeOrderBtn} ${
              transactionData === null ? classes["disabled"] : ""
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
