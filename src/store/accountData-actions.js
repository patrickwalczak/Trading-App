import { loadingTimeLimitHandler } from "../helpers/helpers";
import { accountDataActions } from "./accountData-slice";
import { fetchHandler } from "./application-actions";
import { applicationActions } from "./application-slice";
import { taskStatusActions } from "./taskStatus-slice";

const URL =
  "https://trading-platform-dabf0-default-rtdb.europe-west1.firebasedatabase.app/application/users/-MwMzUzhzGFw1VkH2kJS.json";

// TODO in the future each user will have unique ID in the firebase and fucntion will receive id as a parameter

export const getAccountData = () => {
  return async (dispatch) => {
    try {
      dispatch(
        taskStatusActions.changeAccountDataLoading({ status: "loading" })
      );

      const user_data = await Promise.race([
        dispatch(fetchHandler(URL)),
        loadingTimeLimitHandler(),
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

const crypto_unique_url =
  "https://trading-platform-dabf0-default-rtdb.europe-west1.firebasedatabase.app/application/users/-MwMzUzhzGFw1VkH2kJS/cryptoUniqueList.json";

export const addTransaction = (transactionData, counter, uniqueList) => {
  return async (dispatch) => {
    const id = createID(counter);
    const transactionDate = Date.now();
    const transactionObj = { ...transactionData, id, transactionDate };

    const cryptoUniqueHandler = async (updatedData) => {
      try {
        await Promise.race([
          dispatch(
            fetchHandler(crypto_unique_url, {
              method: "PUT",
              body: JSON.stringify(updatedData),
            })
          ),
          loadingTimeLimitHandler(),
        ]);

        dispatch(accountDataActions.addPurchasedCrypto(updatedData));
      } catch (err) {
        throw err;
      }
    };

    try {
      await Promise.race([
        dispatch(
          fetchHandler(transaction_counter_url, {
            method: "PUT",
            body: JSON.stringify(counter + 1),
          })
        ),
        loadingTimeLimitHandler(),
      ]);

      dispatch(applicationActions.increaseCounter());

      await Promise.race([
        dispatch(
          fetchHandler(available_funds_url, {
            method: "PUT",
            body: JSON.stringify(transactionData.availableFundsAfter),
          })
        ),
        loadingTimeLimitHandler(),
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
          fetchHandler(transactions_url, {
            method: "POST",
            body: JSON.stringify({ ...transactionObj }),
          })
        ),
        loadingTimeLimitHandler(),
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

      const { purchasedSecurityID: cryptoID, purchasedAmount: amount } =
        transactionObj;

      const isNew = uniqueList.find((item) => item.id === cryptoID);

      if (isNew === undefined) {
        const x = uniqueList.slice();

        x.unshift({
          id: cryptoID,
          amount: amount,
        });

        await cryptoUniqueHandler(x);
      }

      if (isNew !== undefined) {
        const x = uniqueList.slice();
        const index = uniqueList.findIndex((item) => item.id === isNew.id);

        let updatedObj = { ...isNew, amount: +amount + +isNew.amount };

        if (updatedObj.amount > 0) {
          x[index] = updatedObj;

          await cryptoUniqueHandler(x);
        } else {
          x.splice(index, 1);

          await cryptoUniqueHandler(x);
        }
      }

      dispatch(
        taskStatusActions.changeSendingTransactionStatus({ status: "success" })
      );
    } catch (err) {
      dispatch(
        taskStatusActions.changeSendingTransactionStatus({ status: "failed" })
      );
      console.log("Adding transaction failed");
      console.log(err);
      dispatch(
        accountDataActions.updateAvailableFunds(
          transactionData.availableFundsBefore
        )
      );
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
