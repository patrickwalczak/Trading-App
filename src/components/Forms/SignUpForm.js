import classes from "./SignUpForm.module.css";

const SignUpForm = () => {
  const submitFormHandler = (e) => {
    e.preventDefault();

    console.log("Test");
  };

  return (
    <form onSubmit={submitFormHandler}>
      <div className={classes.block}>
        <label htmlFor="name">Username</label>
        <input className={classes.signUpInput} type="text" id="name" />
      </div>
      <div className={classes.block}>
        <label htmlFor="mail">E-Mail Address</label>
        <input className={classes.signUpInput} type="email" id="mail" />
      </div>
      <div className={classes.block}>
        <label htmlFor="password">Password</label>
        <input className={classes.signUpInput} type="password" id="password" />
      </div>
      <button className={classes.signUpBtn} type="submit">Register</button>
    </form>
  );
};

export default SignUpForm;
