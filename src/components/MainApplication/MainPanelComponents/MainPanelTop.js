import classes from "./MainPanelTop.module.css";
import analyticsImg from '../../../images/analytics.png'

const MainPanelTop = () => {
  return (
    <section className={classes.mainPanelTopContainer}>
      <div className={classes.mainPanelHeaderContainer}>
        <img src={analyticsImg} className={classes.analyticsImg} />
        <h2 className={classes.mainPanelTopHeader}>BITCOIN</h2>
      </div>
      <div className={classes.formContainer}>
      <form className={classes.chooseDateRangeForm}>
        <label className={classes.dataRangeLabel} htmlFor="dataRange">
          Choose a data range
        </label>
        <select id="dataRange" className={classes.dateRangeSelect}>
          <option value="1">1 Day</option>
          <option value="7">7 Days</option>
          <option  value="30">
            30 Days
          </option>
          <option value="90">3 Months</option>
          <option value="180">6 Months</option>
          <option value="365">1 Year</option>
        </select>
      </form>
      </div>
     
    </section>
  );
};

export default MainPanelTop;
