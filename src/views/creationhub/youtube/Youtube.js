import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { YoutubeIcon } from "../../../icon/YoutubeIcon";
import BreadCrumbs from '../../../@core/components/breadcrumbs'
import YoutubeSvg from "../svg/YoutubeSvg";
import YSSvg from "./svg/YSSvg"
import YTISvg from "./svg/YTISvg"
import YTSvg from "./svg/YTSvg"

function Youtube() {
  const navigate = useNavigate();

  return (
    <Container className="parent-card-2 dark-theme-parent-card-2 dark-theme-parent-card-2">
      <div className="breadCrumb-custom dark-breadCrumb-custom">
        <YoutubeSvg />
        <BreadCrumbs title="Youtube" data={[{ title: "Creation Hub", link: "/creationhub" }, { title: "Youtube", link: "/youtube" }]} />
      </div>
      <div className="inner-parent-child">
        <Row>
          <Col sm="12" md="4" lg="3" xl="3">
            <div className="child-card dark-theme-child-card">
              <div
                className="inner-child-card dark-theme-inner-child-card"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/youtube_script");
                }}
              >
                <Row className="d-flex align-items-center">
                  <Col>
                    <YSSvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title className="">Youtube Video Script</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Create Youtube script for your videos.{" "}
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
                  navigate("/youtube_title");
                }}
              >
                <Row className="d-flex align-items-center">
                  <Col>
                    <YTSvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title className="">Youtube Video Titles</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Create engaging, click-worthy titles for your videos.
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
                  navigate("/youtube_topic_idea");
                }}
              >
                <Row className="d-flex align-items-center">
                  <Col>
                    <YTISvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title className="">
                      Youtube Video Topic ideas
                    </Card.Title>
                    <Card.Subtitle className="text-muted">
                      Brainstirm new video topics that will engages viewrs.{" "}
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

export default Youtube;
