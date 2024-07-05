import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaTiktok } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import BreadCrumbs from '../../../@core/components/breadcrumbs'
import { TiktokIcon } from "../../../icon/TiktokIcon";
import TiktokSvg from "../svg/TiktokSvg";
import TCVSvg from "./svg/TCVSvg";
import TSSvg from "./svg/TSSvg";
import TVTISvg from "./svg/TVTISvg";
function Tiktok() {
  const navigate = useNavigate();

  return (
    <Container className="parent-card-2 dark-theme-parent-card-2 dark-theme-parent-card-2">
      <div className="breadCrumb-custom dark-breadCrumb-custom">
        <TiktokSvg />
        <BreadCrumbs title="Tiktok" data={[{ title: "Creation Hub", link: "/creationhub" }, { title: "Tiktok", link: "/tiktok" }]} />
      </div>
      <div className="component dark-theme-component w-100">
        <Row lg='12'>
          <Col sm="12" md="4" lg="3" xl="3">
            <div className="child-card dark-theme-child-card">
              <div
                className="inner-child-card dark-theme-inner-child-card"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/tiktok_video_caption");
                }}
              >
                <Row className="d-flex align-items-center">
                  <Col>
                    <TCVSvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title className="">
                      Tiktok Caption for Video
                    </Card.Title>
                    <Card.Subtitle className="text-muted">
                      Generate viral captions for your TikTok videos.
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
                  navigate("/tiktok_script");
                }}
              >
                <Row className="d-flex align-items-center">
                  <Col>
                    <TSSvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title className="">Tiktok Script</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Create Tiktok script for viral tiktok videos.
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
                  navigate("/tiktok_video_topic_idea");
                }}
              >
                <Row className="d-flex align-items-center">
                  <Col>
                    <TVTISvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title className="">
                      Tiktok Video Topic Ideas
                    </Card.Title>
                    <Card.Subtitle className="text-muted">
                      Generate viral Video Topic Ideas for Tiktok.
                    </Card.Subtitle>
                  </Col>
                </Row>
              </div>
            </div>
          </Col >
        </Row >
      </div >
    </Container >
  );
}

export default Tiktok;
