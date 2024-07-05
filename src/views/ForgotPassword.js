// ** React Imports
import { Link } from 'react-router-dom'
import ClatterLogo from "../../src/assets/images/logo/Leo-logo-full.png";
import Clatterdark from "../../src/assets/images/logo/Leo-Logo-02.png";
// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/register-v2.svg";
import illustrationsDark from "@src/assets/images/pages/register-v2-dark.svg";
// ** Icons Imports
import { ChevronLeft } from "react-feather";
import axios from "axios";
// ** Custom Components

import InputPassword from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Button,
  FormFeedback,
  Spinner,
} from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom"
// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { toast } from 'react-hot-toast';
import CloseIcon from "../@core/assets/svg/cancelSvg"
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useEffect, useState } from 'react';
import { useSkin } from "@hooks/useSkin";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/actions/authAction';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const ForgotPassword = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { skin } = useSkin();
  const navigate = useNavigate()

  const { resetPassError, resetPassLoading } = useSelector(state => state.authUser)

  const validation = ({
    password: Yup.string()
      .matches(
        /^(?=.*[!@#$%^&*])(?=.*[0-9])/,
        "Password must include at least one special character and one number"
      )
      .min(8, "Password must be at least 8 characters")
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'New Passwords and Confirm password must match')
      .matches(
        /^(?=.*[!@#$%^&*])(?=.*[0-9])/,
        "Password must include at least one special character and one number"
      )
      .min(8, "Password must be at least 8 characters")
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',

    },
    validationSchema: Yup.object(validation),
    validateOnChange: false,
    onSubmit: (values, actions) => {
      actions.setFieldValue('password', values.password);
      const token = location.search.replace("?token=", "");
      let password = {
        password: values.password,
        path: "/login",
        token: token,
        navigate
      }
      dispatch(resetPassword(password))
      actions.setSubmitting(false)
      actions.resetForm()
    }
  });

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <CardBody className="px-0">
              <img
                className="brand-full-logo"
                src={skin === "dark" ? Clatterdark : ClatterLogo}
                alt="logo"
              />
            </CardBody>
            <CardTitle tag='h4' className='mb-1'>
              Reset Password 🔒
            </CardTitle>
            <CardText className='mb-2'>Your new password must be different from previously used passwords</CardText>
            <Form className='auth-reset-password-form mt-2' onSubmit={formik.handleSubmit}>
              <div className='mb-1'>
                <Label className='form-label' for='password'>
                  New Password
                </Label>
                <InputPassword
                  className='input-group-merge'
                  id='password'
                  autoFocus
                  {...formik.getFieldProps('password')}
                  onChange={formik.handleChange('password')}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.password &&
                    formik.errors.password ? true : false}
                />
                {formik.touched.password && formik.errors.password ? (
                  <FormFeedback type="invalid">
                    {formik.errors.password}
                  </FormFeedback>
                ) : null}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='confirm-password'>
                  Confirm Password
                </Label>
                <InputPassword
                  className='input-group-merge'
                  id='confirm-password'
                  {...formik.getFieldProps('confirmPassword')}
                  onChange={formik.handleChange('confirmPassword')}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? true : false}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <FormFeedback type="invalid">
                    {formik.errors.confirmPassword}
                  </FormFeedback>
                ) : null}
              </div>
              <div className='mb-1'>
                <FormFeedback type="invalid">
                  {resetPassError}
                </FormFeedback>
              </div>

              <Button
                disabled={resetPassLoading !== 'idle' ? true : false}
                type='submit'
                color='primary'
                style={{ padding: "15px 30px", borderRadius: "15px", display: "flex", gap: "10px", width: "100%", justifyContent: "center", alignItems: "center" }}>
                <span >Set New Password</span>
                {resetPassLoading !== 'idle' ?
                  <Spinner style={{
                    height: '1rem',
                    width: '1rem'
                  }}
                  />
                  : null}
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <Link to='/login'>
                <ChevronLeft className='rotate-rtl me-25' size={14} />
                <span className='align-middle'>Back to login</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ForgotPassword;
