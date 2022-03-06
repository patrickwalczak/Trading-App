import { Fragment } from "react";
import classes from "../NewOrder.module.css";
import { useSelector } from "react-redux";
import searchImg from "../../../../../images/search.png";
import loadingSpinnerImg from "../../../../../images/loadingSpinner.png";
import FoundElementsContainer from "./FoundElementsContainer";
import StatusMsg from "./StatusMsg";

const InputSearchContainer = (props) => {
  const onClearInput = (e) => {
    e.preventDefault();
    props.onUpdateSearchInput("");
  };

  const { searchResultsStatus } = useSelector((state) => state.taskStatus);

  const displayLoadingSpinner = searchResultsStatus?.status === "loading" &&
    props.value && (
      <img className={classes.loadingSpinner} src={loadingSpinnerImg}></img>
    );
  const displayClearInputBtn = (searchResultsStatus?.status === "success" ||
    searchResultsStatus?.status === "failed") &&
    props.value && (
      <button className={classes.clearInputBtn} onClick={onClearInput}>
        x
      </button>
    );

  return (
    <Fragment>
      <div className={classes.inputSearchContainer}>
        <label htmlFor="searchField">
          <img className={classes.searchImg} src={searchImg}></img>
        </label>
        <input
          id="searchField"
          autoFocus
          value={props.value}
          onChange={(e) => props.onUpdateSearchInput(e.target.value.trim())}
          className={classes.searchInput}
          type="text"
          placeholder="Search by symbol or name"
        ></input>
        {displayClearInputBtn}
        {displayLoadingSpinner}
      </div>
      {searchResultsStatus?.status === "success" && props.value && (
        <FoundElementsContainer onClearInput={props.onUpdateSearchInput} />
      )}
      {searchResultsStatus?.status === "failed" && (
        <StatusMsg>lost internet connection</StatusMsg>
      )}
    </Fragment>
  );
};

export default InputSearchContainer;
