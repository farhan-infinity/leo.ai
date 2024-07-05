import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { BsFacebook } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { FacebookIcon } from "../../../icon/FacebookIcon";
import BreadCrumbs from '../../../@core/components/breadcrumbs'
import FACSvg from "./svg/FACSvg";
import FacebookSvg from "../svg/FacebookSvg";
function Facebook() {
  const navigate = useNavigate();

  return (
    <Container className="parent-card-2 dark-theme-parent-card-2 dark-theme-parent-card-2">
      <div className="breadCrumb-custom dark-breadCrumb-custom">
        <FacebookSvg />
        <BreadCrumbs title="Facebook" data={[{ title: "Creation Hub", link: "/creationhub" }, { title: "Facebook", link: "/facebook" }]} />
      </div>
      <div className="inner-parent-child">
        <Row>
          <Col sm="12" md="4" lg="3" xl="3">
            <div className="child-card dark-theme-child-card">
              <div
                className="inner-child-card dark-theme-inner-child-card"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/facebook_ad_caption");
                }}
              >
                <Row className="d-flex align-items-center">
                  <Col>
                    <FACSvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title className="">Facebook Ads Captions</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Write catchy captions for your Facebook ads{" "}
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

export default Facebook;
