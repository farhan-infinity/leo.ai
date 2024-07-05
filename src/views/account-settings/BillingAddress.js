// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormFeedback,
  Spinner,
} from "reactstrap";
import { useSkin } from "@hooks/useSkin";

// ** Third Party Components
import Select from "react-select";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

import "../../views/account-settings/billingTabContent.scss";
import { useDispatch, useSelector } from "react-redux";
import { addBilling, getBillingAddress } from "../../redux/actions/billingAction";
import { useEffect, useState } from "react";
import EditSvg from "../document/svg/EditSvg";

const countryOptions = [
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United States", label: "United States" },
  { value: "France", label: "France" },
  { value: "Russia", label: "Russia" },
  { value: "Canada", label: "Canada" },
];

const BillingAddress = () => {
  const [formActive, setFormActive] = useState(true)
  const dispatch = useDispatch();
  const { billingData, billingDataLoading, billingDataError } = useSelector(state => state.billing)
  const { getBilling, getBillingLoading, getBillingError } = useSelector(state => state.billing)

  useEffect(() => {
    dispatch(getBillingAddress())
  }, [])

  useEffect(() => {
    if (billingData !== null && billingDataError === null) {
      setFormActive(true)
    }
  }, [billingData])

  useEffect(() => {
    if (getBilling?.data) {
      setValue("companyName", getBilling?.data?.companyName)
      setValue("billingEmail", getBilling?.data?.billingEmail)
      setValue("billingAddress", getBilling?.data?.billingAddress)
      setValue("billingState", getBilling?.data?.billingState)
      setValue("zipCodeAddress", getBilling?.data?.zipCodeAddress)
      setValue("phoneNumber", getBilling?.data?.phoneNumber)
      setValue("vatNumber", getBilling?.data?.vatNumber)
      setValue("taxId", getBilling?.data?.taxId)
      setValue("country", getBilling?.data?.country ? [{ label: getBilling?.data?.country, value: getBilling?.data?.country }] : [])
    }
  }, [getBilling])
  // ** Hooks
  const {
    register,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: "",
      billingEmail: "",
      billingAddress: "",
      billingState: "",
      zipCodeAddress: "",
      phoneNumber: "",
      vatNumber: "",
      taxId: "",
      country: "",
    }
  });
  const { skin, setSkin } = useSkin();
  const theming = `${skin === "dark" ? "#ffff" : "#177FFA"}`;

  const onSubmit = (data) => {
    let formData = new FormData()
    formData.append("companyName", data.companyName);
    formData.append("billingEmail", data.billingEmail)
    formData.append("billingAddress", data.billingAddress)
    formData.append("billingState", data.billingState)
    formData.append("zipCodeAddress", data.zipCodeAddress)
    formData.append("phoneNumber", data.phoneNumber)
    formData.append("vatNumber", data.vatNumber)
    formData.append("taxId", data.taxId)
    formData.append("country", data.country.value)
    dispatch(addBilling(formData))
    if (Object.values(data).every((field) => field.length > 0)) {
      return null;
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  return (
    <Card className="custom-card-5 dark-theme-custom-card-5 h-100 w-100" style={{ boxShadow: "none" }}>
      <CardHeader>
        <CardTitle tag="h4" style={{ color: `${theming}` }}>
          <div onClick={() => setFormActive(!formActive)} className="cursor-pointer" style={{ display: "flex", gap: "15px", justifyContent: "center", alignContent: "center", alignItems: "center", textAlign: "center" }}>
            <span>Billing Address</span>
            <EditSvg />
          </div>
        </CardTitle>
      </CardHeader>

      <CardBody className="my-2 py-50 p-0">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="custom-card-5 dark-theme-custom-card-5">
            <Row>
              <Col sm='12' md={6} xl={6} xxl={6} className="mb-2">
                <Label className="form-label" for="companyName">
                  Company
                </Label>
                <Controller
                  id="companyName"
                  control={control}
                  name="companyName"
                  render={({ field }) => (
                    <Input
                      disabled={formActive === true ? true : false}
                      placeholder="PIXINVENT"
                      className="input-child form-control"
                      {...register("companyName")}
                      onChange={(e) => setValue("companyName", e.target.value)}
                      invalid={errors.companyName && true}
                      {...field}
                    />
                  )}
                />
                {errors.companyName && (
                  <FormFeedback>Please enter a valid Company Name</FormFeedback>
                )}
              </Col>
              <Col sm='12' md={6} xl={6} xxl={6} className="mb-2">
                <Label className="form-label" for="billingEmail">
                  Email
                </Label>
                <Controller
                  id="billingEmail"
                  control={control}
                  name="billingEmail"
                  render={({ field }) => (
                    <Input
                      disabled={formActive === true ? true : false}
                      type="email"
                      placeholder="company@email.com"
                      className="input-child form-control"
                      {...register("billingEmail")}
                      onChange={(e) => setValue("billingEmail", e.target.value)}
                      invalid={errors.billingEmail && true}
                      {...field}
                    />
                  )}
                />
                {errors.billingEmail && (
                  <FormFeedback>
                    Please enter a valid Billing Email
                  </FormFeedback>
                )}
              </Col>
              <Col sm='12' md={6} xl={6} xxl={6} className="mb-2">
                <Label className="form-label" for="taxId">
                  TAX ID
                </Label>
                <Controller
                  id="taxId"
                  name="taxId"
                  control={control}
                  render={({ field }) => (
                    < Input
                      disabled={formActive === true ? true : false}
                      id="taxId"
                      name="taxId"
                      {...register("taxId")}
                      onChange={(e) => setValue("taxId", e.target.value)}
                      className="input-child form-control"
                      placeholder="Tax-6548"
                      invalid={errors.taxId && true}
                      {...field}
                    />
                  )}
                />

              </Col>
              <Col sm='12' md={6} xl={6} xxl={6} className="mb-2">
                <Label className="form-label" for="vatNumber">
                  Vat Number
                </Label>
                <Controller
                  id="vatNumber"
                  name="vatNumber"
                  control={control}
                  render={({ field }) => (
                    < Input
                      disabled={formActive === true ? true : false}
                      id="vatNumber"
                      name="vatNumber"
                      {...register("vatNumber")}
                      onChange={(e) => setValue("vatNumber", e.target.value)}
                      className="input-child form-control"
                      placeholder="#US1234567891012"
                      invalid={errors.vatNumber && true}
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col sm='12' md={6} xl={6} xxl={6} className="mb-2">
                <Label className="form-label" for="phoneNumber">
                  Phone Number
                </Label>
                <Controller
                  id="phoneNumber"
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <Cleave
                      disabled={formActive === true ? true : false}
                      id="phoneNumber"
                      className="input-child form-control"
                      placeholder="1 234 567 8900"
                      {...register("phoneNumber")}

                      onChange={(e) => setValue("phoneNumber", e.target.value)}
                      options={{ phone: true, phoneRegionCode: "US" }}
                      invalid={errors.phoneNumber && true}
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col sm='12' md={6} xl={6} xxl={6} className="mb-2">
                <Label className="form-label" for="country">
                  Country
                </Label>
                <Controller
                  id="country"
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select
                      isDisabled={formActive === true ? true : false}
                      id="country"
                      isClearable={false}
                      className="react-select dark-react-select"
                      classNamePrefix="select"
                      options={countryOptions}
                      {...register("country")}
                      theme={selectThemeColors}
                      invalid={errors.country && true}
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col sm='12' className="mb-2">
                <Label className="form-label" for="billingAddress">
                  Address
                </Label>
                <Controller
                  id="billingAddress"
                  name="billingAddress"
                  control={control}
                  render={({ field }) => (
                    <Input
                      disabled={formActive === true ? true : false}
                      id="billingAddress"
                      name="billingAddress"
                      {...register("billingAddress")}
                      onChange={(e) => setValue("billingAddress", e.target.value)}
                      className="input-child form-control"
                      placeholder="12, Business Park"
                      invalid={errors.billingAddress && true}
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col sm='12' md={6} xl={6} xxl={6} className="mb-2">
                <Label className="form-label" for="billingState">
                  State
                </Label>
                <Controller
                  id="billingState"
                  name="billingState"
                  control={control}
                  render={({ field }) => (
                    <Input
                      disabled={formActive === true ? true : false}
                      id="billingState"
                      name="state"
                      {...register("billingState")}
                      onChange={(e) => setValue("billingState", e.target.value)}
                      className="input-child form-control"
                      placeholder="California"
                      invalid={errors.billingState && true}
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col sm='12' md={6} xl={6} xxl={6} className="mb-2">
                <Label className="form-label" for="zipCodeAddress">
                  Zip Code
                </Label>
                <Controller
                  id="zipCodeAddress"
                  name="zipCodeAddress"
                  control={control}
                  render={({ field }) => (
                    <Input
                      disabled={formActive === true ? true : false}
                      type="text"
                      id="zipCodeAddress"
                      {...register("zipCodeAddress")}
                      onChange={(e) => setValue("zipCodeAddress", e.target.value)}
                      name="zipCodeAddress"
                      className="input-child form-control"
                      placeholder="123456"
                      maxLength="6"
                      invalid={errors.zipCodeAddress && true}
                      {...field}
                    />
                  )}
                />
              </Col>
              {!formActive && (
                <Col sm='12' md={6} xl={6} xxl={6} className="d-flex justify-content-md-start justify-content-center">
                  <Button
                    disabled={billingDataLoading !== 'idle' ? true : false}
                    type="submit"
                    className="save-button"
                    style={{ borderRadius: "15px" }}
                    color="primary"
                  >
                    <div className="d-flex gap-1">
                      <span>Save</span>
                      {billingDataLoading !== 'idle' && (
                        <Spinner style={{ width: "1rem", height: "1rem" }} />
                      )}
                    </div>
                  </Button>
                  <Button
                    style={{ borderRadius: "15px" }}
                    disabled={billingDataLoading !== 'idle' ? true : false}
                    color="secondary"
                    className="discard-cancel-btn"
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
    </Card>
  );
};

export default BillingAddress;
