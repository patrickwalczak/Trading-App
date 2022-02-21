import { Fragment } from "react";
import classes from "./ExchangeOrderForm.module.css";
import { useSelector } from "react-redux";
import searchImg from "../../../../images/search.png";
import loadingSpinnerImg from "../../../../images/loadingSpinner.png";
import FoundElementsContainer from "./FoundElementsContainer";
import StatusMsg from "./StatusMsg";

const InputSearchContainer = (props) => {
  const { searchResultsStatus } = useSelector((state) => state.taskStatus);

  const displayLoadingSpinner = searchResultsStatus?.status === "loading" &&
    props.value && (
      <img className={classes.loadingSpinner} src={loadingSpinnerImg}></img>
    );
  const displayClearInputBtn = (searchResultsStatus?.status === "success" ||
    searchResultsStatus?.status === "failed") &&
    props.value && (
      <button
        className={classes.clearInputBtn}
        onClick={props.onClearInputHandler}
      >
        x
      </button>
    );

  return (
    <Fragment>
      <div className={classes.inputSearchContainer}>
        <img className={classes.searchImg} src={searchImg}></img>
        <input
          autoFocus
          value={props.value}
          onBlur={props.onBlur}
          onChange={props.onChange}
          className={classes.searchInput}
          type="text"
          placeholder="Search by symbol or name"
        ></input>
        {displayClearInputBtn}
        {displayLoadingSpinner}
      </div>
      {searchResultsStatus?.status === "success" && props.value && (
        <FoundElementsContainer />
      )}
      {searchResultsStatus?.status === "failed" && (
        <StatusMsg>lost internet connection</StatusMsg>
      )}
    </Fragment>
  );
};

export default InputSearchContainer;
