import classes from "./HeroHeaderCon.module.css";

const HeroHeaderContainer = () => {
  return (
    <section className={classes.heroHeaderContainer}>
      <h1>The best trading platform</h1>
      <p>
        We belive that investing is intresting. Open an account now and ... Our
        trading platform provides...
      </p>
      <button>Get started</button>
    </section>
  );
};

export default HeroHeaderContainer;
