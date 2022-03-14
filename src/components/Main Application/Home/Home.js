import { Fragment } from "react";
// import classes from "./Home.module.css";
import MarketData from "./Market Data/MarketData";
import WelcomePanel from "./Welcome Panel/WelcomePanel";
const Home = () => {
  return (
    <Fragment>
      <WelcomePanel />
      <MarketData />
    </Fragment>
  );
};
export default Home;
