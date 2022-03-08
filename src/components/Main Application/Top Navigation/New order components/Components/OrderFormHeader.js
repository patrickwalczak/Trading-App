import classes from "../NewOrder.module.css";

const OrderFormHeader = (props) => {
  const availableCrypto = props.availableCryptoToSell
    ? ` (Available: ${props.availableCryptoToSell.amount})`
    : "";

  return (
    <div className={classes.formHeaderContainer}>
      <h3 className={classes.exchangeFormHeader}>
        Order new exchange {availableCrypto}
      </h3>
      <button className={classes.formCloseBtn} onClick={props.onReset}>
        X
      </button>
    </div>
  );
};

export default OrderFormHeader;
