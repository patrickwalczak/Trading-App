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
import { applicationActions } from "../../../../store/application-slice";

const MainPanel = () => {
  const dispatch = useDispatch();
  const defaultDataRange = 1;

  // This a list (array) of unique crypto id and amount
  const { purchasedCryptocurrencies: cryptoIDs } = useSelector(
    (state) => state.accountData
  );
  const { currency: userCurrency } = useSelector((state) => state.accountData);

  const getCryptoID = cryptoIDs.map((item) => item.id);

  const [activeCrypto, setActiveCrypto] = useState(cryptoIDs[0]?.id);
  const [chosenDataRange, setDataRange] = useState(defaultDataRange);
  const [cryptoArr, setCryptoArr] = useState(getCryptoID);

  if (cryptoIDs.length !== cryptoArr.length) {
    setActiveCrypto(cryptoIDs[0]?.id);
    setCryptoArr(getCryptoID);
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
    if (!activeCrypto) return;
    dispatch(fetchHistoricalData(activeCrypto, userCurrency, chosenDataRange));
  }, [chosenDataRange, activeCrypto]);

  useEffect(() => {
    if (!cryptoIDs.length) dispatch(applicationActions.removeActiveCrypto());
  }, [cryptoIDs]);

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
