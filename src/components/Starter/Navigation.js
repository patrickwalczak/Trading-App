import classes from "./Navigation.module.css";
import { Link } from "react-router-dom";
import Logo from "../UI/Logo";

const Navigation = () => {
  return (
    <nav className={classes.nav}>
      <ul className={classes.linksContainer}>
        <li className={classes.logoLi}>
          <Logo />
        </li>
        <li className={classes.loginLi}>
          <Link to="/login" className={classes.logInBtn}>
            Log in
          </Link>
        </li>
        <li className={classes.signUpLi}>
          <Link className={classes.signUpBtn} to="/signup">
            Sign up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
