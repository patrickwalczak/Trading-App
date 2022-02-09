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
        <input type="text" id="name" />
      </div>
      <div className={classes.block}>
        <label htmlFor="mail">E-Mail Address</label>
        <input type="email" id="mail" />
      </div>
      <div className={classes.block}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default SignUpForm;
