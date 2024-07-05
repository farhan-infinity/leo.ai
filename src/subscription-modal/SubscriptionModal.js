import React, { useEffect, useState } from "react";
import "../assets/scss/subscription-modal/subscriptionModal.scss";
import { Button } from "reactstrap";
import checkmark from "../../public/img/checkmark.svg"
import { LocalStorageHelpers } from "../helpers/localStoraga";
import axiosInstace from "../helpers/api/axios";
import { useDispatch, useSelector } from "react-redux";
import { subscriptionSelectorState } from "../redux/selectors/subscriptionSelector";
import CancelSvg from "./CancelSvg";
import { Modal, ModalBody } from "react-bootstrap";
import { subscriptionActions } from "../redux/subscription";
import { getUserData } from "../utility/Utils";
import { emptyTextErrorState } from "../redux/slices/CreationHubSlice";
import { emptyVideoErrorState } from "../redux/slices/createVideoSlice";

export const SubscriptionModal = () => {
  const dispatch = useDispatch()
  const userData = getUserData()
  const [billType, setBillType] = useState('monthly')
  const [state, setState] = useState({
    loading: false,
    loadingMessage: "Processing your subscription",
  });

  const { subscription_plans_modal } = useSelector((state) => state.subscription)

  const subscribePlan = ({ planSlug }) => {
    setState({
      ...state,
      loading: true,
    });
    const data = LocalStorageHelpers.getUserData();

    axiosInstace
      .post("/subscribe", {
        name: data?.username,
        email: data.email,
        paymentMethod: "pm_card_visa",
        plan: planSlug,
      })
      .then(function (response) {
        setState({
          ...state,
          loadingMessage: "Waiting for payment confirmation",
        });
        dispatch(
          subscriptionActions.updateModalState({
            subscription: !subscription_plans_modal,
          })
        );
        let upgrade = {
          upgradeModal: !subscription_plans_modal
        }
        localStorage.setItem("upgradeModal", JSON.stringify(upgrade))
        location.replace(response?.data?.clientSecret);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleShowModal = () => {
    dispatch(emptyTextErrorState())
    dispatch(emptyVideoErrorState())
    dispatch(
      subscriptionActions.updateModalState({
        subscription: !subscription_plans_modal,
      })
    );
    let upgrade = {
      upgradeModal: !subscription_plans_modal
    }
    localStorage.setItem("upgradeModal", JSON.stringify(upgrade))
  }

  const handleHideModal = () => {
    dispatch(emptyTextErrorState())
    dispatch(emptyVideoErrorState())
    dispatch(
      subscriptionActions.updateModalState({
        subscription: !subscription_plans_modal,
      })
    );
    let upgrade = {
      upgradeModal: !subscription_plans_modal
    }
    localStorage.setItem("upgradeModal", JSON.stringify(upgrade))
  }


  return (
    <Modal
      size="xl" style={{ maxWidth: "100vw !important" }}
      show={subscription_plans_modal}
      onHide={() => handleHideModal()}
    >
      <ModalBody>
        <div className="modal-container">
          <div className="subscriptionModal-all dark-subscriptionModal-all">
            {state.loading ? (
              <div className="full-screen-loader-container dark-full-screen-loader-container Subscribtion-text dark-Subscription-text">
                <p>{state.loadingMessage}</p>
                <p>Please wait...</p>
              </div>
            ) : null}
            <div className="subscriptionModal-second-bg-div dark-subscriptionModal-second-bg-div">
              <div className="text-center position-relative">
                {userData?.subscriptionStatus === "expired" ? (
                  <b className="Subscribtion-text dark-Subscription-text">
                    Your Subscribtion has been
                    <br />
                    Expired Please Update !
                  </b>
                ) : null}
                {userData?.subscriptionStatus !== "expired" ? (
                  <b className="Subscribtion-text dark-Subscription-text">
                    We have following packages
                    <br />
                    Available for you !!
                  </b>
                ) : null}
                <div onClick={() => handleShowModal()} style={{ right: "0" }} className="position-absolute top-0 cursor-pointer">
                  <CancelSvg />
                </div>
              </div>

              <div className="p-tag-text dark-p-tag-text">
                <h4>
                  Choose plan that works best for you, feel free to contact us
                </h4>
              </div>

              {/* <div className="button-div">
                  <div className="button-bg-div dark-button-bg-div">
                    <Button
                      color={billType === 'monthly' ? "primary" : "secondary"}
                      onClick={() => setBillType('monthly')}
                      className="image-item d-flex justify-content-center flex-column shadow-sm cursor-pointer hover:shadow-lg align-content-center align-items-center shadow-4 px-3 py-2"
                      style={{ backgroundColor: "#177ffa !important" }}
                    >
                      Bil Monthly
                    </Button>
                    <Button
                      color={billType === 'yearly' ? "primary" : "secondary"}
                      onClick={() => setBillType('yearly')}
                      className="image-item d-flex justify-content-center flex-column shadow-sm cursor-pointer hover:shadow-lg align-content-center align-items-center shadow-4 px-3 py-2"
                      style={{ backgroundColor: "#177ffa !important" }}
                    >
                      Bil Yearly
                    </Button>
                  </div>
                </div> */}

              <div className="plan-main-container dark-plan-main-container">
                <div className="plans dark-plans">
                  <div className="plan-grid-main-content dark-plan-grid-main-content">
                    <div className="grid-header-content dark-grid-header-content">
                      <h3 className="grid-text dark-grid-text">Creater</h3>
                      <h3 className="paragraph-text dark-paragraph-text">
                        Have a go and test your <br /> superpowers
                      </h3>
                      <h3 className="starting-text dark-starting-text">Starting at</h3>
                      <div className="pay-number-content dark-pay-number-content">
                        <sup>$</sup>
                        <h1>{billType === 'monthly' ? '47' : '564'}</h1>
                        <sub>{billType === 'monthly' ? '/mo' : '/yearly'}</sub>
                      </div>
                      <h3 className={billType === 'monthly' ? "paid-annualy-text dark-paid-annualy-text" : "paid-annualy-text invisible"}>Paid annualy</h3>
                    </div>
                    <div className="grid-bottom-container dark-grid-bottom-container">
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Fast queue: Jump ahead of free-trial users</h3>
                      </div>
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Full Access to Creation-Hub Text</h3>
                      </div>
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Full Access to Creation-Hub Video</h3>
                      </div>
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Over 38.000 words/month</h3>
                      </div>
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Long-form content</h3>
                      </div>
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">2 users</h3>
                      </div>
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Full Leo Tutorial</h3>
                      </div>
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">AI Curation with Virality Score</h3>
                      </div>
                    </div>
                    <div className="sign-up-btn-content">
                      <Button
                        outline
                        color="primary"
                        className="m-1 p-1 "
                        style={{ fontSize: "18px" }}
                        onClick={() =>
                          subscribePlan({
                            planSlug: "creator_monthly_plan",
                          })
                        }
                      >
                        Go Creater
                      </Button>
                    </div>
                  </div>

                  <div className="agency-plan-main-content dark-agency-plan-main-content">
                    <b className="most-popular-text dark-most-popular-text">MOST POPULAR</b>
                    <div className="most-popular-div dark-most-popular-div">
                      <div>MOST POPULAR</div>
                    </div>
                    <div className="blue-line-div"></div>
                    <div className="bule-line-second-div"></div>

                    <div className="agency-header-content dark-agency-header-content">
                      <h3 className="agency-text dark-agency-text">Agency</h3>
                      <h3 className="paragraph-text dark-paragraph-text">
                        Experiment the power <br /> of infinite possibillities
                      </h3>
                      <h3 className="starting-text dark-starting-text">Starting at</h3>
                      <div className="pay-number-content dark-pay-number-content">
                        <sup>$</sup>
                        <h1>{billType === 'monthly' ? '197' : '1164'}</h1>
                        <sub>{billType === 'monthly' ? '/mo' : '/yearly'}</sub>
                      </div>
                      <h3 className={billType === 'monthly' ? "paid-annualy-text dark-paid-annualy-text" : "paid-annualy-text invisible"}>Paid annualy</h3>
                    </div>
                    <div className="agency-bottom-container dark-agency-bottom-container">
                      <div className="agency-bottom-chiled-content dark-agency-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Fast queue: Jump ahead of free-trial users</h3>
                      </div>
                      <div className="agency-bottom-chiled-content dark-agency-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Full Access to Creation-Hub Text</h3>
                      </div>
                      <div className="agency-bottom-chiled-content dark-agency-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Full Access to Creation-Hub Video</h3>
                      </div>
                      <div className="agency-bottom-chiled-content dark-agency-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Over 75.000 words/month</h3>
                      </div>
                      <div className="agency-bottom-chiled-content dark-agency-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Long-form content</h3>
                      </div>
                      <div className="agency-bottom-chiled-content dark-agency-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">More then 3 user</h3>
                      </div>
                      <div className="agency-bottom-chiled-content dark-agency-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Full Leo Tutorial</h3>
                      </div>
                      <div className="agency-bottom-chiled-content dark-agency-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">AI Curation with Virality Score</h3>
                      </div>
                      <div className="agency-bottom-chiled-content dark-agency-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Animation (start with a prompt) Transform (video-to-video) Image-to-Video (start with
                          an image)</h3>
                      </div>
                      <div className="agency-bottom-chiled-content dark-agency-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">24/7 instant support</h3>
                      </div>



                    </div>
                    <div className="goTo-btn-content">
                      <Button
                        color="primary"
                        className="m-1 p-1 "
                        style={{ fontSize: "18px" }}
                        onClick={() =>
                          subscribePlan({
                            planSlug: "agency_monthly_plan",
                          })
                        }
                      >
                        Go Agency
                      </Button>
                    </div>
                  </div>

                  <div className="plan-grid-main-content dark-plan-grid-main-content">
                    <div className="grid-header-content dark-grid-header-content">
                      <h3 className="grid-text dark-grid-text">Company</h3>
                      <h3 className="paragraph-text dark-paragraph-text">
                        Unveil new superpowers and <br /> join the Design Leaque
                      </h3>
                      <h3 className="starting-text dark-starting-text">Starting at</h3>
                      <div className="pay-number-content dark-pay-number-content">
                        <sup>$</sup>
                        <h1>{billType === 'monthly' ? '497' : '2964'}</h1>
                        <sub>{billType === 'monthly' ? '/mo' : '/yearly'}</sub>
                      </div>
                      <h3 className={billType === 'monthly' ? "paid-annualy-text dark-paid-annualy-text" : "paid-annualy-text invisible"}>Paid annualy</h3>
                    </div>
                    <div className="grid-bottom-container dark-grid-bottom-container">
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">
                          All the features of pro plan
                        </h3>
                      </div>
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Full Access to Creation-Hub Text</h3>
                      </div>
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Full Access to Creation-Hub Video</h3>
                      </div>
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Over 380.000 words/month</h3>
                      </div>
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Long-form content</h3>
                      </div>
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">More then 10 user</h3>
                      </div>
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Full Leo Tutorial</h3>
                      </div>
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Animation (start with a prompt) Transform (video-to-video) Image-to-Video (start with an
                          image)</h3>
                      </div>
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">24/7 instant support</h3>
                      </div>
                      <div className="grid-bottom-chiled-content dark-grid-bottom-chiled-content">
                        <img src={checkmark} className="checkmark-img"></img>
                        <h3 className="starting-text dark-starting-text">Account Manager</h3>
                      </div>
                    </div>
                    <div className="sign-up-btn-content">
                      <Button
                        outline
                        color="primary"
                        className="m-1 p-1 "
                        style={{ fontSize: "18px" }}
                        onClick={() =>
                          subscribePlan({
                            planSlug: "company_monthly_plan",
                          })
                        }
                      >
                        Go Company
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>

  );
}
