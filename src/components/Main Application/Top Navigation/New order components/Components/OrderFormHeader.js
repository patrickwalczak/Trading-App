import classes from "../NewOrder.module.css";

const OrderFormHeader = (props) => {
  return (
    <div className={classes.formHeaderContainer}>
      <h3 className={classes.exchangeFormHeader}>Order new exchange</h3>
      <button className={classes.formCloseBtn} onClick={props.onReset}>
        X
      </button>
    </div>
  );
};

export default OrderFormHeader;
