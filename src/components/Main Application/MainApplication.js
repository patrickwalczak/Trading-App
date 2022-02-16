import { Routes, Route } from "react-router-dom";
import MainPanel from "./Panels/Home Panel/HomePanel";
import SideNavigation from "./Side Navigation/SideNavigation";
import TopNavigation from "./Top Navigation/TopNavigation";
import classes from "./MainApplication.module.css";

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