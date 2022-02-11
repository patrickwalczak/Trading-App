import classes from "./MainPanelLeftSide.module.css";

const MainPanelLeftSide = () => {
  return (
    <section className={classes.securitiesListContainer}>
    <h3 className={classes.securitiesHeader}>My Securities</h3>
    <ul className={classes.securitiesContainer}>
      <li className={`${classes.securityElement} ${classes.activeSecurity}`}>
        <span className={classes.activeSecurityIndicator}></span>
        <h3 className={classes.securityName}>BTC</h3>
        <div className={classes.securityValuesContainer}>
          <span className={classes.isGrowing}>+1.95%</span>
          <span>41.80</span>
        </div>
      </li>
      <li className={classes.securityElement}>
        <h3 className={classes.securityName}>XTY</h3>
        <div className={classes.securityValuesContainer}>
          <span className={classes.isLosing}>-5.95%</span>
          <span>1121.80</span>
        </div>
      </li>
      <li className={classes.securityElement}>
        <h3 className={classes.securityName}>ETH</h3>
        <div className={classes.securityValuesContainer}>
          <span className={classes.isGrowing}>+ 6.95%</span>
          <span>54.80</span>
        </div>
      </li>
    </ul>
    </section>
  );
};

export default MainPanelLeftSide;
