import classes from "./ChosenSecurity.module.css";
import searchImg from "../../../../images/search.png";

const ChosenSecurity = (props) => {
  const onReturnHandler = (e) => {
    e.preventDefault();
    props.onReset();
  };

  return (
    <div className={classes.chosenSecurityContainer}>
      <div className={classes.securityNameAndBtn}>
        <h2 className={classes.chosenSecurityName}>{props.data.name}</h2>
        <button
          onClick={onReturnHandler}
          className={classes.backToSearchBarBtn}
        >
          <img src={searchImg}></img>
        </button>
      </div>
      <div className={classes.symbolPriceChangeContainer}>
        <h3 className={classes.chosenSymbol}>{props.data.symbol}</h3>
        <span className={classes.chosenPrice}>
          {props.data.current_price.toLocaleString("en-US", {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "USD",
          })}
        </span>
        <span className={`${classes.chosenPriceChange} ${classes.droping}`}>
          {props.data.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default ChosenSecurity;
