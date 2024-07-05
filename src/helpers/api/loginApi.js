import axiosInstace from "./axios";
import { SettingsApi } from "./SettingsApi";
import { LocalStorageKeys } from "../../utility/enums/localStorage";
import { ReactToast } from "../../@core/components/react-toast/ReactToast"

export class LoginApi {
  static login = async (values) => {
    try {
      const res = await axiosInstace.post("/login", values);
      console.log(res.data, "data");
      if (res.data.status == 1) {
        localStorage.setItem("token", res.data.token);
        const checkSub = await axiosInstace.put("/user-update-sub-and-user")
        const userData = await SettingsApi.getProfile();

        if (userData?.data) {
          localStorage.setItem(
            LocalStorageKeys.userData,
            JSON.stringify(userData?.data ?? {})
          );
        }

        return {
          error: false,
          success: true,
          data: res?.data?.data,
        };
      }

      return {
        error: false,
        success: false,
        data: res?.data?.data,
      };
    } catch (err) {
      // ReactToast({ message: err.response.data.message, error: true })
      return {
        error: true,
        errors: err,
      };
    }
  };
}

export class GoogleLoginApi {
  static googlelogin = async (values) => {
    try {
      const res = await axiosInstace.post("/google-login", values);
      if (res.data.status === 1) {
        localStorage.setItem("token", res.data.token);
        const userData = await SettingsApi.getProfile();
        if (userData?.data) {
          localStorage.setItem(
            "user_data",
            JSON.stringify(userData?.data ?? {})
          );
        }
        return {
          error: false,
          success: true,
          data: res?.data?.data,
        };
      }

      return {
        error: false,
        success: false,
        data: res?.data?.data,
      };
    } catch (err) {
      ReactToast({ message: err.response.data.message, error: true })
      return {
        error: true,
        errors: err,
      };
    }
  };
}
