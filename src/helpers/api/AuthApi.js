import axiosInstace from "./axios";
import { ReactToast } from "../../@core/components/react-toast/ReactToast"

export class AuthApi {
  static userRegister = async (values) => {
    try {
      const res = await axiosInstace.post("/signup", values);
      if (res.data.status === 1) {
        return {
          error: false,
          success: true,
          data: res?.data?.data ? res?.data?.data : res?.data,
        };
      }
      return {
        error: false,
        success: false,
        data: res?.data?.data ?? res?.data,
      };
    } catch (err) {
      console.log("Something went wrong", err);
      return {
        error: true,
        errors: err?.response?.data?.message,
      };
    }
  };

  static changePassword = async (values) => {
    try {
      const res = await axiosInstace.post("/change-password", values);

      if (res.data.status === 1) {
        return {
          error: false,
          success: true,
          data: res?.data?.data ? res?.data?.data : res?.data,
        };
      }

      if (res.data.status === 1) {
        return {
          error: false,
          success: false,
          res: res.data,
        };
      }
      return {
        error: false,
        success: false,
        data: res?.data?.data ?? res?.data,
      };
    } catch (err) {
      console.log("Something went wrong", err);
      return {
        error: true,
        errors: err?.response?.data?.message,
      };
    }
  };

  static deactivateAccount = async () => {
    try {
      const res = await axiosInstace.post("/deactivate-account");

      if (res?.data?.status === 1) {
        return {
          error: false,
          success: true,
          data: null,
        };
      }
      return {
        error: false,
        success: false,
        data: null,
      };
    } catch (err) {
      console.log("Something went wrong", err);
      return {
        error: true,
        errors: err?.response?.data?.message,
      };
    }
  };

  static activateAccount = async () => {
    try {
      const res = await axiosInstace.get("/activate-account");

      if (res?.data?.status === 1) {
        return {
          error: false,
          success: true,
          data: null,
        };
      }
      return {
        error: false,
        success: false,
        data: null,
      };
    } catch (err) {
      console.log("Something went wrong", err);
      return {
        error: true,
        errors: err?.response?.data?.message,
      };
    }
  };

  static logout = () => {
    localStorage.clear();
  };
}

export class GoogleSignUpApi {
  static userGoogleRegister = async (values) => {
    try {
      const res = await axiosInstace.post("/google_signup", values);

      if (res.data.status === 1) {
        return {
          error: false,
          success: true,
          data: res?.data?.data ? res?.data?.data : res?.data,
        };
      }
      return {
        error: false,
        success: false,
        data: res?.data?.data ?? res?.data,
      };
    } catch (err) {
      ReactToast({ message: err.response.data.message, error: true })
      return {
        error: true,
        errors: err?.response?.data?.message,
      };
    }
  };

  static logout = () => {
    localStorage.clear();
  };
}

