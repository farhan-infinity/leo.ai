import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  FormFeedback,
  Label,
  Spinner,
  CardHeader,
  CardTitle,
  Card,
  CardBody,
} from "reactstrap";
import { useSkin } from "@hooks/useSkin";
import * as yup from "yup";
import { useFormik } from "formik";

import { AuthApi } from "../../helpers/api/AuthApi";

import { toast } from "react-hot-toast";
import ResponseCodes from "../../utility/enums/responseEnums";

import "../../views/account-settings/SecurityTabContent.scss";
import { ReactToast } from "../../@core/components/react-toast/ReactToast";

function SecurityTabContent() {
  const { skin, setSkin } = useSkin();
  const theming = `${skin === "dark" ? "#ffff" : "#177FFA"}`;
  const [state, setState] = useState({
    loading: false,
  });

  const formSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .required("Please Enter your old password")
      .min(4, "Old password length should be at least 4 characters"),
    password: yup
      .string("Enter your new password")
      .min(8, "New password must be at least 8 characters")
      .matches(
        /^(?=.*[!@#$%^&*])(?=.*[0-9])/,
        "New password must include at least one special character and one number"
      )
      .required("New password is required"),
    confirmPassword: yup
      .string("Enter your confirm password")
      .oneOf([yup.ref("password")], "Passwords do not match")
      .min(8, "Confirm password must be at least 8 characters")
      .matches(
        /^(?=.*[!@#$%^&*])(?=.*[0-9])/,
        "Password must include at least one special character and one number"
      )
      .required("Confirm password is required"),

  });

  const handleSubmit = async (values, action) => {
    setState({
      ...state,
      loading: true,
    });

    const udpatedValues = {
      password: values?.password,
      currentPassword: values?.currentPassword,
    };

    const res = await AuthApi.changePassword(udpatedValues);

    if (res.success) {
      ReactToast({ message: "Password updated successfully!", error: false })
      setState({
        ...state,
        loading: false,
      });
      action.setSubmitting(true)
      action.resetForm();
      return;
    }

    if (
      !res.success &&
      res?.data?.response_code === ResponseCodes.invalidPassword
    ) {
      ReactToast({ message: res.message, error: true })
      setState({
        ...state,
        loading: false,
      });
      return;
    } else {
      ReactToast({ message: res.errors, error: true })
    }
    setState({
      ...state,
      loading: false,
    });
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
    validateOnBlur: false,
  });

  return (
    <>
      {/* <div className="custom-card-5 dark-theme-custom-card-5"> */}
      {/* <div className="profile-content" style={{ color: `${theming}` }}> */}
      <Card className="child-card dark-theme-child-card h-100 w-100">
        <CardHeader>
          <CardTitle tag="h4" style={{ color: `${theming}` }}>
            Security
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={formik.handleSubmit}>
            <div className="input-content">
              <Row>
                <Col sm="12" md={6} className="mb-1">
                  <Label className="form-label" for="currentPassword">
                    Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    placeholder="Current Password"
                    name="currentPassword"
                    type="password"
                    className="input-child form-control"
                    // value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={formik.touched.currentPassword &&
                      formik.errors.currentPassword ? true : false}
                  />
                  {formik.touched.currentPassword && formik.errors.currentPassword ? (
                    <FormFeedback type="invalid">
                      {formik.errors.currentPassword}
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={6} className="mb-1">
                  <Label className="form-label" for="newPassword">
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    name="password"
                    placeholder="New Password"
                    type="password"
                    className="input-child form-control"
                    // value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={formik.touched.password &&
                      formik.errors.password ? true : false}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <FormFeedback type="invalid">
                      {formik.errors.password}
                    </FormFeedback>
                  ) : null}
                </Col>

                <Col sm="12" md={6} className="mb-1">
                  <Label className="form-label" for="confirmPassword">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    className="input-child"
                    type="password"
                    // value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={formik.touched.confirmPassword &&
                      formik.errors.confirmPassword ? true : false}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <FormFeedback type="invalid">
                      {formik.errors.confirmPassword}
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>
            </div>
            <div className="list-content" style={{ color: `${theming}` }}>
              <ul>
                <li>Minimum 8 characters long - the more, the better</li>
                <li>At least one lowercase character</li>
                <li>At least one number, symbol, or whitespace character</li>
              </ul>
            </div>
            <div className="btn-content w-100 d-flex gap-2">
              <div>
                <Button
                  type="submit"
                  className="px-4 py-1 d-flex gap-1"
                  style={{ borderRadius: "20px" }}
                  color="primary"
                  disabled={state.loading}
                >
                  <span>Submit</span>
                  {state.loading ? (
                    <span>
                      <Spinner size="sm" color="light" />
                    </span>
                  ) : null}
                </Button>
              </div>
              <div>
                <Button
                  type="reset"
                  className="px-4 py-1"
                  style={{ borderRadius: "20px" }}
                  color="secondary"
                  outline
                >
                  Reset
                </Button>
              </div>
            </div>
          </Form >
        </CardBody>
      </Card>

      {/* </div> */}

      {/* </div > */}
    </>
  );
}

export default SecurityTabContent;
