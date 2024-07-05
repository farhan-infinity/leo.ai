// ** React Imports
import React, { useState } from "react";
import ClatterLogo from "../../src/assets/images/logo/Leo-logo-full.png";
import Clatterdark from "../../src/assets/images/logo/Leo-Logo-02.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImgeLogo from "../../src/assets/images/avatars/Login-sectionsWHITE3.jpg";
import authPosterForDarkLayout from "../../src/assets/images/pages/auth-poster-dark-layout.png";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Card,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/register-v2.svg";
import illustrationsDark from "@src/assets/images/pages/register-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { PhoneInput } from "react-contact-number-input";
// ** Demo Components
import { useFormik } from "formik";
import * as yup from "yup";
import { AuthApi } from "../helpers/api/AuthApi";
import GoogleSignUp from "./GoogleSignUp";
import axiosInstace from "../helpers/api/axios";

export const profileDetailsValidationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  userName: yup.string("Enter your username").required("Username is required"),
  firstName: yup
    .string("Enter your firstname")
    .required("Firstname is required"),
  lastName: yup.string("Enter your username").required("Lastname is required"),

  password: yup.string("Enter your password").required("Password is required"),
});

const Subscribe = () => {
  // ** Hooks
  const [error, setError] = useState("");
  const { skin } = useSkin();
  const prams = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    userData: {},
    // loadingUserData: true,
    formikValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: " ",
    },
    // updatingProfile: false,
  });

  const [phoneNumber, setPhoneNumber] = useState({});
  const [phoneNumberError, setPhoneNumberError] = useState("");

  // const handleSubmit = async (values) => {
  //   console.log({ phoneNumber });
  //   const phonenumber = phoneNumber.countryCode + phoneNumber.phoneNumber;
  //   console.log(phonenumber);
  //   if (!phonenumber?.length) {
  //     setPhoneNumberError("Enter your phonenumber");
  //     return;
  //   }

  //   const data = { ...values, phonenumber: phonenumber };

  //   console.log({ data });
  //   const resp = await AuthApi.userRegister(data);
  //   console.log({ resp });
  //   if (resp?.success) {
  //     navigate("/login");
  //   } else {
  //     setError(resp.errors);
  //   }
  // };
  const handleSubmit = async (values) => {
    console.log({ values });
    const phonenumber = phoneNumber.countryCode + phoneNumber.phoneNumber;
    if (!phonenumber?.length) {
      setPhoneNumberError("Enter your phonenumber");
      return;
    }
    const data = { ...values, phonenumber: phonenumber };
    const res = await AuthApi.userRegister(data);
    console.log({ res });
    if (res?.success) {
      localStorage.setItem("tempToken", res.data.tempToken);
      // setSup(true);
      // setIsPlan(false);
      stripePayment(values);

      //   navigate("/login");
    } else {
      console.log(res.errors, "response");
      setError(res.errors);
    }
  };

  const stripePayment = (data) => {
    console.log("data", data);
    axiosInstace
      .post("/subscribe", {
        name: data?.username,
        email: data.email,
        paymentMethod: "pm_card_visa",
        plan: prams.plan,
      })
      .then(function (response) {
        // console.log(response.data);
        // localStorage.setItem("token", response.data.token);

        console.log(response.data.clientSecret);
        window.open(response.data.clientSecret);

        // if (response.status) {
        //   setSup(true);
        //   setIsPlan(false);
        // }

        // navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: " ",
      phoneNumber: "",
    },
    validationSchema: profileDetailsValidationSchema,
    onSubmit: handleSubmit,

    // console.log()
  });

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  return (
    <div className="register-maim-dev register-page">
      <Card className="register-card m-0">
        <Col xs="10" sm="10" md="10" lg="10">
          <CardBody className="px-0">
            <img
              className="brand-full-logo"
              src={skin === "dark" ? Clatterdark : ClatterLogo}
              alt="logo"
            />
          </CardBody>

          <div className="auth-register-form mt-2">
            {error ? (
              <div
                style={{
                  color: "red",
                  margin: "auto",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {error}
              </div>
            ) : null}
            <div className="mb-1">
              <Label className="form-label" for="register-username">
                Username
              </Label>
              <Input
                type="text"
                name="username"
                id="register-username"
                placeholder="Enter Your Username "
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={
                  formik.touched.username && formik.errors.username
                    ? true
                    : false
                }
              />
              {formik.touched.username && formik.errors.username ? (
                <FormFeedback type="invalid">
                  {formik.errors.username}
                </FormFeedback>
              ) : null}
            </div>
            <div className="mb-1">
              <Label className="form-label" for="register-email">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="register-email"
                placeholder="test@gmail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={
                  formik.touched.email && formik.errors.email ? true : false
                }
              />
              {formik.touched.email && formik.errors.email ? (
                <FormFeedback type="invalid">
                  {formik.errors.email}
                </FormFeedback>
              ) : null}
            </div>
            <div className="mb-1">
              <Label className="form-label" for="register-firstName">
                First Name
              </Label>
              <Input
                type="text"
                name="firstName"
                id="register-firstName"
                placeholder="Enter Your First Name"
                autoFocus
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="register-lastName">
                Last Name
              </Label>
              <Input
                type="text"
                name="lastname"
                id="register-lastName"
                placeholder="Enter Your Last Name"
                autoFocus
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="register-password">
                Password
              </Label>

              <InputPasswordToggle
                className="input-group-merge"
                name="password"
                id="register-password"
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
            <div className="mb-1">
              <Label className="form-label" for="phone-number">
                Phone Number
              </Label>

              <PhoneInput
                disabled={false}
                containerClass="phone-number"
                countryCode="us"
                onChange={(e) => setPhoneNumber(e)}
                placeholder="Enter Mobile Number"
              />
              {phoneNumberError ? (
                <FormFeedback type="invalid">{phoneNumberError}</FormFeedback>
              ) : null}
            </div>
            <div className="form-check mb-1">
              <Input type="checkbox" id="terms" />
              <Label className="form-check-label" for="terms">
                I agree to
                <a
                  className="ms-25"
                  href="/"
                  onClick={(e) => e.preventDefault()}
                >
                  privacy policy & terms
                </a>
              </Label>
            </div>
            <Button
              type="button"
              tag={Link}
              color="primary"
              block
              onClick={() => formik.submitForm()}
            >
              Sign up
            </Button>
            <p className="text-center mt-2">
              <span className="me-25">Already have an account?</span>
              <Link to="/login">
                <span>Sign in instead</span>
              </Link>
            </p>
            <div className="divider my-1">
              <div className="divider-text">or</div>
              <div className="auth-footer-btn d-flex justify-content-center">
                <GoogleSignUp />
              </div>
            </div>
          </div>
        </Col>
      </Card>
      <Card className="m-0 img-container">
        <img
          className="img"
          src={skin === "dark" ? authPosterForDarkLayout : ImgeLogo}
        />
      </Card>
    </div>
  );
};

export default Subscribe;
