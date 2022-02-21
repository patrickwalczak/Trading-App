import { accountDataActions } from "./accountData-slice";
import { updateApplicationCounter } from "./application-actions";
import { applicationActions } from "./application-slice";
import { taskStatusActions } from "./taskStatus-slice";

const URL =
  "https://trading-platform-dabf0-default-rtdb.europe-west1.firebasedatabase.app/application/users/-MwMzUzhzGFw1VkH2kJS.json";

// TODO in the future each user will have unique ID in the firebase and fucntion will receive id as a parameter

export const getAccountData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error("Sth went wrong");
      }

      const data = await response.json();

      if (!data) throw new Error("Wrong database ID");

      dispatch(accountDataActions.getUserAccountData({ ...data }));
    } catch (err) {
      console.log(err);
    }
  };
};

const url2 =
  "https://trading-platform-dabf0-default-rtdb.europe-west1.firebasedatabase.app/application/users/-MwMzUzhzGFw1VkH2kJS/transactions.json";

const updateFundsUrl =
  "https://trading-platform-dabf0-default-rtdb.europe-west1.firebasedatabase.app/application/users/-MwMzUzhzGFw1VkH2kJS/availableFunds.json";

export const addTransaction = (transactionData, counter) => {
  return async (dispatch) => {
    try {
      dispatch(
        taskStatusActions.changeSendingTransactionStatus({ status: "loading" })
      );

      const id = createID(counter);
      const transactionDate = Date.now();

      const transactionObj = { ...transactionData, id, transactionDate };

      const sendTransaction = await fetch(url2, {
        method: "POST",
        body: JSON.stringify({ ...transactionObj }),
      });

      if (!sendTransaction.ok) {
        throw new Error(
          "Could not send transaction data",
          sendTransaction.statusText,
          sendTransaction.url
        );
      }

      const data = await sendTransaction.json();

      const databaseID = await data.name;

      if (!databaseID) throw new Error("Sth is wrong with database ID");

      await dispatch(
        accountDataActions.addTransaction({
          databaseID,
          transactionData: transactionObj,
        })
      );

      const updateAvailableFunds = await fetch(updateFundsUrl, {
        method: "PUT",
        body: JSON.stringify(transactionData.availableFundsAfter),
      });

      if (!updateAvailableFunds.ok) {
        throw new Error(
          "Could not update available funds",
          updateAvailableFunds.statusText,
          updateAvailableFunds.url
        );
      }

      const availableFundsData = await updateAvailableFunds.json();

      if (!availableFundsData)
        throw new Error("Available funds response data returns null");

      await dispatch(
        accountDataActions.updateAvailableFunds(availableFundsData)
      );

      // Update counter in the firebase
      await dispatch(updateApplicationCounter(counter + 1));

      dispatch(applicationActions.increaseCounter());

      dispatch(
        taskStatusActions.changeSendingTransactionStatus({ status: "success" })
      );
    } catch (err) {
      dispatch(
        taskStatusActions.changeSendingTransactionStatus({ status: "failed" })
      );
      throw err;
    }
  };
};

const createID = (transactionCounter) => {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, 0);
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const year = String(date.getFullYear()).slice(2, 4);
  const transactionNum = String(transactionCounter).padStart(5, 0);
  const id = `TR${day + month + year + transactionNum}`;

  return id;
};

// I need a variable here which will help with displaying current processing status (loading, success, failed)

// What else I want to do with that transaction object?
// - create an ID
// - add creation date (timestamp)

// TODO Call loading spinner
// Change button content from 'Place order' to loading spinner

// TODO Send transaction to reducer and server

// TODO display error or success msg
// Change button content from 'Place order' to "tick'

// TODO close form and reset
