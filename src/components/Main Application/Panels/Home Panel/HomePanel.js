import classes from "./HomePanel.module.css";
import MainPanelChart from "./Home Panel Components/MainPanelChart";
import MainPanelLeftSide from "./Home Panel Components/MainPanelLeftSide";
import MainPanelRightSide from "./Home Panel Components/MainPanelRightSide";
import MainPanelTop from "./Home Panel Components/MainPanelTop";

const MainPanel = () => {
  return (
    <main className={classes.mainPanelContainer}>
      <MainPanelLeftSide />
      <MainPanelTop />
      <MainPanelChart />
      <MainPanelRightSide />
    </main>
  );
};

export default MainPanel;
