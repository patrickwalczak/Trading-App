import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./TransactionDetail.module.css";
import TransactionTypeBtn from "./TransactionTypeBtn";

const TransactionDetail = (props) => {
  let initTransactionType = null;
  if (props.buyBtnIsActive) initTransactionType = "BUY";
  if (props.sellBtnIsActive) initTransactionType = "SELL";

  const [errorMsg, setErrorMsg] = useState("");
  const [transactionType, setTransactionType] = useState(initTransactionType);
  const [sellNotAvailable, setSellAvailable] = useState(null);
  const [amountInputIsValid, setAmountInputValidity] = useState(true);

  const { chosenSecurity } = useSelector((state) => state.searchResults);
  const { purchasedCryptocurrencies } = useSelector(
    (state) => state.accountData
  );
  const { availableFunds } = useSelector((state) => state.accountData);
  const { sendTransactionStatus } = useSelector((state) => state.taskStatus);

  // TODO in the future there will more panels with cryptocurrencies charts and not every crypto will have sell btn enabled

  // If security will be chosen (for example cryptocurrency such as bitcoin), then we remove disabled property from buttons
  const isChosen = chosenSecurity !== null ? true : false;

  // Variable which will help to apply styling for amount input only if security is chosen and transaction button is active
  const enableAmountInput =
    isChosen &&
    sendTransactionStatus?.status !== "loading" &&
    (props.buyBtnIsActive || props.sellBtnIsActive);

  const enabledInputClass = enableAmountInput ? "" : "notChosen";

  const addErrBorder =
    !amountInputIsValid && errorMsg !== "" && props.amountInputValue
      ? "errBorder"
      : "";

  const chosenSecurityPrice = chosenSecurity?.convertedPrice;

  const resetDetailHandler = () => {
    setErrorMsg("");
    setAmountInputValidity(true);
    setTransactionType("");
    props.onUpdateAmountInput("");
  };

  const transactionTypeBtnHandler = (e) => {
    e.preventDefault();
    const transactionType = e.target.dataset.transactionType;
    resetDetailHandler();

    if (transactionType === "BUY" && props.sellBtnIsActive) {
      props.onSetSellBtnState(false);
      resetDetailHandler();
    }

    if (transactionType === "SELL" && props.buyBtnIsActive) {
      props.onSetBuyBtnState(false);
      resetDetailHandler();
    }

    if (transactionType === "BUY") {
      props.onSetSellBtnState(false);
      props.onSetBuyBtnState(!props.buyBtnIsActive);
      setTransactionType(transactionType);
    }

    if (transactionType === "SELL") {
      props.onSetBuyBtnState(false);

      console.log("test");

      // if returns -1, then sell is not available
      const isSellAvailable = Number(
        purchasedCryptocurrencies.findIndex(
          (item) => item.id === chosenSecurity.id
        )
      );

      if (isSellAvailable === -1) {
        console.log("test");
        return setSellAvailable(false);
      }

      setTransactionType(transactionType);
      props.onSetSellBtnState(!props.sellBtnIsActive);
    }
  };

  const amountHandler = (e) => {
    setAmountInputValidity(true);
    setErrorMsg("");
    const enteredAmount = e.target.value.trim();
    props.onUpdateAmountInput(enteredAmount);

    let purchasedAmount = +enteredAmount;
    let availableFundsAfterTransaction;

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
      props.availableCryptoToSell.amount &&
      enteredAmount > +props.availableCryptoToSell.amount
    ) {
      return wrongInputActions("Too much");
    }

    if (
      enteredAmount.length >= 2 &&
      enteredAmount[0] === "0" &&
      !enteredAmount.includes(".")
    ) {
      return wrongInputActions("Integer cannot start with zero");
    }

    setAmountInputValidity(true);

    const chosenSecurityConvertedPrice = +chosenSecurity.current_price.toFixed(
      chosenSecurity.maxFractionDigits
    );

    const transactionValue = +(
      chosenSecurityConvertedPrice * enteredAmount
    ).toFixed(2);

    const minCommission = 0.25;

    const calcCommission = +(
      chosenSecurityConvertedPrice *
      enteredAmount *
      0.01
    ).toFixed(2);

    const finalCommission =
      calcCommission < minCommission ? minCommission : calcCommission;

    const total = availableFunds - transactionValue - finalCommission < 0;

    if (total && transactionType === "BUY") {
      return wrongInputActions("Insufficient funds");
    }

    if (transactionType === "BUY") {
      availableFundsAfterTransaction = Number(
        (availableFunds - transactionValue - finalCommission).toFixed(2)
      );
    } else {
      purchasedAmount = -enteredAmount;
      availableFundsAfterTransaction = Number(
        (availableFunds + transactionValue - finalCommission).toFixed(2)
      );
    }

    const minTransactionValue = 1;

    const transaction = {
      availableFundsBefore: availableFunds,
      purchasedAmount,
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
          btnState={props.buyBtnIsActive}
        >
          BUY
        </TransactionTypeBtn>
        <div className={classes.sellBtnContainer}>
          <TransactionTypeBtn
            onClick={transactionTypeBtnHandler}
            btnType={"SELL"}
            btnClassName={"sellBtnClass"}
            btnState={props.sellBtnIsActive}
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
            value={props.amountInputValue}
          ></input>
        </div>
      </div>
      {!amountInputIsValid && chosenSecurity && props.amountInputValue && (
        <p className={classes.invalidInputAmount}>{errorMsg}</p>
      )}
    </Fragment>
  );
};

export default TransactionDetail;
