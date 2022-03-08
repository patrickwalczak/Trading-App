import { Routes, Route } from "react-router-dom";
import HomePanel from "./Panels/Home Panel/HomePanel";
import SideNavigation from "./Side Navigation/SideNavigation";
import TopNavigation from "./Top Navigation/TopNavigation";
import classes from "./MainApplication.module.css";
import { useEffect } from "react";
import {
  getApplicationData,
  updateWebCounter,
} from "../../store/application-actions";
import { useDispatch, useSelector } from "react-redux";
import { getAccountData } from "../../store/accountData-actions";
import spinnerImg from "../../images/loadingSpinner.png";

const TradingPlatform = () => {
  const dispatch = useDispatch();
  const { loadAccountDataStatus } = useSelector((state) => state.taskStatus);
  const { loadApplicationDataStatus } = useSelector(
    (state) => state.taskStatus
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(getApplicationData());
      dispatch(getAccountData());
      dispatch(updateWebCounter());
    }, 500);
  }, []);

  const displayApplication =
    loadAccountDataStatus?.status === "success" &&
    loadApplicationDataStatus?.status === "success";

  return (
    <div className={classes.container}>
      {displayApplication && <SideNavigation />}
      {displayApplication && <TopNavigation />}

      <Routes>
        {displayApplication && (
          <Route path="/mainPanel" element={<HomePanel />} />
        )}
        {displayApplication && <Route path="/" element={<HomePanel />} />}
      </Routes>
      {displayApplication === false && (
        <div className={classes.spinnerWrapper}>
          <img className={classes.loadingSpinner} src={spinnerImg}></img>
        </div>
      )}
    </div>
  );
};

export default TradingPlatform;
