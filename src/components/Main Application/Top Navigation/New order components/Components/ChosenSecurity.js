import classes from "./ChosenSecurity.module.css";
import searchImg from "../../../../../images/search.png";

const ChosenSecurity = (props) => {
  const { data, sendingStatus } = props;

  const returnHandler = (e) => {
    e.preventDefault();
    props.onReset();
    props.onUpdateSearchInput("");
    props.onUpdateAmountInput("");
    props.onChangeFormValidity(false);
    props.onSetSellBtnState(false);
    props.onSetBuyBtnState(false);
  };

  const chosenCurrencyPrice = data.convertedPrice;

  return (
    <div className={classes.chosenSecurityContainer}>
      <div className={classes.securityNameAndBtn}>
        <h2 className={classes.chosenSecurityName}>{data.name}</h2>
        {sendingStatus?.status !== "loading" && (
          <button
            onClick={returnHandler}
            className={classes.backToSearchBarBtn}
          >
            <img src={searchImg}></img>
          </button>
        )}
      </div>
      <div className={classes.symbolPriceChangeContainer}>
        <h3 className={classes.chosenSymbol}>{data.symbol}</h3>
        <span className={classes.chosenPrice}>{chosenCurrencyPrice}</span>
        <span className={`${classes.chosenPriceChange} ${classes.droping}`}>
          {data.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default ChosenSecurity;
