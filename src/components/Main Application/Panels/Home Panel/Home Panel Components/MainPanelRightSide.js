import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applicationActions } from "../../../../../store/application-slice";
import { fetchSingleFromList } from "../../../../../store/takeCryptocurrencies";
import classes from "./MainPanelRightSide.module.css";

const MainPanelRightSide = () => {
  const dispatch = useDispatch();
  const { activeCrypto } = useSelector((state) => state.applicationData);
  const { transactionType } = useSelector((state) => state.applicationData);

  let priceHigh24 = activeCrypto?.market_data.high_24h["usd"];
  let priceLow24 = activeCrypto?.market_data.low_24h["usd"];
  const totalVolume =
    activeCrypto?.market_data.total_volume["usd"].toLocaleString("en-US") || 0;

  let maxFractionDigits = 2;

  const localStringOptions = {
    maximumFractionDigits: maxFractionDigits,
    style: "currency",
    currency: "USD",
  };

  if (
    priceHigh24 !== undefined &&
    +priceHigh24.toFixed(maxFractionDigits) === 0
  ) {
    maxFractionDigits = 4;
  }

  if (
    priceHigh24 !== undefined &&
    +priceHigh24.toFixed(maxFractionDigits) === 0
  ) {
    maxFractionDigits = 6;
  }

  priceHigh24 = Number(priceHigh24).toLocaleString("en-US", localStringOptions);

  priceLow24 = Number(priceLow24).toLocaleString("en-US", localStringOptions);

  const clickedBtnHandler = (e) => {
    const clickedBtn = e.target.dataset.transactionType;
    dispatch(applicationActions.changeModalState());
    dispatch(applicationActions.changeTransactionType(clickedBtn));
  };

  useEffect(() => {
    if (transactionType === "") return;
    dispatch(fetchSingleFromList(activeCrypto.id));
  }, [transactionType]);

  return (
    <section className={classes.mainPanelRightSideContainer}>
      <h3 className={classes.mainPanelRight__header}> STATISTICS </h3>
      <ul className={classes.securitySideDataContainer}>
        <li className={classes.securityDataItem}>
          <h5>Opn price</h5> <span>-</span>
        </li>
        <li className={classes.securityDataItem}>
          <h5>Cl price</h5> <span>-</span>
        </li>
        <li className={classes.securityDataItem}>
          <h5>Max price</h5> <span>{activeCrypto ? priceHigh24 : "-"}</span>
        </li>
        <li className={classes.securityDataItem}>
          <h5>Min price</h5> <span>{activeCrypto ? priceLow24 : "-"}</span>
        </li>
        <li className={classes.securityDataItem}>
          <h5>Volume</h5> <span>{totalVolume}</span>
        </li>
      </ul>
      <button
        data-transaction-type="BUY"
        className={classes.transactionBuy}
        onClick={clickedBtnHandler}
      >
        Buy
      </button>
      <button
        data-transaction-type="SELL"
        className={classes.transactionSell}
        onClick={clickedBtnHandler}
      >
        Sell
      </button>
    </section>
  );
};

export default MainPanelRightSide;
