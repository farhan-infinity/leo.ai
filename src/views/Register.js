// ** React Imports
import React, { useEffect, useState } from "react";
import ClatterLogo from "../../src/assets/images/logo/Leo-logo-full.png";
import Clatterdark from "../../src/assets/images/logo/Leo-Logo-02.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImgeLogo from "../../src/assets/images/avatars/Login-sectionsWHITE3.jpg";
import authPosterForDarkLayout from "../../src/assets/images/pages/auth-poster-dark-layout.png";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Col,
  CardBody,
  Card,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";


// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { PhoneInput } from "react-contact-number-input";
// ** Demo Components
import { useFormik } from "formik";
import * as yup from "yup";
import { AuthApi } from "../helpers/api/AuthApi";
import GoggleWithLogin from "./GoggleWithLogin";

export const profileDetailsValidationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  userName: yup.string("Enter your username").required("Username is required"),
  firstName: yup
    .string("Enter your first name")
    .required("Firstname is required"),
  lastName: yup.string("Enter your last name").required("Last name is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[!@#$%^&*])(?=.*[0-9])/,
      "Password must include at least one special character and one number"
    )
    .required("Password is required"),
  termsConditions: yup.boolean()
    .oneOf([true], 'You must agree to the terms and conditions.')
    .required('You must agree to the terms and conditions.'),
  referencedBy: yup
    .string().notRequired()
});

const Register = () => {
  // ** Hooks
  const [registerError, setRegisterError] = useState(null);
  const { skin } = useSkin();
  const navigate = useNavigate();
  const location = useLocation()

  const [phoneNumber, setPhoneNumber] = useState({});
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleSubmit = async (values) => {
    const phonenumber = phoneNumber.countryCode + phoneNumber.phoneNumber;
    if (!phonenumber?.length) {
      setPhoneNumberError("Enter your phone number");
      return;
    }
    const data = { ...values, phoneNumber: phonenumber };
    const res = await AuthApi.userRegister(data);
    if (res?.success) {
      navigate("/login");
    } else {
      console.log(res.errors, "response");
      setRegisterError(res.errors);
    }
  };

  useEffect(() => {
    if (location.search !== "") {
      let string = location.search
      let modified_string = string.replace("?fpr=", "")
      // const finalString = modified_string.replace("&test_mode=1", "");
      formik.values.referencedBy = modified_string
    }
  }, [location])

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      termsConditions: false,
      referencedBy: ""
    },
    validationSchema: profileDetailsValidationSchema,
    onSubmit: handleSubmit,

    // console.log()
  });

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

            <div className="mb-1">
              <Label className="form-label" for="register-userName">
                Username
              </Label>
              <Input
                type="text"
                name="userName"
                id="register-userName"
                placeholder="Enter Your Username "
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={
                  formik.touched.userName && formik.errors.userName
                    ? true
                    : false
                }
              />
              {formik.touched.userName && formik.errors.userName ? (
                <FormFeedback type="invalid">
                  {formik.errors.userName}
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
                placeholder="example@gmail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur || registerError}
                invalid={
                  formik.touched.email && formik.errors.email || registerError !== null ? true : false
                }
              />
              {formik.touched.email && formik.errors.email ? (
                <FormFeedback type="invalid">
                  {formik.errors.email}
                </FormFeedback>
              ) : null}
            </div>
            <div className="mb-1">
              <Label className="form-label" for="register-userName">
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
              <Label className="form-label" for="register-userName">
                Last Name
              </Label>
              <Input
                type="text"
                name="lastName"
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
              <Label className="form-label" for="register-userName">
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
            {registerError !== null && (
              <div className="mb-1">
                <FormFeedback type="invalid">{registerError}</FormFeedback>
              </div>
            )}
            <div className="form-check mb-1">
              <Input
                type="checkbox"
                name="termsConditions"
                id="termsConditions"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                invalid={
                  formik.touched.termsConditions && formik.errors.termsConditions
                    ? true
                    : false
                }
              />
              {formik.touched.termsConditions && formik.errors.termsConditions ? (
                <FormFeedback type="invalid">
                  {formik.errors.termsConditions}
                </FormFeedback>
              ) : null}
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
                <GoggleWithLogin buttonText="Sign up with Google" />
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

export default Register;
// <div className="divider my-2">
// <div className="divider-text">or</div>
// </div>
// <div className="auth-footer-btn d-flex justify-content-center">
// <Button color="facebook">
//   <Facebook size={14} />
// </Button>
// <Button color="twitter">
//   <Twitter size={14} />
// </Button>
// <Button color="google">
//   <Mail size={14} />
// </Button>
// <Button className="me-0" color="github">
//   <GitHub size={14} />
// </Button>
// </div>
