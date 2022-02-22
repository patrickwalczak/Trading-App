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
import { addTransaction } from "../../../../store/accountData-actions";
import loadingSpinnerImg from "../../../../images/loadingSpinner.png";
import SuccessModal from "./SuccessModal";
import { taskStatusActions } from "../../../../store/taskStatus-slice";

const ExchangeOrderForm = (props) => {
  const dispatch = useDispatch();

  const [isSearching, setIsSearching] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [transactionData, setTransactionData] = useState(null);
  const [isFormValid, setFormValidity] = useState(false);

  const { chosenSecurity } = useSelector((state) => state.searchResults);
  const { transactionCounter } = useSelector((state) => state.applicationData);
  const { sendTransactionStatus } = useSelector((state) => state.taskStatus);

  const transactionDetailRef = useRef();

  let submitButtonContent;

  const submitButtonDisabledState =
    isFormValid === false ||
    transactionData === null ||
    sendTransactionStatus?.status === "loading";

  const displayExchangeFormCondition =
    sendTransactionStatus === null ||
    sendTransactionStatus?.status === "loading";

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

  const resetNewOrderForm = (modal = "", transactionIsFinished = false) => {
    clearInputHandler();
    dispatch(searchResultsActions.clearSearchResults());
    dispatch(searchResultsActions.removeChosenSecurity());
    setTransactionData(null);
    setFormValidity(false);

    // amountInputRef.current.resetTransactionDetail();

    if (modal === "close_modal") {
      props.onChangeModalState();
    }

    if (transactionIsFinished === true) {
      dispatch(taskStatusActions.changeSendingTransactionStatus(null));
    }
  };

  const getTransactionData = (data) => {
    setTransactionData(data);
  };

  const sendingTransactionDataHandler = async (e) => {
    e.preventDefault();

    dispatch(
      taskStatusActions.changeSendingTransactionStatus({ status: "loading" })
    );
  };

  if (sendTransactionStatus === null) {
    submitButtonContent = "Place order";
  }

  if (sendTransactionStatus?.status === "loading") {
    submitButtonContent = (
      <img className={classes.loadingSpinner} src={loadingSpinnerImg}></img>
    );
  }

  useEffect(() => {
    if (!isSearching && searchInputValue.length === 0) return;
    dispatch(fetchCryptocurrencies(searchInputValue));
    const timer = setTimeout(setIsSearching(false), 500);

    return () => {
      clearTimeout(timer);
    };
  }, [isSearching, searchInputValue]);

  useEffect(() => {
    if (sendTransactionStatus?.status !== "loading") return;
    setTimeout(() => {
      dispatch(addTransaction(transactionData, transactionCounter));
    }, 5000);
  }, [sendTransactionStatus]);

  return (
    <Modal onCloseFormActions={resetNewOrderForm.bind(null, "close_modal")}>
      {displayExchangeFormCondition && (
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
              <ChosenSecurity
                data={chosenSecurity}
                onReset={resetNewOrderForm}
              />
            )}
            <TransactionDetail
              ref={transactionDetailRef}
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
              {submitButtonContent}
            </button>
          </form>
        </div>
      )}
      {!displayExchangeFormCondition && (
        <SuccessModal
          onResetForm={resetNewOrderForm.bind(null, "close_modal", true)}
        />
      )}
    </Modal>
  );
};

export default ExchangeOrderForm;
