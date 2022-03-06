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
  const defaultDataRange = 1;

  // This a list (array) of unique cryptocurrencies' id
  const { purchasedCryptocurrencies: cryptoIDs } = useSelector(
    (state) => state.accountData
  );
  const { currency: userCurrency } = useSelector((state) => state.accountData);

  const [activeCrypto, setActiveCrypto] = useState(cryptoIDs[0]);
  const [chosenDataRange, setDataRange] = useState(defaultDataRange);
  const [cryptoArr, setCryptoArr] = useState(cryptoIDs);

  if (cryptoIDs.length !== cryptoArr.length) {
    setActiveCrypto(cryptoIDs[0]);
    setCryptoArr(cryptoIDs);
  }

  const changeActiveCryptoHandler = (clickedCryptoID) => {
    setActiveCrypto(clickedCryptoID);
  };

  const getHistoricalDataHandler = (e) => {
    const selectedRange = e.target.value;

    if (selectedRange === chosenDataRange) return;

    setDataRange(selectedRange);
  };

  useEffect(() => {
    if (cryptoIDs.length === 0) return;
    dispatch(fetchSingleCrypto(activeCrypto));
  }, [activeCrypto]);

  useEffect(() => {
    dispatch(fetchHistoricalData(activeCrypto, userCurrency, chosenDataRange));
  }, [chosenDataRange, activeCrypto]);

  return (
    <main className={classes.mainPanelContainer}>
      <MainPanelLeftSide
        cryptoArr={cryptoArr}
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
