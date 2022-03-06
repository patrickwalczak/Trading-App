import Modal from "../../../UI/Modal/Modal";
import classes from "./NewOrder.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptocurrencies } from "../../../../store/takeCryptocurrencies";
import { searchResultsActions } from "../../../../store/searchResults-slice";
import InputSearchContainer from "./Components/InputSearchContainer";
import ChosenSecurity from "./Components/ChosenSecurity";
import OrderFormHeader from "./Components/OrderFormHeader";
import TransactionDetail from "./Components/TransactionDetail";
import TransactionSummary from "./Components/TransactionSummary";
import { addTransaction } from "../../../../store/accountData-actions";
import loadingSpinnerImg from "../../../../images/loadingSpinner.png";
import SuccessModal from "./Components/SuccessModal";
import { taskStatusActions } from "../../../../store/taskStatus-slice";

const NewOrder = (props) => {
  let submitButtonContent;
  const dispatch = useDispatch();

  const [searchInputValue, setSearchInputValue] = useState("");
  const [buyBtnIsActive, setBuyBtnActivity] = useState(false);
  const [sellBtnIsActive, setSellBtnActivity] = useState(false);
  const [amountInputValue, setAmountInputValue] = useState("");
  const [transactionData, setTransactionData] = useState(null);
  const [isFormValid, setFormValidity] = useState(false);

  const { chosenSecurity } = useSelector((state) => state.searchResults);
  const { transactionCounter } = useSelector((state) => state.applicationData);
  const { sendTransactionStatus } = useSelector((state) => state.taskStatus);
  const { purchasedCryptocurrencies } = useSelector(
    (state) => state.accountData
  );

  const submitBtnShouldBeDisabled =
    isFormValid === false ||
    transactionData === null ||
    sendTransactionStatus?.status === "loading";

  const formShouldBeDisplayed =
    sendTransactionStatus === null ||
    sendTransactionStatus?.status === "loading";

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
      dispatch(
        addTransaction(
          transactionData,
          transactionCounter,
          purchasedCryptocurrencies
        )
      );
    }, 3000);
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
                value={searchInputValue}
                onUpdateSearchInput={setSearchInputValue}
              />
            )}
            {chosenSecurity && (
              <ChosenSecurity
                sendingStatus={sendTransactionStatus}
                data={chosenSecurity}
                onReset={resetNewOrderForm}
                onUpdateSearchInput={setSearchInputValue}
                onUpdateAmountInput={setAmountInputValue}
                onChangeFormValidity={setFormValidity}
                onSetBuyBtnState={setBuyBtnActivity}
                onSetSellBtnState={setSellBtnActivity}
              />
            )}
            <TransactionDetail
              onGetTransactionData={setTransactionData}
              onChangeFormValidity={setFormValidity}
              amountInputValue={amountInputValue}
              onUpdateAmountInput={setAmountInputValue}
              onSetBuyBtnState={setBuyBtnActivity}
              buyBtnIsActive={buyBtnIsActive}
              onSetSellBtnState={setSellBtnActivity}
              sellBtnIsActive={sellBtnIsActive}
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
      {/* TODO  FailModal */}
    </Modal>
  );
};

export default NewOrder;
