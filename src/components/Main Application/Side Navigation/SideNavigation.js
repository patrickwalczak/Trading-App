import { NavLink } from "react-router-dom";
import classes from "./SideNavigation.module.css";

const SideNavigation = () => {
  return (
    <nav className={classes.sideNavCon}>
      <ul>
        <li>
          <NavLink className={classes.link} to="/main/home">
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigation;
