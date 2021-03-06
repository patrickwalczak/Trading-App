import { useSelector } from "react-redux";
import classes from "../NewOrder.module.css";

const TransactionSummary = ({ transactionData }) => {
  const { availableFunds } = useSelector((state) => state.accountData);

  const localStringOptions = {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  };

  const convertToLocaleString = (value, whichCountry, localOptions = "") => {
    if (!transactionData) return "-";

    return value.toLocaleString(whichCountry, localOptions);
  };

  const commissionValue = convertToLocaleString(
    transactionData?.commission,
    "en-US",
    localStringOptions
  );

  const orderValue = convertToLocaleString(
    transactionData?.orderValue,
    "en-US",
    localStringOptions
  );

  const fundsAfterValue = convertToLocaleString(
    transactionData?.availableFundsAfter,
    "en-US",
    localStringOptions
  );
  const activeClass = transactionData ? "active" : "";

  return (
    <div className={classes.transactionSummaryContainer}>
      <div className={classes.transactionSummaryFragment}>
        <h6 className={classes.transactionSummaryHeader}> Available funds </h6>
        <span
          className={`${classes.transactionSummaryValue} ${classes.availableFunds}`}
        >
          {availableFunds.toLocaleString("en-US", localStringOptions)}
        </span>
      </div>
      <div className={classes.transactionSummaryFragment}>
        <h6 className={classes.transactionSummaryHeader}> Commission</h6>
        <span
          className={`${classes.transactionSummaryValue} ${classes[activeClass]}`}
        >
          {commissionValue}
        </span>
      </div>
      <div className={classes.transactionSummaryFragment}>
        <h6 className={classes.transactionSummaryHeader}> Order value</h6>
        <span
          className={`${classes.transactionSummaryValue} ${classes[activeClass]}`}
        >
          {orderValue}
        </span>
      </div>
      <div className={classes.transactionSummaryFragment}>
        <h6 className={classes.transactionSummaryHeader}>
          Available funds after order
        </h6>
        <span className={`${classes.total} ${classes[activeClass]}`}>
          {fundsAfterValue}
        </span>
      </div>
    </div>
  );
};

export default TransactionSummary;
