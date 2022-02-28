import SecurityShortView from "./Left Side Components/SecurityShortView";
import classes from "./MainPanelLeftSide.module.css";

const MainPanelLeftSide = (props) => {
  const cryptoIDsAr = props.cryptoArr;

  let content;

  const clickHandler = (e) => {
    const clickedItemID = e.target.closest("li").dataset.id;

    if (props.activeCrypto === clickedItemID) return;

    props.onChangeActiveCrypto(clickedItemID);
  };

  if (cryptoIDsAr.length === 0) {
    content = <p>No securities</p>;
  }

  if (cryptoIDsAr.length >= 1) {
    content = cryptoIDsAr.map((cryptoID) => (
      <SecurityShortView
        onClick={clickHandler}
        dataset={cryptoID}
        key={cryptoID}
        activeBtnState={props.activeCrypto}
      ></SecurityShortView>
    ));
  }

  return (
    <section className={classes.securitiesListContainer}>
      <h3 className={classes.securitiesHeader}>My Securities</h3>
      <ul className={classes.securitiesContainer}>{content}</ul>
    </section>
  );
};

export default MainPanelLeftSide;
