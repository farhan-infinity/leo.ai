import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { BsInstagram } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { InstagramIcon } from "../../../icon/InstagramIcon";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import InstagramSvg from "../svg/InstagramSvg";
import IBSvg from "./svg/IBSvg"
import ICPSvg from "./svg/ICPSvg"
import IPISvg from "./svg/IPISvg"
import ISSvg from "./svg/ISSvg"

function Instagram() {
  const navigate = useNavigate();

  return (
    <div className="parent-card-2 dark-theme-parent-card-2 dark-theme-parent-card-2">
      <div className="breadCrumb-custom dark-breadCrumb-custom">
        <InstagramSvg />
        <BreadCrumbs title="Instagram" data={[{ title: "Creation Hub", link: "/creationhub" }, { title: "Instagram", link: "/instagram" }]} />
      </div>

      <div className="component dark-theme-component w-100">
        <Row className="row-gap">
          <Col sm="12" md="4" lg="3" xl="3">
            <div className="child-card dark-theme-child-card">
              <div
                className="inner-child-card dark-theme-inner-child-card"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/instagram_post_caption");
                }}
              >
                <Row className="d-flex align-items-center ">
                  <Col className="">
                    <ICPSvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title>Instagram Post Caption</Card.Title>
                    <Card.Subtitle className="text-muted">
                      {" "}
                      Write catchy captions for your instagram posts{" "}
                    </Card.Subtitle>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col sm="12" md="4" lg="3" xl="3">
            <div className="child-card dark-theme-child-card">
              <div
                className="inner-child-card dark-theme-inner-child-card"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/instagram_bio");
                }}
              >
                <Row className="d-flex align-items-center ">
                  <Col className="">
                    <IBSvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title>Instagram Bio</Card.Title>
                    <Card.Subtitle className="text-muted">
                      {" "}
                      Write a creative personal bio that captures attention{" "}
                    </Card.Subtitle>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col sm="12" md="4" lg="3" xl="3">
            <div className="child-card dark-theme-child-card">
              <div
                className="inner-child-card dark-theme-inner-child-card"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/instagram_story");
                }}
              >
                <Row className="d-flex align-items-center ">
                  <Col className="">
                    <ISSvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title>Instagram Story</Card.Title>
                    <Card.Subtitle className="text-muted">
                      {" "}
                      write wildly creative story to engage your readers.{" "}
                    </Card.Subtitle>
                  </Col>
                </Row>
              </div>
            </div>
          </Col >
          <Col sm="12" md="4" lg="3" xl="3">
            <div className="child-card dark-theme-child-card">
              <div
                className="inner-child-card dark-theme-inner-child-card"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/instagram_post_idea");
                }}
              >
                <Row className="d-flex align-items-center ">
                  <Col className="">
                    <IPISvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title>Instagram Post Ideas</Card.Title>
                    <Card.Subtitle className="text-muted">
                      {" "}
                      Generate viral posts for Instagram.{" "}
                    </Card.Subtitle>
                  </Col>
                </Row>
              </div>
            </div>
          </Col >
        </Row >
      </div >
    </div >
  );
}

export default Instagram;
