import classes from "./PanelTop.module.css";
import analyticsImg from "../../../../../images/analytics.png";
import { useSelector } from "react-redux";

const PanelTop = (props) => {
  const { activeCrypto } = useSelector((state) => state.applicationData);
  const disabledBtn = !activeCrypto ? true : false;

  return (
    <section className={classes.mainPanelTop__Container}>
      <img src={analyticsImg} className={classes.analyticsImg} />
      <h2 className={classes.mainPanelTop__Header}>{props.activeCrypto}</h2>

      <form className={classes.chooseDateRangeForm}>
        <label className={classes.dataRangeLabel} htmlFor="dataRange">
          Choose a data range
        </label>
        <select
          disabled={disabledBtn}
          onChange={props.onGetHistoricalData}
          id="dataRange"
          className={classes.dateRangeSelect}
        >
          <option value="1">1 Day</option>
          <option value="7">7 Days</option>
          <option value="30">30 Days</option>
          <option value="90">3 Months</option>
          <option value="180">6 Months</option>
          <option value="365">1 Year</option>
        </select>
      </form>
    </section>
  );
};

export default PanelTop;
