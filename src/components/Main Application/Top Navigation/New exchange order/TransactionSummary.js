import { useSelector } from "react-redux";
import classes from "./ExchangeOrderForm.module.css";

const TransactionSummary = (props) => {
  const { availableFunds } = useSelector((state) => state.accountData);
  const commissionValue =
    props.transactionData !== null
      ? `- ${props.transactionData.commission}`
      : "-";
  const orderValue =
    props.transactionData !== null
      ? `- ${props.transactionData.transactionValue}`
      : "-";
  const fundsAfterValue =
    props.transactionData !== null
      ? `${props.transactionData.availableFundsAfterTransaction}`
      : "-";

  return (
    <div className={classes.transactionSummaryContainer}>
      <div className={classes.transactionSummaryFragment}>
        <h6 className={classes.transactionSummaryHeader}> Available funds </h6>{" "}
        <span
          className={`${classes.transactionSummaryValue} ${classes.availableFunds}`}
        >
          {availableFunds.toLocaleString("en-US", {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
      <div className={classes.transactionSummaryFragment}>
        <h6 className={classes.transactionSummaryHeader}> Commission</h6>{" "}
        <span className={classes.transactionSummaryValue}>
          {commissionValue.toLocaleString("en-US", {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
      <div className={classes.transactionSummaryFragment}>
        <h6 className={classes.transactionSummaryHeader}> Order value</h6>{" "}
        <span className={classes.transactionSummaryValue}>
          {orderValue.toLocaleString("en-US", {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
      <div className={classes.transactionSummaryFragment}>
        <h6 className={classes.transactionSummaryHeader}>
          {" "}
          Available funds after order
        </h6>{" "}
        <span className={classes.transactionSummaryValue}>
          {fundsAfterValue.toLocaleString("en-US", {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
    </div>
  );
};

export default TransactionSummary;
