import { NavLink } from "react-router-dom";
import classes from "./SideNavigation.module.css";

const SideNavigation = () => {
  return (
    <nav className={classes.sideNavCon}>
      <ul>
        <li>
          <NavLink className={classes.link} to="/tradingPlatform/mainPanel">
            Main Panel
          </NavLink>
        </li>
        <li>
          <NavLink className={classes.link} to="/tradingPlatform/mainPanel">
            My equities and cryptocurr
          </NavLink>
        </li>
        <li>
          <NavLink className={classes.link} to="/tradingPlatform/mainPanel">
            Mark as Watched
          </NavLink>
        </li>
        <li>
          <NavLink className={classes.link} to="/tradingPlatform/mainPanel">
            Other
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigation;
