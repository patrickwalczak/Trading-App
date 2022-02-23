import classes from "../MainPanelLeftSide.module.css";
const SecurityShortView = ({ data, dataset, onClick, activeBtnState }) => {
  const priceChange = data.purchasedSecurity.price_change_percentage_24h;

  const changeClass = priceChange > 0 ? "isGrowing" : "isDropping";

  const btnActiveClass =
    dataset === activeBtnState ? classes.activeSecurity : "";

  return (
    <li
      data-id={dataset}
      onClick={onClick}
      className={`${classes.securityElement} ${btnActiveClass}`}
    >
      <span className={classes.activeSecurityIndicator}></span>
      <h3 className={classes.securityName}>{data.purchasedSecurity.symbol}</h3>
      <div className={classes.securityValuesContainer}>
        <span className={classes[changeClass]}>{priceChange.toFixed(2)}%</span>
        <span>{data.purchasedSecurity.convertedPrice}</span>
      </div>
    </li>
  );
};
export default SecurityShortView;
