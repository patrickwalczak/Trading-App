import classes from "./Header.module.css";
import HeroHeaderContainer from "./HeroHeaderCon";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className={classes.header}>
      <Navigation />
      <HeroHeaderContainer />
    </header>
  );
};

export default Header;
