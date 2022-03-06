import { accountDataActions } from "./accountData-slice";
import { fetchAppData } from "./application-actions";
import { applicationActions } from "./application-slice";
import { taskStatusActions } from "./taskStatus-slice";

const URL =
  "https://trading-platform-dabf0-default-rtdb.europe-west1.firebasedatabase.app/application/users/-MwMzUzhzGFw1VkH2kJS.json";

// TODO in the future each user will have unique ID in the firebase and fucntion will receive id as a parameter

export const getAccountData = () => {
  return async (dispatch) => {
    const loadingTimeLimitHandler = new Promise((_, reject) =>
      setTimeout(() => {
        reject("Problem with internet connection");
      }, 5000)
    );

    try {
      dispatch(
        taskStatusActions.changeAccountDataLoading({ status: "loading" })
      );

      const user_data = await Promise.race([
        dispatch(fetchAppData(URL)),
        loadingTimeLimitHandler,
      ]);

      if (!user_data) throw new Error("Sth wrong with user data");

      dispatch(accountDataActions.getUserAccountData({ ...user_data }));

      dispatch(
        taskStatusActions.changeAccountDataLoading({ status: "success" })
      );
    } catch (err) {
      console.log(err);
      dispatch(taskStatusActions.changeAccountDataLoading({ status: "fail" }));
    }
  };
};

// TODO in the future link will be dynamically created based on the user id in the database
// Link refers to specific user
const transactions_url =
  "https://trading-platform-dabf0-default-rtdb.europe-west1.firebasedatabase.app/application/users/-MwMzUzhzGFw1VkH2kJS/transactions.json";

// Link refers to specific user
const available_funds_url =
  "https://trading-platform-dabf0-default-rtdb.europe-west1.firebasedatabase.app/application/users/-MwMzUzhzGFw1VkH2kJS/availableFunds.json";

// General application data
const transaction_counter_url =
  "https://trading-platform-dabf0-default-rtdb.europe-west1.firebasedatabase.app/application/-MwLmbRjZUUKo8dEZNIX/transactionCounter.json";

export const addTransaction = (transactionData, counter) => {
  return async (dispatch) => {
    const id = createID(counter);
    const transactionDate = Date.now();
    const transactionObj = { ...transactionData, id, transactionDate };

    const loadingTimeLimitHandler = new Promise((_, reject) =>
      setTimeout(() => {
        reject("Problem with internet connection");
      }, 5000)
    );

    try {
      await Promise.race([
        dispatch(
          fetchAppData(transaction_counter_url, {
            method: "PUT",
            body: JSON.stringify(counter + 1),
          })
        ),
        loadingTimeLimitHandler,
      ]);

      dispatch(applicationActions.increaseCounter());

      await Promise.race([
        dispatch(
          fetchAppData(available_funds_url, {
            method: "PUT",
            body: JSON.stringify(transactionData.availableFundsAfter),
          })
        ),
        loadingTimeLimitHandler,
      ]);

      dispatch(
        accountDataActions.updateAvailableFunds(
          transactionData.availableFundsAfter
        )
      );

      // ============================================
      // I will send transaction data only if transaction counter and available funds will be updated

      const sentTransactionResponse = await Promise.race([
        dispatch(
          fetchAppData(transactions_url, {
            method: "POST",
            body: JSON.stringify({ ...transactionObj }),
          })
        ),
        loadingTimeLimitHandler,
      ]);

      // senTransactionResponse is a returned ID of the created transaction object in the database (firebase)

      if (!sentTransactionResponse?.name)
        throw new Error("Sth is wrong with database ID");

      dispatch(
        accountDataActions.addTransaction({
          databaseID: sentTransactionResponse.name,
          transactionData: transactionObj,
        })
      );

      dispatch(accountDataActions.addPurchasedCrypto(transactionObj));

      dispatch(
        taskStatusActions.changeSendingTransactionStatus({ status: "success" })
      );
    } catch (err) {
      dispatch(
        taskStatusActions.changeSendingTransactionStatus({ status: "failed" })
      );
      console.log("Adding transaction failed");
      console.log(err);
      // TODO if sending transaction failed, maybe I should add function which will return funds which was taken from user
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
