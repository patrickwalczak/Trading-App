import classes from "./MainPanelTop.module.css";

const MainPanelTop = () => {
  return (
    <section className={classes.mainPanelTopContainer}>
      <h2 className={classes.mainPanelTopHeader}>BTC</h2>
      <form className={classes.chooseDateRangeForm}>
        <label className={classes.dataRangeLabel} htmlFor="dataRange">
          Choose a data range
        </label>
        <select id="dataRange" className={classes.dateRangeSelect}>
          <option value="1">1 Day</option>
          <option value="7">7 Days</option>
          <option selected value="30">
            30 Days
          </option>
          <option value="90">3 Months</option>
          <option value="180">6 Months</option>
          <option value="365">1 Year</option>
        </select>
      </form>
    </section>
  );
};

export default MainPanelTop;
