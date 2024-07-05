import React, { useEffect, useRef, useState } from "react";
import "../../@core/scss/react/pages/affliate/affliate.scss";

import cardImg3 from "/img/Icon Coins Leo.png";
import cardImg1 from "/img/Icon Heart Leo.png";
import cardImg2 from "/img/Icon 1 Coin Leo.png";
import leads from "/img/lead.png";
import signups from "/img/signup.png";
import customers from "/img/customer.png";
import earnings from "/img/earning.png";
import { Row, Col, CardHeader, Input } from "reactstrap";
import "../CreateVideo/style.scss"
import BreadCrumbs from "../../@core/components/breadcrumbs";
import AffiliateCenterSvg from "./AffiliateCenterSvg";
import { useDispatch, useSelector } from "react-redux";
import { firstPromoter, promoterDetails } from "../../redux/actions/promoterAction";
import { ReactToast } from "../../@core/components/react-toast/ReactToast";

export const Affliate = () => {
  const dispatch = useDispatch()
  const textRef = useRef(null);
  const [promoterLink, setPromoterLink] = useState('')
  const [openPromoter, setOpenPromoter] = useState('')
  const { promo, promoError, promoLoading } = useSelector(state => state.promoter)
  const { promoDetails, promoDetailsError, promoDetailsLoading } = useSelector(state => state.promoter)

  useEffect(() => {
    dispatch(firstPromoter())
  }, [])

  useEffect(() => {
    dispatch(promoterDetails())
  }, [])

  useEffect(() => {
    if (promo) {
      setPromoterLink(promo.promo.link)
      setOpenPromoter(promo.promo.openFirstPromoter)
    }
  }, [promo])

  const handleCopyToClipboard = (linkToCopy) => {
    try {
      // Use the Clipboard API to write the text to the clipboard
      navigator.clipboard.writeText(linkToCopy)
        .then(() => {
          ReactToast({ message: "Link copied to clipboard", error: false })
          console.log('Link copied to clipboard:', linkToCopy);
        })
        .catch((error) => {
          ReactToast({ message: "Failed to copy link", error: true })
          console.error('Failed to copy link:', error);
        });
    } catch (error) {
      ReactToast({ message: "Failed to copy link", error: true })
      console.error('Error copying link:', error);
    }
  };

  const handleFirstPromoter = (url) => {
    debugger
    // Opens the URL in a new tab
    window.open(url, '_blank');

  }

  return (
    <div className="parent-card-2 dark-theme-parent-card-2 w-100 overflow-hidden">
      <div className="breadCrumb-custom dark-breadCrumb-custom">
        <AffiliateCenterSvg />
        <BreadCrumbs title="Affiliate Center" data={[{ title: "Affiliate Center" }]} />
      </div>
      <div className="overflow-auto scrollbar w-100">
        <div className="component dark-theme-component w-100">

          <Row className="row-gap w-100 m-0">
            <Col
              className="custom-card-5 dark-theme-custom-card-5 d-flex flex-lg-row flex-md-column gap-md-2 gap-4"
              lg="12"
              md="12"
            >
              <div className="custom-card-5 dark-theme-custom-card-5 w-100">
                <div className="affliate-card-subContent1  d-flex justify-content-center  align-items-center flex-column">
                  <img
                    className="mt-2 text-center"
                    style={{ width: "60px", height: " 60px" }}
                    src={cardImg3}
                  ></img>
                  <p
                    className="font-hauora-regular"
                    style={{
                      fontWeight: "500",
                      fontSize: "17px",
                      margin: "5px",
                      color: "#FFFFFF",
                      lineHeight: "22px",
                    }}
                  >
                    20% commission on
                  </p>
                  <p
                    className="font-hauora-medium"
                    style={{
                      fontWeight: "700",
                      fontSize: "18px",
                      color: "#FFFFFF",
                      lineHeight: "22px",
                    }}
                  >
                    First 20 Users
                  </p>
                </div>
              </div>
              <div className="custom-card-5 dark-theme-custom-card-5 w-100">
                <div className="affliate-card-subContent2 dark-theme-affliate-card-subContent2 dark-theme-card d-flex justify-content-center  align-items-center flex-column">
                  <img
                    className="mt-2 text-center"
                    style={{ width: "60px", height: "60px" }}
                    src={cardImg2}
                  ></img>
                  <p
                    className="dark-text font-hauora-regular"
                    style={{
                      fontWeight: "500",
                      fontSize: "17px",
                      lineHeight: "22px",
                      margin: "5px",
                    }}
                  >
                    30% commission on
                  </p>
                  <p
                    className="dark-label font-hauora-medium"
                    style={{
                      fontWeight: "700",
                      fontSize: "18px",
                      lineHeight: "22px",
                    }}
                  >
                    First 30-50 Users
                  </p>
                </div>
              </div>
              <div className="custom-card-5 dark-theme-custom-card-5 w-100">
                <div className="affliate-card-subContent2 dark-theme-affliate-card-subContent2 dark-theme-card d-flex justify-content-center  align-items-center flex-column">
                  <img
                    className="mt-2 text-center"
                    style={{ width: "60px", height: "60px" }}
                    src={cardImg1}
                  ></img>
                  <p
                    className="dark-text font-hauora-regular"
                    style={{
                      fontWeight: "500",
                      fontSize: "17px",
                      margin: "5px",
                      lineHeight: "22px",
                    }}
                  >
                    50% commission on
                  </p>
                  <p
                    className="dark-label font-hauora-medium"
                    style={{
                      fontWeight: "700",
                      fontSize: "18px",
                      lineHeight: "22px",
                    }}
                  >
                    First 50 Users
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="component dark-theme-component w-100">
          <Row className="row-gap w-100 m-0">
            <Col className="custom-card-5 dark-theme-custom-card-5" sm="12" md={12}>
              <div
                className="analitics-text  dark-label font-hauora-medium"
              >
                Analytics
              </div>
              <div className="button-box dark-button-box">
                <div
                  className="copyLink-button dark-copyLink-button dark-theme-card font-hauora-regular cursor-pointer"
                >
                  {promoterLink === '' ? (
                    <>
                      Promo Link Unavailable
                    </>
                  ) : (
                    <div onClick={() => handleCopyToClipboard(promoterLink)} >Copy Promo Link</div>
                  )}

                </div>
                <div
                  onClick={() => handleFirstPromoter(openPromoter)}
                  className="openPromoter-button dark-openPromoter-button font-hauora-regular cursor-pointer"
                >

                  Open FirstPromoter
                </div>
              </div>
              <div className="analiticsIcon-container">
                <div className="custom-card-5 dark-theme-custom-card-5">
                  <div className="analitics-box dark-analitics-box">
                    <div className="leadsIcon-box">
                      <img className="img" src={leads}></img>
                    </div>
                    <div className="iconText-box">
                      <div className="font-box">Leads</div>
                      <div className="boldFont-box">{promoDetails?.data.length === 0 ? 0 : promoDetails?.data?.promotions[0]?.leads}</div>
                    </div>
                  </div>
                </div>
                <div className="custom-card-5 dark-theme-custom-card-5">
                  <div className="analitics-box dark-analitics-box">
                    <div className="signUpsIcon-box">
                      <img className="img" src={signups}></img>
                    </div>
                    <div className="iconText-box">
                      <div className="font-box">Visitors</div>
                      <div className="boldFont-box">{promoDetails?.data.length === 0 ? 0 : promoDetails?.data?.promotions[0]?.visitors}</div>
                    </div>
                  </div>
                </div>
                <div className="custom-card-5 dark-theme-custom-card-5">
                  <div className="analitics-box dark-analitics-box">
                    <div className="customersIcon-box">
                      <img className="img" src={customers}></img>
                    </div>
                    <div className="iconText-box">
                      <div className="font-box">Customers</div>
                      <div className="boldFont-box">{promoDetails?.data.length === 0 ? 0 : promoDetails?.data?.promotions[0]?.customers}</div>
                    </div>
                  </div>
                </div>
                <div className="custom-card-5 dark-theme-custom-card-5">
                  <div className="analitics-box dark-analitics-box">
                    <div className="totalEarningIcon-box">
                      <img className="img" src={earnings}></img>
                    </div>
                    <div className="iconText-box">
                      <div className="font-box">Total Earning</div>
                      <div className="boldFont-box">{promoDetails?.data.length === 0 ? 0 : (promoDetails?.data?.totalEarnings === null ? 0 : promoDetails?.data?.totalEarnings.cash)}$</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div >



  );
};
