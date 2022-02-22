import React, {
  Fragment,
  useEffect,
  useState,
  useImperativeHandle,
  useRef,
} from "react";
import { useSelector } from "react-redux";
import classes from "./TransactionDetail.module.css";
import TransactionTypeBtn from "./TransactionTypeBtn";

const TransactionDetail = React.forwardRef((props, ref) => {
  const [buyBtnIsActive, setBuyBtnState] = useState(false);
  const [sellBtnIsActive, setSellBtnState] = useState(false);
  const [transactionType, setTransactionType] = useState(null);
  const [sellNotAvailable, setSellAvailable] = useState(null);
  const [amountInputIsValid, setAmountInputValidity] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const amountInputRef = useRef();

  useImperativeHandle(ref, () => ({
    resetTransactionDetail: resetDetailHandler,
  }));

  const { chosenSecurity } = useSelector((state) => state.searchResults);
  const { transactions } = useSelector((state) => state.accountData);
  const { availableFunds } = useSelector((state) => state.accountData);
  const { sendTransactionStatus } = useSelector((state) => state.taskStatus);

  // If security will be chosen (for example cryptocurrency such as bitcoin), then we remove disabled property from buttons and input
  const isChosen = chosenSecurity !== null ? true : false;

  // Variable which will help to apply styling for amount input only if security is chosen and transaction button is active
  const enableAmountInput =
    isChosen &&
    sendTransactionStatus?.status !== "loading" &&
    (buyBtnIsActive || sellBtnIsActive);

  const enabledInputClass = enableAmountInput ? "" : "notChosen";

  const addErrBorder =
    !amountInputIsValid && errorMsg !== "" ? "errBorder" : "";

  // Some cryptocurrencies have price equals to zero after rounding them to two digits, so in this case I increase max fraction digits.

  const chosenSecurityPrice = chosenSecurity?.convertedPrice;

  const resetDetailHandler = () => {
    setBuyBtnState(false);
    setSellBtnState(false);
    amountInputRef.current.value = "";
    setErrorMsg("");
    setAmountInputValidity(true);
    setTransactionType("");
  };

  const transactionTypeBtnHandler = (e) => {
    e.preventDefault();
    const transactionType = e.target.dataset.transactionType;

    if (buyBtnIsActive || sellBtnIsActive) {
      props.onGetTransactionData(null);
      return resetDetailHandler();
    }

    if (transactionType === "BUY") {
      setSellBtnState(false);
      setBuyBtnState(!buyBtnIsActive);
      setTransactionType(transactionType);
    }

    if (transactionType === "SELL") {
      setBuyBtnState(false);

      const foundTransactionIndex = Number(
        transactions.findIndex((item) => item.securityID === chosenSecurity.id)
      );

      if (foundTransactionIndex === -1) {
        return setSellAvailable(false);
      }

      setTransactionType(transactionType);
      setSellBtnState(!sellBtnIsActive);
    }
  };

  const amountHandler = (e) => {
    setAmountInputValidity(true);
    setErrorMsg("");
    const enteredAmount = e.target.value;

    const wrongInputActions = (errMsg, transactionData = null) => {
      setAmountInputValidity(false);
      setErrorMsg(errMsg);
      props.onGetTransactionData(transactionData);
    };

    if (!enteredAmount) {
      return props.onGetTransactionData(null);
    }

    if (+enteredAmount < 0) {
      return wrongInputActions("Amount cannot be a negative number");
    }

    if (+enteredAmount === 0) {
      return wrongInputActions("Amount cannot be a zero");
    }

    if (
      enteredAmount.length >= 2 &&
      enteredAmount[0] === "0" &&
      !enteredAmount.includes(".")
    ) {
      return wrongInputActions("Integer cannot start with zero");
    }

    setAmountInputValidity(true);

    const chosenSecurityConvertedPrice = Number(
      chosenSecurity.current_price.toFixed(chosenSecurity.maxFractionDigits)
    );

    const transactionValue = Number(
      (chosenSecurityConvertedPrice * enteredAmount).toFixed(2)
    );

    const minCommission = 0.25;
    const calcCommission = Number(
      (chosenSecurityConvertedPrice * enteredAmount * 0.01).toFixed(2)
    );

    const finalCommission =
      calcCommission < minCommission ? minCommission : calcCommission;

    const total = availableFunds - transactionValue - finalCommission < 0;

    const availableFundsAfterTransaction = Number(
      (availableFunds - transactionValue - finalCommission).toFixed(2)
    );

    if (total) {
      return wrongInputActions("Insufficient funds");
    }

    const minTransactionValue = 1;

    const transaction = {
      purchasedAmount: enteredAmount,
      type: transactionType,
      orderValue: transactionValue,
      commission: finalCommission,
      availableFundsAfter: availableFundsAfterTransaction,
      purchasedSecurityName: chosenSecurity.name,
      purchasedSecurityID: chosenSecurity.id,
      purchasedSecurityPrice: chosenSecurityConvertedPrice,
      purchasedSecurity: { ...chosenSecurity },
      fractionDigits: chosenSecurity.maxFractionDigits,
    };

    if (transactionValue < minTransactionValue) {
      props.onChangeFormValidity(false);
      return wrongInputActions(
        "Order value cannot be less than $1",
        transaction
      );
    }

    props.onChangeFormValidity(true);

    props.onGetTransactionData(transaction);
  };

  useEffect(() => {
    setTimeout(() => {
      if (sellNotAvailable === false) {
        setSellAvailable(null);
      }
    }, 1000);
  }, [sellNotAvailable]);

  return (
    <Fragment>
      <div className={`${classes.chooseTransactionTypeContainer}`}>
        <TransactionTypeBtn
          onClick={transactionTypeBtnHandler}
          btnType={"BUY"}
          btnClassName={"buyBtnClass"}
          btnState={buyBtnIsActive}
        >
          BUY
        </TransactionTypeBtn>
        <div className={classes.sellBtnContainer}>
          <TransactionTypeBtn
            onClick={transactionTypeBtnHandler}
            btnType={"SELL"}
            btnClassName={"sellBtnClass"}
            btnState={sellBtnIsActive}
          >
            SELL
          </TransactionTypeBtn>
          {sellNotAvailable === false && (
            <p className={classes.sellNotAvailable}>Sell not available!</p>
          )}
        </div>
      </div>
      <div className={classes.transactionDetailContainer}>
        <div
          className={`${classes.transactionInputLabelContainer} ${classes.priceContainer}`}
        >
          <label className={classes.transactionLabel} htmlFor="currentPrice">
            Price
          </label>
          <input
            disabled={true}
            className={`${classes.transactionInput}`}
            type="text"
            id="currentPrice"
            defaultValue={chosenSecurityPrice}
          ></input>
        </div>
        <div
          className={`${classes.transactionInputLabelContainer} ${classes.amountContainer}`}
        >
          <label className={classes.transactionLabel} htmlFor="amount">
            Amount
          </label>
          <input
            disabled={!enableAmountInput}
            className={`${classes.transactionInput} ${classes[enabledInputClass]} ${classes[addErrBorder]}`}
            onChange={amountHandler}
            type="number"
            id="amount"
            ref={amountInputRef}
          ></input>
        </div>
      </div>
      {!amountInputIsValid && chosenSecurity && (
        <p className={classes.invalidInputAmount}>{errorMsg}</p>
      )}
    </Fragment>
  );
});

export default TransactionDetail;
