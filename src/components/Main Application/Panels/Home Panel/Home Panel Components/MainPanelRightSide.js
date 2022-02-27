import { useSelector } from "react-redux";
import classes from "./MainPanelRightSide.module.css";

const MainPanelRightSide = () => {
  const { activeCrypto } = useSelector((state) => state.applicationData);

  let priceHigh24 = activeCrypto?.market_data.high_24h["usd"];
  let priceLow24 = activeCrypto?.market_data.low_24h["usd"];
  const totalVolume =
    activeCrypto?.market_data.total_volume["usd"].toLocaleString("en-US") || 0;

  let maxFractionDigits = 2;

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

  priceHigh24 = Number(priceHigh24).toLocaleString("en-US", {
    maximumFractionDigits: maxFractionDigits,
    style: "currency",
    currency: "USD",
  });

  priceLow24 = Number(priceLow24).toLocaleString("en-US", {
    maximumFractionDigits: maxFractionDigits,
    style: "currency",
    currency: "USD",
  });

  return (
    <section className={classes.mainPanelRightSideContainer}>
      <div className={classes.sectionHeader}>
        <h3> STATISTICS </h3>
      </div>
      <ul className={classes.securitySideDataContainer}>
        <li className={classes.securityDataItem}>
          <h5>Opn price</h5> <span>-</span>
        </li>
        <li className={classes.securityDataItem}>
          <h5>Cl price</h5> <span>-</span>
        </li>
        <li className={classes.securityDataItem}>
          <h5>Max price</h5> <span>{priceHigh24}</span>
        </li>
        <li className={classes.securityDataItem}>
          <h5>Min price</h5> <span>{priceLow24}</span>
        </li>
        <li className={classes.securityDataItem}>
          <h5>Volume</h5> <span>{totalVolume}</span>
        </li>
      </ul>
      <div className={classes.transactionButtonsContainer}>
        <button className={classes.transactionBuy}>Buy</button>
        <button className={classes.transactionSell}>Sell</button>
      </div>
    </section>
  );
};

export default MainPanelRightSide;
