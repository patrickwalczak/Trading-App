import { Fragment, useEffect, useState } from "react";
import classes from "../MainPanelLeftSide.module.css";
const SecurityShortView = ({ dataset, onClick, activeBtnState }) => {
  const [securityData, setSecurityData] = useState();
  const [loadSecurity, setLoadStatus] = useState(null);

  const initSecurity = async () => {
    try {
      setLoadStatus("loading");
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${dataset}`
      );

      if (!response.ok) {
        throw new Error("Lost internet connecton!");
      }

      const data = await response.json();

      setSecurityData(data);
      setLoadStatus("success");
    } catch (err) {
      console.log(err);
      setLoadStatus("fail");
    }
  };

  useEffect(() => {
    initSecurity();
  }, []);

  const priceChange24h =
    securityData?.market_data.price_change_percentage_24h_in_currency[
      "usd"
    ].toFixed(2) || 0;

  const changeClass = priceChange24h > 0 ? "isGrowing" : "isDropping";

  const btnActiveClass =
    dataset === activeBtnState ? classes.activeSecurity : "";

  const price = securityData?.market_data.current_price["usd"];

  let maxFractionDigits = 2;

  if (price !== undefined && +price.toFixed(maxFractionDigits) === 0) {
    maxFractionDigits = 4;
  }

  if (price !== undefined && +price.toFixed(maxFractionDigits) === 0) {
    maxFractionDigits = 6;
  }
  const convertedPrice = Number(price).toLocaleString("en-US", {
    maximumFractionDigits: maxFractionDigits,
    style: "currency",
    currency: "USD",
  });

  const symbol = securityData?.symbol;

  return (
    <Fragment>
      {loadSecurity === "success" && (
        <li
          data-id={dataset}
          onClick={onClick}
          className={`${classes.securityElement} ${btnActiveClass}`}
        >
          <span className={classes.activeSecurityIndicator}></span>
          <h3 className={classes.securityName}>{symbol}</h3>
          <div className={classes.securityValuesContainer}>
            <span className={classes[changeClass]}>{priceChange24h}%</span>
            <span>{convertedPrice}</span>
          </div>
        </li>
      )}
    </Fragment>
  );
};
export default SecurityShortView;
