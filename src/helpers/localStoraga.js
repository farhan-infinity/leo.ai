import { LocalStorageKeys } from "../utility/enums/localStorage";

export class LocalStorageHelpers {
  static getUserData = () => {
    try {
      if (localStorage.getItem(LocalStorageKeys.userData)) {
        return JSON.parse(localStorage.getItem(LocalStorageKeys.userData));
      }
      return null;
    } catch (err) {
      console.log("Something went wrong");
      return null;
    }
  };
}
