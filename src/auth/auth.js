import jwtDecode from "jwt-decode";

export class AuthHelpers {
  static signout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
  };

  static getAccessToken = () => {
    if (localStorage.getItem("token")) return localStorage.getItem("token");

    return null;
  };

  static isUserLoggedIn = () => {
    return true
    // const accessToken = this.getAccessToken();

    // if (accessToken) {
    //   try {
    //     const decodedToken = jwtDecode(accessToken);
    //     const expiresTime = (decodedToken?.exp || 0) * 1000;

    //     return expiresTime > new Date().getTime();
    //   } catch (e) {
    //     return false;
    //   }
    // } else {
    //   return false;
    // }
  };

  static checkUserStatus = () => {
    const userData = JSON.parse(localStorage.getItem("user_data"))
    if (userData && userData.status) {
      let status = userData.status
      return status
    } else {
      return null
    }
  }
}
