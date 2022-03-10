import classes from "./TransactionStatusModal.module.css";
import React from "react";

const TransactionStatusModal = (props) => {
  let content, btnText, mainHeader, colorClass;
  if (props.type === "success") {
    content = (
      <p className={classes.successModalParagraph}>
        New transaction has been <br></br> created successfully.
      </p>
    );
    btnText = "Great";
    mainHeader = "Success!";
    colorClass = "successModalBtn";
  } else {
    content = (
      <p className={classes.successModalParagraph}>Something went wrong!</p>
    );
    btnText = "Try Again";
    mainHeader = "Fail";
    colorClass = "failModalBtn";
  }

  return (
    <React.Fragment>
      <div className={classes.successModalContainer}>
        <header className={classes.successImgContainer}>
          <img className={classes.successImg} src={props.image}></img>
        </header>
        <main className={classes.mainSuccessContainer}>
          <h2 className={classes.successModalHeader}>{mainHeader}</h2>
          {content}
        </main>
        <footer className={classes.successModalFooter}>
          <button
            className={`${classes.modalBtn} ${classes[colorClass]}`}
            onClick={props.onActionHandler}
          >
            {btnText}
          </button>
        </footer>
      </div>
    </React.Fragment>
  );
};
export default TransactionStatusModal;
