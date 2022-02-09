import classes from "./TopNavigation.module.css";
import signOutImg from "../../images/signOutBtn.png";
import msgImg from "../../images/email.png";

const TopNavigation = () => {
  return (
    <nav className={classes.topNavContainer}>
      <ul>
        <li className={classes.logoLi}>LOGO</li>
        <li className={classes.assetsLi}>Bought assets</li>
        <li className={classes.cashLi}>Cash</li>
        <li className={classes.buyLi}>
          <button>+ New transaction</button>
        </li>
        <li className={classes.rightSideOptions}>
          <li>
            <img className={classes.msgImg} src={msgImg}></img>
          </li>
          <li>ACCOUNT V</li>
          <li className={classes.signOutBtnContainer}>
            <button className={classes.signOutBtn}>
              <img className={classes.signOutBtnImg} src={signOutImg}></img>
              <span className={classes.signOutBtnText}>Sign out</span>
            </button>
          </li>
        </li>
      </ul>
    </nav>
  );
};

export default TopNavigation;
