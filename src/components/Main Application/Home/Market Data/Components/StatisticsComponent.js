import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applicationActions } from "../../../../../store/application-slice";
import { fetchSingleFromList } from "../../../../../store/takeCryptocurrencies";
import classes from "./StatisticsComponent.module.css";

const StatisticsComponent = () => {
  const dispatch = useDispatch();
  const { transactionType } = useSelector((state) => state.applicationData);
  const { activeCrypto } = useSelector((state) => state.applicationData);

  const disabledBtns = !activeCrypto ? true : false;
  const disabledClass = activeCrypto ? "" : "disabled";

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
          <h5>Max price</h5>
          <span>{activeCrypto ? activeCrypto.priceHigh24 : "-"}</span>
        </li>
        <li className={classes.securityDataItem}>
          <h5>Min price</h5>
          <span>{activeCrypto ? activeCrypto.priceLow24 : "-"}</span>
        </li>
        <li className={classes.securityDataItem}>
          <h5>Volume</h5>
          <span>{activeCrypto ? activeCrypto.totalVolume : "-"}</span>
        </li>
      </ul>
      <button
        disabled={disabledBtns}
        data-transaction-type="BUY"
        className={`${classes.transactionBuy} ${classes[disabledClass]}`}
        onClick={clickedBtnHandler}
      >
        Buy
      </button>
      <button
        disabled={disabledBtns}
        data-transaction-type="SELL"
        className={`${classes.transactionSell} ${classes[disabledClass]}`}
        onClick={clickedBtnHandler}
      >
        Sell
      </button>
    </section>
  );
};

export default StatisticsComponent;
