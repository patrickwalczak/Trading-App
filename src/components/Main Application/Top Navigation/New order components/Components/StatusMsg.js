import classes from "../NewOrder.module.css";

const StatusMsg = (props) => {
  return (
    <div className={classes.foundNoElConta}>
      <p className={classes.foundNoElMsg}>{props.children}</p>
    </div>
  );
};

export default StatusMsg;
