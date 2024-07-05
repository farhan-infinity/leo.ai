import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { BsTwitter } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { TwitterIcon } from "../../../icon/TwitterIcon";
import BreadCrumbs from '../../../@core/components/breadcrumbs'
import TwitterSvg from "../svg/TwitterSvg";
import TMSvg from "./svg/TMSvg";
function Twitter() {
  const navigate = useNavigate();

  return (
    <Container className="parent-card-2 dark-theme-parent-card-2 dark-theme-parent-card-2">
      <div className="breadCrumb-custom dark-breadCrumb-custom">
        <TwitterSvg />
        <BreadCrumbs title="Twitter" data={[{ title: "Creation Hub", link: "/creationhub" }, { title: "Twitter", link: "/twitter" }]} />
      </div>
      <div className="inner-parent-child">
        <Row>
          <Col sm="12" md="4" lg="3" xl="3" >
            <div className="child-card dark-theme-child-card">
              <div
                className="inner-child-card dark-theme-inner-child-card"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/twitter_machine");
                }}
              >
                <Row className="d-flex align-items-center">
                  <Col>
                    <TMSvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title className="">Tweet Machine</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Generate viral tweets for Twitter.
                    </Card.Subtitle>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container >
  );
}

export default Twitter;
