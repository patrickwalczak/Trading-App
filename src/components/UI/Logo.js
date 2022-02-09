import classes from "./Logo.module.css";
import logoImg from "../../images/profits.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/welcome" className={classes.logoContainer}>
      <img className={classes.logo} src={logoImg}></img>
    </Link>
  );
};

export default Logo;
