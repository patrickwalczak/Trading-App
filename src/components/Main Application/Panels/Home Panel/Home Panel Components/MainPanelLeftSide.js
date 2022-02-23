import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import SecurityShortView from "./Left Side Components/SecurityShortView";
import classes from "./MainPanelLeftSide.module.css";

const MainPanelLeftSide = () => {
  const { transactions } = useSelector((state) => state.accountData);

  const [activeButtonId, setActiveBtnId] = useState(transactions[0].databaseID);

  let content;

  const clickHandler = (e) => {
    const clickedItemID = e.target.closest("li").dataset.id;

    if (activeButtonId === clickedItemID) return;

    setActiveBtnId(clickedItemID);
  };

  if (transactions.length === 0) {
    content = "";
  }

  if (transactions.length >= 1) {
    content = transactions.map((transaction) => (
      <SecurityShortView
        onClick={clickHandler}
        dataset={transaction.databaseID}
        key={transaction.databaseID}
        activeBtnState={activeButtonId}
        data={transaction.transactionData}
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
