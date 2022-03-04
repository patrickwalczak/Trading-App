import Modal from "../../../UI/Modal/Modal";
import classes from "./ExchangeOrderForm.module.css";
import { useEffect, useState } from "react";
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
  let submitButtonContent;
  const dispatch = useDispatch();

  const [searchInputValue, setSearchInputValue] = useState("");
  const [amountInputValue, setAmountInputValue] = useState("");
  const [transactionData, setTransactionData] = useState(null);
  const [isFormValid, setFormValidity] = useState(false);

  const { chosenSecurity } = useSelector((state) => state.searchResults);
  const { transactionCounter } = useSelector((state) => state.applicationData);
  const { sendTransactionStatus } = useSelector((state) => state.taskStatus);

  const submitBtnShouldBeDisabled =
    isFormValid === false ||
    transactionData === null ||
    sendTransactionStatus?.status === "loading";

  const formShouldBeDisplayed =
    sendTransactionStatus === null ||
    sendTransactionStatus?.status === "loading";

  const changeFormValidity = (formState) => setFormValidity(formState);

  const searchInputHandler = (val = "") => setSearchInputValue(val);

  const amountInputHandler = () => setAmountInputValue("");

  const resetNewOrderForm = (modal = "", transactionIsFinished = false) => {
    dispatch(searchResultsActions.clearSearchResults());
    dispatch(searchResultsActions.removeChosenSecurity());

    if (modal === "close_modal") {
      props.onChangeModalState();
    }

    if (transactionIsFinished) {
      dispatch(taskStatusActions.changeSendingTransactionStatus(null));
    }
  };

  const getTransactionData = (data) => setTransactionData(data);

  const sendingTransactionDataHandler = (e) => {
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
    // Dispatch from this block will run only if search input is not empty
    if (!searchInputValue) return;
    dispatch(fetchCryptocurrencies(searchInputValue));
  }, [searchInputValue]);

  useEffect(() => {
    if (sendTransactionStatus?.status !== "loading") return;
    setTimeout(() => {
      dispatch(addTransaction(transactionData, transactionCounter));
    }, 5000);
  }, [sendTransactionStatus]);

  return (
    <Modal onCloseFormActions={resetNewOrderForm.bind(null, "close_modal")}>
      {formShouldBeDisplayed && (
        <div className={classes.exchangeFormContainer}>
          <OrderFormHeader
            onReset={resetNewOrderForm.bind(null, "close_modal")}
          />
          <form className={classes.exchangeForm}>
            {!chosenSecurity && (
              <InputSearchContainer
                onChange={searchInputHandler.bind(null)}
                value={searchInputValue}
              />
            )}
            {chosenSecurity && (
              <ChosenSecurity
                sendingStatus={sendTransactionStatus}
                data={chosenSecurity}
                onReset={resetNewOrderForm}
                onClearAmountInputValue={amountInputHandler}
              />
            )}
            <TransactionDetail
              onGetTransactionData={getTransactionData}
              onChangeFormValidity={changeFormValidity}
              amountInputValue={amountInputValue}
              onChangeAmountInputValue={amountInputHandler}
            />
            <TransactionSummary transactionData={transactionData} />
            <button
              onClick={sendingTransactionDataHandler}
              disabled={submitBtnShouldBeDisabled}
              className={`${classes.placeOrderBtn} ${
                submitBtnShouldBeDisabled ? classes["disabled"] : ""
              }`}
              type="submit"
            >
              {submitButtonContent}
            </button>
          </form>
        </div>
      )}
      {sendTransactionStatus?.status === "success" && (
        <SuccessModal
          onResetForm={resetNewOrderForm.bind(null, "close_modal", true)}
        />
      )}
    </Modal>
  );
};

export default ExchangeOrderForm;
