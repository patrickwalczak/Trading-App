import classes from "./MarketData.module.css";
import MainChart from "./Components/MainChart";
import SecuritiesList from "./Components/SecuritiesList";
import StatisticsComponent from "./Components/StatisticsComponent";
import PanelTop from "./Components/PanelTop";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchHistoricalData,
  fetchSingleCrypto,
} from "../../../../store/takeCryptocurrencies";
import { applicationActions } from "../../../../store/application-slice";

const MarketData = () => {
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
      <SecuritiesList
        cryptoArr={cryptoArr}
        activeCrypto={activeCrypto}
        onChangeActiveCrypto={changeActiveCryptoHandler}
      />
      <PanelTop
        onGetHistoricalData={getHistoricalDataHandler}
        activeCrypto={activeCrypto}
      />
      <MainChart />
      <StatisticsComponent />
    </main>
  );
};

export default MarketData;
