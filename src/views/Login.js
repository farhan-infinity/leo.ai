// ** React Imports
import React, {  useState } from "react";
import ClatterLogo from "@src/assets/images/logo/Leo-logo-full.png";
import Clatterdark from "@src/assets/images/logo/Leo-Logo-02.png";
// ** React Imports
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSkin } from "@hooks/useSkin";
// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";
import ImgeLogo from "../../src/assets/images/avatars/Login-sectionsWHITE3.jpg";
import authPosterForDarkLayout from "../../src/assets/images/pages/auth-poster-dark-layout.png";

// ** Reactstrap Imports

import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
  Spinner,
} from "reactstrap";
// ** Reactstrap Imports
import GoggleWithLogin from "./GoggleWithLogin";
// ** Styles
import { LoginApi } from "../helpers/api/loginApi";

import "@styles/react/pages/page-authentication.scss";
import { toast } from "react-hot-toast";

export const LoginUserValidationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").min(8, "Password must be at least 8 characters").required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate()
  // const source = skin === "dark" ? illustrationsDark : illustrationsLight;
  const { skin, setSkin } = useSkin();
  const [state, setState] = useState({
    userData: {},
    loadingUserData: false,
    formikValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    setState({ ...state, loadingUserData: true });
    const res = await LoginApi.login(values);
    if (res.success) {
      setState({ ...state, loadingUserData: false });
      location.replace("/");
    } else {
      navigate("/account-banned")
      setState({ ...state, loadingUserData: false });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginUserValidationSchema,
    onSubmit: handleSubmit,
  });

  const pull_data = (data) => {
    // toast.error(data)
    toast.error("Google login failed")
  };

  return (
    <>
      {/* <SubscriptionModal /> */}
      <div className="auth-wrapper login-page auth-basic px-2">
        <div className="auth-inner my-2">
          <div className="login-main-dev">
            <Card className="mb-0 login-content">
              <CardBody className="form-body">
                <Link
                  className="brand-logo"
                  to="/"
                  onClick={(e) => e.preventDefault()}
                >
                  <img
                    className="brand-full-logo"
                    style={{ height: "46px", width: "150px" }}
                    src={skin === "dark" ? Clatterdark : ClatterLogo}
                    alt="logo"
                  />
                </Link>
                <CardTitle tag="h4" className="mb-1">
                  Welcome to Leo! 👋
                </CardTitle>
                <CardText className="mb-2">
                  Please sign-in to your account and start the adventure
                </CardText>

                <Form className="auth-login-form mt-2">
                  <div className="mb-1">
                    <Label
                      className="form-label"
                      for="login-email"
                      placeholder="Enter Your email"
                      autoFocus
                    >
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="login-email"
                      placeholder="john@example.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      invalid={
                        formik.touched.email && formik.errors.email
                          ? true
                          : false
                      }
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <FormFeedback type="invalid">
                        {formik.errors.email}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-1">
                    <Label className="form-label" for="login-password">
                      Password
                    </Label>
                    <InputPasswordToggle
                      name="password"
                      className="input-group-merge"
                      id="login-password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      invalid={
                        formik.touched.password && formik.errors.password
                          ? true
                          : false
                      }
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <FormFeedback type="invalid">
                        {formik.errors.password}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="form-check mb-1">
                    <Input type="checkbox" id="remember-me" />
                    <div className="d-flex justify-content-between">
                      <Label className="form-check-label" for="remember-me">
                        Remember Me
                      </Label>

                      <Link to="/forgot-password">
                        <small className="d-flex justify-content-start">Forgot Password?</small>
                      </Link>
                    </div>
                  </div>
                  <Button
                    type="button"
                    color="primary"
                    block
                    disabled={state.loadingUserData}
                    onClick={() => formik.submitForm()}
                  >
                    Sign in
                    {state.loadingUserData && (
                      <spam style={{ marginLeft: "10px" }}>
                        <Spinner className="pl-200" size="sm" color="light" />
                      </spam>
                    )}
                  </Button>
                </Form>
                <p className="text-center mt-2">
                  <span className="me-25">New on our platform?</span>
                  <Link to="/register">
                    <span>Create an account</span>
                  </Link>
                </p>
                <div className="divider my-2">
                  <div className="divider-text">or</div>
                </div>
                <div className="auth-footer-btn d-flex flex-column gap-1 justify-content-center">
                  <GoggleWithLogin
                    func={pull_data}
                    buttonText="Login with Google"
                  />
                  <Button
                   style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "350px",
                    alignItems: "center",
                    border: "1px solid #dbdbdb",
                  }}
                  type="button"
                  color="primary"
                  block
                  onClick={() => navigate("/home")}
                  >Skip</Button>
                </div>
              </CardBody>
            </Card>
            <Card className="m-0 img-container">
              <img
                className="img"
                src={skin === "dark" ? authPosterForDarkLayout : ImgeLogo}
              />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
