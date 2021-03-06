import classes from "./TopNavigation.module.css";
import signOutImg from "../../../images/signOutBtn.png";
import msgImg from "../../../images/email.png";
import { Fragment } from "react";
import NewOrder from "./New order components/NewOrder";
import { useDispatch, useSelector } from "react-redux";
import { applicationActions } from "../../../store/application-slice";

const TopNavigation = () => {
  const { modalVisibility } = useSelector((state) => state.applicationData);

  const dispatch = useDispatch();

  const changeModalStateHandler = () => {
    dispatch(applicationActions.changeModalState());
  };

  return (
    <Fragment>
      {modalVisibility && (
        <NewOrder onChangeModalState={changeModalStateHandler} />
      )}
      <nav className={classes.topNavContainer}>
        <ul>
          <li className={classes.assetsLi}>X</li>
          <li className={classes.cashLi}>X</li>
          <li className={classes.buyLi}>
            <button
              className={classes.newOrderBtn}
              onClick={changeModalStateHandler}
            >
              + NEW ORDER
            </button>
          </li>
          <li className={classes.rightSideOptions}>
            <div className={classes.msgImgContainer}>
              <img className={classes.msgImg} src={msgImg}></img>
            </div>
            <div className={classes.signOutBtnContainer}>
              <button className={classes.signOutBtn}>
                <img className={classes.signOutBtnImg} src={signOutImg}></img>
                <span className={classes.signOutBtnText}>Sign out</span>
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default TopNavigation;
