import { useEffect, useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "./Firebase";

import { GoogleLoginApi, LoginApi } from "../helpers/api/loginApi";
import { GoogleSignUpApi } from "../helpers/api/AuthApi";
import { ReactToast } from "../@core/components/react-toast/ReactToast";

const GoggleWithLogin = ({ func, buttonText }) => {
  const [signInWithGoogle, user] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (!user) return;
    onResponseSignup(user);
  }, [user]);

  const onResponseSignup = async (user) => {
    if (user) {

      const body = {
        userName: user?.user?.displayName,
        email: user?.user?.email,
        password: user?.user?.uid,
        isEmailVerified: user?.user?.emailVerified,
        phoneNumber: user?.user?.phoneNumber,
        profileImage: user?.user?.photoURL,
        firstName: user?._tokenResponse?.firstName,
        lastName: user?._tokenResponse?.lastName,
      };
      if (buttonText === "Sign up with Google") {

        const res = await GoogleSignUpApi.userGoogleRegister(body)
        if (res.success) {
          let values = {
            email: user?.user?.email,
            password: user?.user?.uid,
          }
          const loginRes = await LoginApi.login(values)
          if (loginRes.success) {
            location.replace("/");
          } else {
            ReactToast({ message: "Please Retry after couple of minutes", error: true })
          }
        }
      } else {
        const res = await GoogleLoginApi.googlelogin(body);
        if (res.success) {
          location.replace("/");
        }
      }
    }
  };

  return (
    <div className="App">
      <div>
        <button
          className="btn btn-lg btn-block google-auth-btn"
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
            border: "1px solid #dbdbdb",
          }}
          onClick={() => signInWithGoogle()}
        >
          <img
            src={"https://i.ibb.co/wSpBp68/Google-G-Logo-1.png"}
            className="me-2"
            style={{ width: "30px", height: "30px" }}
          ></img>{" "}
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default GoggleWithLogin;
