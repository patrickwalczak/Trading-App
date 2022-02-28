import classes from "./HomePanel.module.css";
import MainPanelChart from "./Home Panel Components/MainPanelChart";
import MainPanelLeftSide from "./Home Panel Components/MainPanelLeftSide";
import MainPanelRightSide from "./Home Panel Components/MainPanelRightSide";
import MainPanelTop from "./Home Panel Components/MainPanelTop";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchHistoricalData,
  fetchSingleCrypto,
} from "../../../../store/takeCryptocurrencies";

const MainPanel = () => {
  const dispatch = useDispatch();
  const { purchasedCryptocurrencies: cryptoIDs } = useSelector(
    (state) => state.accountData
  );
  const [activeCrypto, setActiveCrypto] = useState(cryptoIDs[0]);

  const [historicalDataRange, setHistoricalDataRange] = useState(1);

  const changeActiveCryptoHandler = (clickedCryptoID) => {
    setActiveCrypto(clickedCryptoID);
  };

  const getHistoricalDataHandler = (e) => {
    const selectedRange = e.target.current;

    if (selectedRange === historicalDataRange) return;

    setHistoricalDataRange(selectedRange);
  };

  useEffect(() => {
    if (cryptoIDs.length === 0) return;
    dispatch(fetchSingleCrypto(activeCrypto));
  }, [activeCrypto]);

  useEffect(() => {
    dispatch(fetchHistoricalData(activeCrypto, "usd", historicalDataRange));
  }, [historicalDataRange]);

  return (
    <main className={classes.mainPanelContainer}>
      <MainPanelLeftSide
        cryptoArr={cryptoIDs}
        activeCrypto={activeCrypto}
        onChangeActiveCrypto={changeActiveCryptoHandler}
      />
      <MainPanelTop
        onGetHistoricalData={getHistoricalDataHandler}
        activeCrypto={activeCrypto}
      />
      <MainPanelChart />
      <MainPanelRightSide />
    </main>
  );
};

export default MainPanel;
