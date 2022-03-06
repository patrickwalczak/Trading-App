import { loadingTimeLimitHandler } from "../helpers/helpers";
import { applicationActions } from "./application-slice";
import { taskStatusActions } from "./taskStatus-slice";

const database_id = "/-MwLmbRjZUUKo8dEZNIX";

const database_url = `https://trading-platform-dabf0-default-rtdb.europe-west1.firebasedatabase.app/application${database_id}.json`;

export const getApplicationData = () => {
  return async (dispatch) => {
    const dateOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    const updatedData = {
      expirationDate: Date.now(),
      transactionCounter: 0,
    };

    const changeAppDataLoadingStatus = (status) =>
      dispatch(
        taskStatusActions.changeApplicationDataLoading({ status: status })
      );

    try {
      changeAppDataLoadingStatus("loading");

      const data = await Promise.race([
        dispatch(fetchHandler(database_url)),
        loadingTimeLimitHandler(),
      ]);
      if (!data) throw "Database doesn't return data";

      const { expirationDate, transactionCounter } = data;

      const dateFromDatabase = new Date(expirationDate).toLocaleString(
        "en-US",
        dateOptions
      );

      const today = new Date().toLocaleString("en-US", dateOptions);

      // If date from database is the same as today date, then there is no necessity to reset date and transaction counter
      if (dateFromDatabase === today) {
        changeAppDataLoadingStatus("success");
        dispatch(
          applicationActions.initState({ expirationDate, transactionCounter })
        );
        return;
      }

      const sentData = await Promise.race([
        loadingTimeLimitHandler(),
        dispatch(
          fetchHandler(database_url, {
            method: "PUT",
            body: JSON.stringify(updatedData),
          })
        ),
      ]);

      dispatch(applicationActions.initState(sentData));

      changeAppDataLoadingStatus("success");
    } catch (err) {
      console.log(err);
      changeAppDataLoadingStatus("failed");
    }
  };
};

export const fetchHandler = (url, methodOptionsObject = {}) => {
  return async () => {
    try {
      const response = await fetch(url, methodOptionsObject);

      if (!response.ok) {
        throw new Error([response.status, response.statusText, response.url]);
      }
      return response.json();
    } catch (err) {
      throw err;
    }
  };
};

export const updateWebCounter = () => {
  return async (dispatch) => {
    try {
      const webCounter = await Promise.race([
        loadingTimeLimitHandler(),
        dispatch(
          fetchHandler(
            "https://trading-platform-dabf0-default-rtdb.europe-west1.firebasedatabase.app/application/webCounter.json"
          )
        ),
      ]);

      await Promise.race([
        loadingTimeLimitHandler(),
        dispatch(
          fetchHandler(
            "https://trading-platform-dabf0-default-rtdb.europe-west1.firebasedatabase.app/application/webCounter.json",
            {
              method: "PUT",
              body: JSON.stringify(webCounter + 1),
            }
          )
        ),
      ]);
    } catch (err) {
      console.log(err);
    }
  };
};
