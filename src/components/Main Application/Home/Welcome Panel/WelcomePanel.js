import classes from "./WelcomePanel.module.css";
const WelcomePanel = () => {
  return (
    <header className={classes.welcomePanel__container}>
      <h1 className={classes.welcomePanel__h1}>Welcome, Patrick</h1>
    </header>
  );
};
export default WelcomePanel;
