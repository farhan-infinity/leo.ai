import axios from "axios";
import axiosInstace from "./axios";
import { ReactToast } from "../../@core/components/react-toast/ReactToast";

export class SettingsApi {
  static getDashboardData = async () => {
    try {
      const res = await axiosInstace.get("/dashboard");
    } catch (err) {
      console.log("Something went wrong");
    }
  };

  static getProfile = async () => {
    try {
      const res = await axiosInstace.get("/user-profile");

      return {
        error: false,
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

  static updateProfile = async (values) => {
    try {
      let formData = new FormData();
      formData.append("firstName", values.firstName)
      formData.append("lastName", values.lastName)
      formData.append("email", values.email)
      formData.append("userName", values.userName)
      formData.append("profileImage", values.profileImage)
      formData.append("companyName", values.companyName)
      formData.append("phoneNumber", values.phoneNumber)
      formData.append("address", values.address)
      formData.append("state", values.state)
      formData.append("zipCode", values.zipCode)
      formData.append("country", values.country)
      formData.append("language", values.language)

      const res = await axiosInstace.patch("/update-user-profile", formData);

      if (res.data.status == 1) {
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
      ReactToast({ message: err.message ? err.message : err.errors, error: true })
      return {
        error: true,
        errors: err,
      };
    }
  };
}
