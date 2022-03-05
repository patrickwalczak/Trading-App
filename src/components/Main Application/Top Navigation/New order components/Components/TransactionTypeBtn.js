import { useSelector } from "react-redux";
import classes from "./TransactionDetail.module.css";
const TransactionTypeBtn = (props) => {
  const { chosenSecurity } = useSelector((state) => state.searchResults);
  const { sendTransactionStatus } = useSelector((state) => state.taskStatus);

  // If security will be chosen (for example cryptocurrency such as a bitcoin), then we remove disabled property from buttons and input
  const isChoosing =
    chosenSecurity === null || sendTransactionStatus?.status === "loading"
      ? true
      : false;

  // This assures that if security is not chosen but button will be hovered then no styling will be applied for buttons
  const isChosenClass =
    chosenSecurity === null || sendTransactionStatus?.status === "loading"
      ? "notChosen"
      : "chosen";

  // These two classes apply styling for transaction type button when its clicked
  const activeButtonClass = props.btnState ? "active" : "";

  // The same styling for both buy and sell transactons
  const transactionBtnClasses = `${classes.transactionTypeBtnGeneral} ${classes[isChosenClass]}`;

  const btnClasses = `${classes[props.btnClassName]} ${transactionBtnClasses} ${
    classes[activeButtonClass]
  }`;

  return (
    <button
      onClick={props.onClick}
      data-transaction-type={props.btnType}
      disabled={isChoosing}
      className={btnClasses}
    >
      {props.children}
    </button>
  );
};
export default TransactionTypeBtn;
