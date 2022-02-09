import classes from "./MainPanelRightSide.module.css";

const MainPanelRightSide = () => {
  return (
    <section className={classes.mainPanelRightSideContainer}>
      <div className={classes.sectionHeader}>
        <h3> STATISTICS </h3>
        <img></img>
      </div>
      <ul className={classes.securitySideDataContainer}>
        <li className={classes.securityDataItem}>
          <h5>Opn price</h5> <span>$35.21</span>
        </li>
        <li className={classes.securityDataItem}>
          <h5>Cl price</h5> <span>$35.22</span>
        </li>
        <li className={classes.securityDataItem}>
          <h5>Max price</h5> <span>$35.21</span>
        </li>
        <li className={classes.securityDataItem}>
          <h5>Min price</h5> <span>$45.45</span>
        </li>
        <li className={classes.securityDataItem}>
          <h5>Volume</h5> <span>$35.12</span>
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
