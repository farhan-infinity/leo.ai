import { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "./Firebase";
import { AuthApi, GoogleSignUpApi } from "../helpers/api/AuthApi";

const GoogleSignUp = () => {
  const [signInWithGoogle, user] = useSignInWithGoogle(auth);
  const [referencedBy, setReferencedBy] = useState('')

  useEffect(() => {
    onResponseSignup(user);
  }, [user]);

  useEffect(() => {
    if (location.search !== "") {
      let string = location.search
      let modified_string = string.replace("?fpr=", "")
      setReferencedBy(modified_string)
    } else {
      setReferencedBy(null)
    }
  }, [location])

  const onResponseSignup = async (user) => {
    console.log({ user });
    if (user) {
      const body = {
        username: (
          user._tokenResponse.firstName + user._tokenResponse.lastName
        ).toLowerCase(),
        email: user.user.email,
        password: user.user.uid,
        firstname: user._tokenResponse.firstName,
        lastname: user._tokenResponse.lastName,
        phonenumber: user.user?.phoneNumber,
        referencedBy: referencedBy,
        typeOfUser: "google_user",
      };

      const res = await GoogleSignUpApi.userGoogleRegister(body);

      console.log({ res });
      if (res.success) {
        location.replace("/login");
        toast.success("sign up successfully");
      } else {
        toast.error("something went wrong");
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
            width: "350px",
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
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleSignUp;
