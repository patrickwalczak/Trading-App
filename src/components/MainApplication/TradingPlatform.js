import { Routes, Route } from "react-router-dom";
import MainPanel from "./MainPanel";
import SideNavigation from "./SideNavigation";
import TopNavigation from "./TopNavigation";
import classes from "./TradingPlatform.module.css";

const TradingPlatform = () => {
  return (
    <div className={classes.container}>
      <SideNavigation />
      <TopNavigation />
      <Routes>
        <Route path="/mainPanel" element={<MainPanel />} />
      </Routes>
    </div>
  );
};

export default TradingPlatform;
