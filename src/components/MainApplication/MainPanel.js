import classes from "./MainPanel.module.css";
import MainPanelChart from "./MainPanelComponents/MainPanelChart";
import MainPanelLeftSide from "./MainPanelComponents/MainPanelLeftSide";
import MainPanelRightSide from "./MainPanelComponents/MainPanelRightSide";
import MainPanelTop from "./MainPanelComponents/MainPanelTop";

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
