import { useState } from "react";
import SecurityShortView from "./Left Side Components/SecurityShortView";
import classes from "./MainPanelLeftSide.module.css";

const MainPanelLeftSide = (props) => {
  const [loadingStatus, setLoadStatus] = useState(null);
  const cryptoIDsAr = props.cryptoArr;

  let content;

  const clickHandler = (e) => {
    const clickedItemID = e.target.closest("li").dataset.id;

    if (props.activeCrypto === clickedItemID) return;

    props.onChangeActiveCrypto(clickedItemID);
  };

  if (cryptoIDsAr.length === 0) {
    content = (
      <p className={classes.mainPanelLeftSide_noSecurities}>No securities</p>
    );
  }

  if (loadingStatus === "failed") {
    content = (
      <p className={classes.mainPanelLeftSide_noSecurities}>
        Problem with internet connection
      </p>
    );
  }

  if (cryptoIDsAr.length >= 1) {
    content = cryptoIDsAr.map((cryptoID) => (
      <SecurityShortView
        loadingStatus={loadingStatus}
        setLoadingStatus={setLoadStatus}
        onClick={clickHandler}
        dataset={cryptoID}
        key={cryptoID}
        activeBtnState={props.activeCrypto}
      ></SecurityShortView>
    ));
  }

  return (
    <section className={classes.securitiesListContainer}>
      <ul className={classes.securitiesContainer}>{content}</ul>
    </section>
  );
};

export default MainPanelLeftSide;
