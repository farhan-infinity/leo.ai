// ** React Imports
import { Fragment, useState, useEffect } from "react";
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Badge,
  Alert,
  Modal,
  Input,
  Button,
  CardBody,
  Progress,
  CardTitle,
  ModalBody,
  CardHeader,
  ModalHeader,
} from "reactstrap";
import { useSkin } from "@hooks/useSkin";

// ** Demo Components
// import PricingCard from "@src/views/pages/pricing/PricingCards";

// ** Third Party Components
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Styles
import "@styles/base/pages/page-pricing.scss";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";
import axiosInstace from "../../helpers/api/axios";
import { useNavigate } from "react-router";
import moment from "moment";
import { SubscriptionModal } from "../../subscription-modal/SubscriptionModal";

const MySwal = withReactContent(Swal);

const BillingCurrentPlan = () => {
  const { skin, setSkin } = useSkin();
  const theming = `${skin === "dark" ? "#ffff" : "#177FFA"}`;
  const background = `${skin === "dark" ? "#0000" : "#EDF5FF"}`;
  // ** States
  const [show, setShow] = useState(false);

  const [plan, setPlan] = useState([]);
  const [planModel, setPlanModel] = useState(true);

  const localData = JSON.parse(localStorage.getItem("user_data"));

  const navigate = useNavigate();

  const handleConfirmCancel = async () => {
    return MySwal.fire({
      title: "",
      text: "Are you sure you would like to cancel your subscription?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",

      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: "Unsubscribed!",
          text: "Your subscription cancelled successfully.",
          confirmButton: cancelSubscription(),
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Unsubscription Cancelled!!",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  useEffect(() => {
    getPlan();
  }, []);

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  async function getPlan() {
    axiosInstace
      .get("/active-subscription", axiosConfig)
      .then(function (response) {
        if (response.data.susbcription === "cancelled") {
          setPlanModel(false)
        } else if (response.data.data !== null) {
          setPlan(response.data.data);
        } else {
          console.log("false", response.data.data);
          setPlanModel(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function cancelSubscription() {
    const data = {
      planId: plan?._id,
      userId: localData?._id,
    };
    axiosInstace
      .post("/cancel-subscription", data, axiosConfig)
      .then(function (response) {
        console.log(response, "cancel");
        setPlanModel(false);
        if (response.data.status === 1) {
          location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const progressValue = (30 - plan?.remainingDays)
  console.log(progressValue)
  return (
    <Fragment>
      <SubscriptionModal setSubShow={setShow} subShow={show} />
      {planModel === true ? (
        <>
          <Card
            className="child-card dark-theme-child-card h-100 w-100"
            style={{ boxShadow: "none" }}
          >
            <CardHeader>
              <CardTitle tag="h4" style={{ color: `${theming}` }}>
                Current plan
              </CardTitle>
            </CardHeader>
            <CardBody className=" my-1 py-25">
              <Row>
                <Col sm="12" md={6}>
                  <div className="child-card dark-theme-inner-child-card w-100 h-100 p-2">
                    <div className="mb-2 mb-md-2 pb-50 ">
                      {plan?.plan?.name !== "Free Trial" ? (
                        <h5>
                          ${plan?.plan?.amount ?? 0} Per Month{" "}
                          <Badge color="light-primary" className="ms-50">
                            Popular
                          </Badge>
                        </h5>
                      ) : null}
                      <span></span>
                    </div>
                    <div className="mb-2 pb-50">
                      <h5>
                        Your Current Plan is <strong>{plan?.plan?.name}</strong>
                      </h5>
                    </div>
                    <div className="mb-2 pb-50">
                      <h5>
                        Active until {moment(plan?.subscription_ending_date).format("LL")}
                      </h5>
                      <span>
                        We will send you a notification upon Subscription
                        expiration
                      </span>
                    </div>

                    <div className="mb-2 mb-md-1">
                      <span style={{ color: `${theming}`, fontSize: "18px", fontWeight: '600' }}>
                        Billing cycle renews {plan?.remainingDays !== 0 ? `in ${plan?.remainingDays} days` : "today"}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col sm="12" md={6}>
                  <div className="child-card dark-theme-child-card w-100 h-100 p-2">
                    <div
                      className="child-card dark-theme-child-card h-100 w-100 p-2"
                      style={{ backgroundColor: `${background}` }}
                    >
                      <h4
                        className="alert-heading"
                        style={{ color: `${theming}` }}
                      >
                        Package Details
                      </h4>
                      <div
                        className="alert-body"
                        style={{ color: `${theming}` }}
                      >
                        your plan will be needing your attention!
                      </div>
                    </div>
                    <div className="plan-statistics pt-1">
                      {plan?.plan?.name !== "Free Trial" ? (
                        <div className="d-flex justify-content-between">
                          <h5 className="fw-bolder">Days</h5>
                          <h5 className="fw-bolder">{plan?.remainingDays} of 30 Days</h5>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-between">
                          <h5 className="fw-bolder">Days</h5>
                          <h5 className="fw-bolder">{plan?.remainingDays === 0 ? 1 : plan?.remainingDays} of 3 Days</h5>
                        </div>
                      )}
                      {plan?.plan?.name !== "Free Trial" ? (
                        <Progress className="mb-50" value={progressValue} />
                      ) : null}

                      {plan?.plan?.name !== "Free Trial" ? (
                        <p className="mt-50">
                          {plan?.remainingDays} days remaining until your plan requires update
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col sm="12" md={6} className="mt-2 d-flex justify-content-md-start justify-content-center">
                  <Button
                    color="primary"
                    className="save-button"
                    style={{ borderRadius: "15px" }}
                    onClick={() => setShow(true)}
                  >
                    Upgrade
                  </Button>
                  <Button
                    outline
                    color="danger"
                    style={{ borderRadius: "15px" }}
                    className="discard-cancel-btn"
                    onClick={handleConfirmCancel}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </>
      ) : null}
    </Fragment>
  );
};

export default BillingCurrentPlan;
