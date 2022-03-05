import classes from "./SuccessModal.module.css";
import successImg from "../../../../../images/success.png";
import React from "react";

const SuccessModal = (props) => {
  return (
    <React.Fragment>
      <div className={classes.successModalContainer}>
        <header className={classes.successImgContainer}>
          <img className={classes.successImg} src={successImg}></img>
        </header>
        <main className={classes.mainSuccessContainer}>
          <h2 className={classes.successModalHeader}>Success!</h2>
          <p className={classes.successModalParagraph}>
            New transaction has been <br></br> created successfully.
          </p>
        </main>
        <footer className={classes.successModalFooter}>
          <button
            className={classes.successModalBtn}
            onClick={props.onResetForm}
          >
            Great!
          </button>
        </footer>
      </div>
    </React.Fragment>
  );
};
export default SuccessModal;
