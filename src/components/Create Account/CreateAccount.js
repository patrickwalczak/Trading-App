import SignUpForm from "./SignUpForm";
import Logo from "../UI/Logo";
import classes from "./CreateAccount.module.css";

const CreateAccount = () => {
  return (
    <div className={classes.container}>
      <Logo />
      <h1>
        Create Invrest account <br /> Invest your money!
      </h1>
      <SignUpForm />
    </div>
  );
};

export default CreateAccount;
