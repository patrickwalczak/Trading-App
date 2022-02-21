import React, {
  Fragment,
  useEffect,
  useState,
  useImperativeHandle,
  useRef,
} from "react";
import { useSelector } from "react-redux";
import classes from "./TransactionDetail.module.css";

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

  // If security will be chosen (for example cryptocurrency such as bitcoin), then we remove disabled property from buttons and input
  const isChoosing = chosenSecurity === null ? true : false;

  // This assures that if security is not chosen but button will be hovered then no styling will be applied for buttons
  const isChosenClass = chosenSecurity === null ? "notChosen" : "chosen";

  // These two classes apply styling for transaction type button when its clicked
  const activeBuyButtonClass = buyBtnIsActive ? "active" : "";
  const activeSellButtonClass = sellBtnIsActive ? "active" : "";

  // The same styling for both buy and sell transactons
  const transactionBtnClasses = `${classes.transactionTypeBtnGeneral} ${classes[isChosenClass]}`;

  const buyBtnClasses = `${classes.buyBtnClass} ${transactionBtnClasses} ${classes[activeBuyButtonClass]}`;
  const sellBtnClasses = `${classes.sellBtnClass} ${transactionBtnClasses} ${classes[activeSellButtonClass]}`;

  // Variable which will help to apply styling for amount input only if security is chosen and transaction button is active
  const enableAmountInput = !isChoosing && (buyBtnIsActive || sellBtnIsActive);
  const enabledInputClass = enableAmountInput ? "chosen" : "notChosen";

  const addErrBorder =
    !amountInputIsValid && errorMsg !== "" ? "errBorder" : "";

  // Some cryptocurrencies have price equals to zero after rounding them to two digits, so in this case I increase max fraction digits.

  const chosenCurrencyPrice = chosenSecurity?.current_price;

  let maxFractionDigits = 2;

  if (+chosenCurrencyPrice?.toFixed(2) === 0) maxFractionDigits = 4;

  const chosenSecurityPrice = chosenSecurity?.current_price
    ? `${chosenSecurity.current_price.toLocaleString("en-US", {
        maximumFractionDigits: maxFractionDigits,
        style: "currency",
        currency: "USD",
      })}`
    : "";

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
    const searchDots = /\./g;

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
      enteredAmount.search(searchDots) !== 1
    ) {
      return wrongInputActions("Integer cannot start with zero");
    }

    setAmountInputValidity(true);

    const transactionValue = Number(
      (chosenSecurity.current_price * enteredAmount).toFixed(2)
    );

    const COMMISSION = 0.25;
    const calcCommission = Number(
      (chosenSecurity.current_price * enteredAmount * 0.01).toFixed(2)
    );

    const finalCommission = calcCommission < 0.25 ? COMMISSION : calcCommission;

    const total = availableFunds - transactionValue - finalCommission < 0;

    const availableFundsAfterTransaction = Number(
      (availableFunds - transactionValue - finalCommission).toFixed(2)
    );

    if (total) {
      return wrongInputActions("Insufficient funds");
    }

    if (transactionValue <= 0.99) {
      props.onChangeFormValidity(false);
      return wrongInputActions("Order value cannot be less than $1", {
        amount: enteredAmount,
        transactionValue,
        finalCommission,
        availableFunds,
        availableFundsAfterTransaction,
        transactionType,
      });
    }

    props.onChangeFormValidity(true);

    props.onGetTransactionData({
      amount: enteredAmount,
      transactionValue,
      finalCommission,
      availableFunds,
      availableFundsAfterTransaction,
      transactionType,
    });
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
        <button
          onClick={transactionTypeBtnHandler}
          data-transaction-type="BUY"
          disabled={isChoosing}
          className={buyBtnClasses}
        >
          BUY
        </button>
        <div className={classes.sellBtnContainer}>
          <button
            onClick={transactionTypeBtnHandler}
            data-transaction-type="SELL"
            disabled={isChoosing}
            className={sellBtnClasses}
          >
            SELL
          </button>
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
