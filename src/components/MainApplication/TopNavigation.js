import classes from "./TopNavigation.module.css";
import signOutImg from "../../images/signOutBtn.png";
import msgImg from "../../images/email.png";
import { Fragment, useState } from "react";
import ExchangeOrderForm from "../Forms/New exchange order/ExchangeOrderForm";

const TopNavigation = () => {
    const [modalVisibility, setModalVisibility] = useState(false)


    const changeModalStateHandler = () => {
      setModalVisibility(!modalVisibility)
    }   

  return (
    <Fragment >

    {modalVisibility && <ExchangeOrderForm onChangeModalState={changeModalStateHandler} />}
    <nav className={classes.topNavContainer}>
      <ul>
        <li className={classes.assetsLi}>Bought assets</li>
        <li className={classes.cashLi}>Cash</li>
        <li className={classes.buyLi}>
          <button onClick={changeModalStateHandler}>+ NEW ORDER</button>
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
