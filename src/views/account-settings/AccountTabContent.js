// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import Select from "react-select";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback,
} from "reactstrap";
import { useSkin } from "@hooks/useSkin";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Demo Components
import DeleteAccount from "./DeleteAccount";
import Avatar from "@components/avatar";
import { SettingsApi } from "../../helpers/api/SettingsApi";
import ComponentSpinner from "../../@core/components/spinner/Loading-spinner";
import { useFormik } from "formik";
import "../../views/account-settings/accountTabContent.scss";
import * as yup from "yup";
import { ReactToast } from "../../@core/components/react-toast/ReactToast";
import convertToBase64 from "../../helpers/convert";
import EditSvg from "../document/svg/EditSvg";


const countryOptions = [
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United States", label: "United States" },
  { value: "France", label: "France" },
  { value: "Russia", label: "Russia" },
  { value: "Canada", label: "Canada" },
];

const languageOptions = [
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Dutch", label: "Dutch" },
];

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
  phoneNumber: yup.string("Enter your phone number").required("Phone number is required"),
  companyName: yup.string().notRequired(),
  profileImage: yup.string().notRequired(),
  address: yup.string().notRequired(),
  state: yup.string().notRequired(),
  zipCode: yup.string().notRequired(),
  country: yup.string().notRequired(),
  language: yup.string().notRequired()
});

const AccountTabs = ({ data }) => {

  // ** Hooks
  const [avatar, setAvatar] = useState(data.avatar ? data.avatar : "");
  const [profileImageState, setProfileImageState] = useState(null)
  const [formActive, setFormActive] = useState(true);
  const [loader, setLoader] = useState(false)
  const { skin } = useSkin();
  const theming = `${skin === "dark" ? "#ffff" : "#177FFA"}`;


  const handleSubmit = async (values) => {
    setLoader(true)
    if ((typeof avatar) === 'object') {
      values = await Object.assign(values, { profileImage: avatar || '' })
    }

    const res = await SettingsApi.updateProfile(values);

    if (res.success) {
      setFormActive(true)
      getProfileData();
    } else {
      ReactToast({ message: res.error, error: true })
    }
    setLoader(false)
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      phoneNumber: "",
      profileImage: "",
      address: "",
      state: "",
      zipCode: "",
      country: "",
      language: "",
      countryInputs: [],
      languageInputs: []
    },
    validationSchema: profileDetailsValidationSchema,
    onSubmit: handleSubmit,
  });

  const getProfileData = async () => {
    setLoader(true)
    const data = await SettingsApi.getProfile();

    if (!data?.error) {

      formik.setValues({
        ...formik.values,
        userName: data?.data?.userName ?? "",
        firstName: data?.data?.firstName ?? "",
        lastName: data?.data?.lastName ?? "",
        email: data?.data?.email ?? "",
        phoneNumber: data?.data?.phoneNumber ?? "",
        profileImage: data?.data?.profileImage ?? "",
        companyName: data?.data?.companyName ?? "",
        address: data?.data?.address ?? "",
        state: data?.data?.state ?? "",
        zipCode: data?.data?.zipCode ?? "",
        country: data?.data?.country ?? "",
        language: data?.data?.language ?? "",
        countryInputs: data?.data?.country ? [{ value: data?.data?.country, label: data?.data?.country }] : "",
        languageInputs: data?.data?.language ? [{ value: data?.data?.language, label: data?.data?.language }] : ""
      });
      setLoader(false)
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const handleCountrySelect = (value) => {
    if (!value) {
      formik.values.countryInputs = []
      return
    }
    formik.handleChange('country')
    formik.getFieldProps('country')

    formik.values.country = value.value
    formik.values.countryInputs = [{ label: value.label, value: value.value }]
  }

  const handleLanguageSelect = (value) => {
    if (!value) {
      formik.values.languageInputs = []
      return
    }
    formik.handleChange('language')
    formik.getFieldProps('language')
    formik.values.language = value.value
    formik.values.languageInputs = [{ label: value.label, value: value.value }]
  }

  const onChange = async (e) => {
    formik.values.profileImage = ""
    const base64 = await convertToBase64(e.target.files[0])
    setAvatar(e.target.files[0]);
    setProfileImageState(base64)
  };

  const resetProfileImage = () => {
    if (avatar === "") {
      formik.values.profileImage = avatar
      setProfileImageState(avatar)
    } else {
      setAvatar("")
    }
  }


  return (
    <Fragment>
      <Card
        className="child-card dark-theme-child-card h-100 w-100">
        <CardHeader>
          <CardTitle tag="h4" style={{ color: `${theming}` }}>
            <div onClick={() => setFormActive(!formActive)} className="cursor-pointer" style={{ display: "flex", gap: "10px", justifyContent: "center", alignContent: "center", alignItems: "center", textAlign: "center" }}>
              <span>Profile Details</span>
              <EditSvg />
            </div>
          </CardTitle>
        </CardHeader>

        {loader ? (
          <CardBody className="py-4">
            <ComponentSpinner />
          </CardBody>
        ) : null}

        {!loader ? (
          <CardBody className="my-25 ">
            <div className="profile-component">
              <div className="me-25">
                <div
                  className="theme-button dark-theme-button avtar-bg-div h-100 w-100 p-0 d-flex align-items-center"
                  style={{ boxShadow: "none" }}
                >
                  <Avatar
                    initials
                    className="avatar-setting"
                    content={formik.values.userName}
                    img={formik.values.profileImage ? formik.values.profileImage : profileImageState}
                    contentStyles={{
                      borderRadius: 0,
                      fontSize: "calc(48px)",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#0000081 !important",
                      color: "#0000081 !important"
                    }}
                    style={{
                      margin: "5px",
                      backgroundColor: "#0000081 !important",
                      color: "#0000081 !important"
                    }}
                  />
                </div>
              </div>
              <div className="mt-70">
                <div className="d-flex justify-content-around gap-1">
                  <div htmlFor="inputFile" className="button-bg-div dark-button-bg-div">
                    <Label for="upload" style={{ background: "#177ffa", padding: "20px", marginTop: "5px", marginLeft: "5px", marginRight: "5px", borderRadius: "20px", cursor: "pointer" }}>
                      <div style={{ color: "white" }}>Upload Photo</div>
                      <input disabled={formActive === true ? true : false} onChange={onChange} type="file" id="upload" style={{ display: "none" }} />
                    </Label>
                  </div>
                  <div className="button-bg-div dark-button-bg-div">
                    <Button disabled={formActive === true ? true : false} onClick={() => resetProfileImage()} type="profileImage-reset" color="secondary" className="px-3 py-2 reset-button">
                      Reset
                    </Button>
                  </div>

                </div>
                <p className="mt-1">
                  Allowed JPG or PNG. Max size of 800kB
                </p>

              </div>
            </div>
            <Form className="mt-2 pt-50">
              <div className="input-content dark-input-content">
                <Row>
                  <Col sm="12" md={6} className="mb-2">
                    <Label>User Name</Label>
                    <Input
                      disabled={formActive === true ? true : false}
                      id="userName"
                      placeholder="John_Doe"
                      name="userName"
                      className="input-child form-control"
                      defaultValue={formik.values.userName ?? ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      invalid={formik.touched.userName &&
                        formik.errors.userName ? true : false}
                    />
                    {formik.touched.userName && formik.errors.userName ? (
                      <FormFeedback type="invalid">
                        {formik.errors.userName}
                      </FormFeedback>
                    ) : null}
                  </Col>

                  <Col sm="12" md={6} className="mb-2">
                    <Label>First Name</Label>
                    <Input
                      disabled={formActive === true ? true : false}
                      id="firstName"
                      placeholder="John"
                      name="firstName"
                      className="input-child form-control"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      invalid={formik.touched.firstName &&
                        formik.errors.firstName ? true : false}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <FormFeedback type="invalid">
                        {formik.errors.firstName}
                      </FormFeedback>
                    ) : null}
                  </Col>

                  <Col sm="12" md={6} className="mb-2">
                    <Label>Last Name</Label>
                    <Input
                      disabled={formActive === true ? true : false}
                      id="lastName"
                      placeholder="Doe"
                      name="lastName"
                      className="input-child form-control"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      invalid={formik.touched.lastName &&
                        formik.errors.lastName ? true : false}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <FormFeedback type="invalid">
                        {formik.errors.lastName}
                      </FormFeedback>
                    ) : null}
                  </Col>

                  <Col sm="12" md={6} className="mb-2">
                    <Label>Email</Label>
                    <Input
                      disabled
                      id="emailInput"
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="input-child form-control"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      invalid={formik.touched.email &&
                        formik.errors.email ? true : false}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <FormFeedback type="invalid">
                        {formik.errors.email}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col sm="12" md={6} className="mb-2">
                    <Label>Company Name</Label>
                    <Input
                      disabled={formActive === true ? true : false}
                      id="companyName"
                      name="companyName"
                      placeholder="Company Name"
                      className="input-child form-control"
                      value={formik.values.companyName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      invalid={formik.touched.companyName &&
                        formik.errors.companyName ? true : false}
                    />
                    {formik.touched.companyName && formik.errors.companyName ? (
                      <FormFeedback type="invalid">
                        {formik.errors.companyName}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col sm="12" md={6} className="mb-2">
                    <Label>Phone Number</Label>
                    <Cleave
                      disabled={formActive === true ? true : false}
                      id="phoneNumber"
                      name="phoneNumber"
                      className="input-child form-control"
                      placeholder="1 234 567 8900"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      options={{ phone: true, phoneRegionCode: "US" }}
                      invalid={formik.touched.phoneNumber &&
                        formik.errors.phoneNumber ? true : false}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                      <FormFeedback type="invalid">
                        {formik.errors.phoneNumber}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col sm="12" md={6} className="mb-2">
                    <Label>Address</Label>
                    <Input
                      disabled={formActive === true ? true : false}
                      id="address"
                      name="address"
                      placeholder="12, Business Park"
                      className="input-child form-control"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      invalid={formik.touched.address &&
                        formik.errors.address ? true : false}
                    />

                    {formik.touched.address && formik.errors.address ? (
                      <FormFeedback type="invalid">
                        {formik.errors.address}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col sm="12" md={6} className="mb-2">
                    <Label>State</Label>
                    <Input
                      disabled={formActive === true ? true : false}
                      id="accountState"
                      name="state"
                      placeholder="California"
                      className="input-child form-control"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      invalid={formik.touched.state &&
                        formik.errors.state ? true : false}
                    />
                    {formik.touched.state && formik.errors.state ? (
                      <FormFeedback type="invalid">
                        {formik.errors.state}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col sm="12" md={6} className="mb-2">
                    <Label>Zip Code</Label>
                    <Input
                      disabled={formActive === true ? true : false}
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      placeholder="123456"
                      maxLength="6"
                      className="input-child form-control"
                      value={formik.values.zipCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      invalid={formik.touched.zipCode &&
                        formik.errors.zipCode ? true : false}
                    />
                    {formik.touched.zipCode && formik.errors.zipCode ? (
                      <FormFeedback type="invalid">
                        {formik.errors.zipCode}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col sm="12" md={6} className="mb-2">
                    <Label>Country</Label>
                    <Select
                      isDisabled={formActive === true ? true : false}
                      id="country"
                      isClearable={true}
                      className="react-select dark-react-select"
                      classNamePrefix="select"
                      options={countryOptions}
                      defaultValue={formik.values.countryInputs || ""}
                      onChange={(e) => handleCountrySelect(e)}
                      onBlur={formik.handleBlur}
                      theme={selectThemeColors}
                      invalid={formik.touched.country &&
                        formik.errors.country ? true : false}
                    />
                    {formik.touched.country && formik.errors.country ? (
                      <FormFeedback type="invalid">
                        {formik.errors.country}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col sm="12" md={6} className="mb-2">
                    <Label>Language</Label>
                    <Select
                      isDisabled={formActive === true ? true : false}
                      id="language"
                      isClearable={true}
                      className="react-select dark-react-select"
                      classNamePrefix="select"
                      options={languageOptions}
                      defaultValue={formik.values.languageInputs}
                      onChange={(e) => handleLanguageSelect(e)}
                      onBlur={formik.handleBlur}
                      theme={selectThemeColors}
                      invalid={formik.touched.language &&
                        formik.errors.language ? true : false}
                    />
                    {formik.touched.language && formik.errors.language ? (
                      <FormFeedback type="invalid">
                        {formik.errors.language}
                      </FormFeedback>
                    ) : null}
                  </Col>

                  {formActive === false && (
                    <Col className="mt-2" sm="12">
                      <Button
                        type="button"
                        className="me-1"
                        color="primary"
                        onClick={() => formik.submitForm()}
                      >
                        Save changes
                      </Button>
                      <Button
                        style={{ borderRadius: "20px", border: (skin === 'dark' ? "none !important" : "1px solid #177FFA !important") }}
                        color="secondary"
                        outline
                        onClick={() => setFormActive(true)}
                      >
                        Cancel
                      </Button>
                    </Col>
                  )}
                </Row>
              </div>
            </Form>
          </CardBody>
        ) : null}
      </Card>
      <DeleteAccount />
    </Fragment>
  );
};

export default AccountTabs;
