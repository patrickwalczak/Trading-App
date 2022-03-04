import classes from "./ExchangeOrderForm.module.css";
import { useDispatch } from "react-redux";
import { searchResultsActions } from "../../../../store/searchResults-slice";

const FoundElement = (props) => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(searchResultsActions.addChosenSecurity({ ...props.data }));
    props.onClick();
  };

  return (
    <li className={classes.foundElement} onClick={clickHandler}>
      <div className={classes.foundElementImgContainer}>
        <img src={props.data.image} className={classes.foundElementImg}></img>
      </div>
      <div className={classes.foundElementNameSymbolContainer}>
        <h6 className={classes.foundElName}>{props.data.name}</h6>
        <span className={classes.foundElSymbol}>{props.data.symbol}</span>
      </div>
      <span className={classes.foundElType}>cryptocurrency</span>
    </li>
  );
};

export default FoundElement;
