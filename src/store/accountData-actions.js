import { accountDataActions } from "./accountData-slice";

const URL =
  "https://trading-platform-dabf0-default-rtdb.europe-west1.firebasedatabase.app/application/users/-MwMUN12plY81wfAQuAV.json";

export const getAccountData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error("Sth went wrong");
      }

      const data = await response.json();

      if (!data) throw new Error("Wrong database ID");

      dispatch(accountDataActions.getUserAccountData(data));
    } catch (err) {
      console.log(err);
    }
  };
};
