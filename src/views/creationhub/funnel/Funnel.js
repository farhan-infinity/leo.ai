import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import BreadCrumbs from '../../../@core/components/breadcrumbs'
import { FunnelIcon } from "../../../icon/FunnelIcon";
import SSvg from "./svg/SSvg";
import CSvg from "./svg/CSvg";
import MarketingFunnelSvg from "../svg/MarketingFunnelSvg"

function Funnel() {

  const navigate = useNavigate();

  return (
    <Container className="parent-card-2 dark-theme-parent-card-2 dark-theme-parent-card-2">
      <div className="breadCrumb-custom dark-breadCrumb-custom">
        <MarketingFunnelSvg />
        <BreadCrumbs title="Marketing Funnels" data={[{ title: "Creation Hub", link: "/creationhub" }, { title: "Marketing Funnels", link: "/funnels" }]} />
      </div>
      <div className="component dark-theme-component w-100">
        <Row>
          <Col sm="12" md="4" lg="3" xl="3">
            <div className="child-card dark-theme-child-card">
              <div
                className="inner-child-card dark-theme-inner-child-card"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/strategy");
                }}
              >
                <Row className="d-flex align-items-center">
                  <Col>
                    <SSvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title className="">Strategy</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Write complete strategy for your funnle.
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
                  navigate("/copy");
                }}
              >
                <Row className="d-flex align-items-center">
                  <Col>
                    <CSvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title className="">Copy</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Write complete copy for your funnle.
                    </Card.Subtitle>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row >
      </div >
    </Container >
  );
}

export default Funnel;
