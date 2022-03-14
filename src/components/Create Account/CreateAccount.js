import SignUpForm from "./SignUpForm";
import Logo from "../UI/Logo";
import classes from "./CreateAccount.module.css";

const CreateAccount = () => {
  return (
    <div className={classes.createAccount__container}>
      <Logo />
      <h1 className={classes.createAccount__h1}>
        Create Invrest account <br /> Invest your money!
      </h1>
      <SignUpForm />
    </div>
  );
};

export default CreateAccount;
