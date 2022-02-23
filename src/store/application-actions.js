import { applicationActions } from "./application-slice";
import { taskStatusActions } from "./taskStatus-slice";

const URL = (database_id = "") => {
  return `https://trading-platform-dabf0-default-rtdb.europe-west1.firebasedatabase.app/application${database_id}.json`;
};

const database_id = "/-MwLmbRjZUUKo8dEZNIX";

export const getApplicationData = () => {
  return async (dispatch) => {
    try {
      dispatch(
        taskStatusActions.changeApplicationDataLoading({ status: "loading" })
      );

      const response = await fetch(URL(database_id));

      if (!response.ok) {
        throw new Error("Sth went wrong");
      }

      const data = await response.json();

      if (!data) throw new Error("Wrong database ID");

      const { expirationDate, transactionCounter } = data;

      const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };

      const dateFromDatabase = new Date(expirationDate).toLocaleString(
        "en-US",
        dateOptions
      );

      const today = new Date().toLocaleString("en-US", dateOptions);

      if (dateFromDatabase === today) {
        dispatch(
          taskStatusActions.changeApplicationDataLoading({ status: "success" })
        );
        return dispatch(
          applicationActions.initState({ expirationDate, transactionCounter })
        );
      }

      const updatedData = {
        expirationDate: Date.now(),
        transactionCounter: 0,
      };

      await dispatch(updateApplicationData(URL, database_id, updatedData));

      await dispatch(applicationActions.initState(updatedData));

      dispatch(
        taskStatusActions.changeApplicationDataLoading({ status: "success" })
      );
    } catch (err) {
      dispatch(
        taskStatusActions.changeApplicationDataLoading({ status: "failed" })
      );

      console.log(err);
    }
  };
};

export const updateApplicationData = (url, database_id, updatedData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url(database_id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Sth went wrong");
      }
    } catch (err) {
      throw "Wrong url or lost internet connection";
    }
  };
};

export const updateApplicationCounter = (updatedData) => {
  return async () => {
    try {
      const response = await fetch(
        "https://trading-platform-dabf0-default-rtdb.europe-west1.firebasedatabase.app/application/-MwLmbRjZUUKo8dEZNIX/transactionCounter.json",
        {
          method: "PUT",
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Could not update counter",
          response.statusText,
          response.url
        );
      }
    } catch (err) {
      throw err;
    }
  };
};
