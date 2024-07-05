import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../CreateVideo/style.scss";
import { useNavigate } from "react-router-dom";

import YoutubeSvg from "./svg/YoutubeSvg";
import InstagramSvg from "./svg/InstagramSvg"
import FacebookSvg from "./svg/FacebookSvg"
import BlogSvg from "./svg/BlogSvg"
import MarketingFunnelSvg from "./svg/MarketingFunnelSvg"
import TiktokSvg from "./svg/TiktokSvg"
import TwitterSvg from "./svg/TwitterSvg"
import EcommerceSvg from "./svg/EcommerceSvg"

const CreationHubCards = () => {
  const navigate = useNavigate();

  return (
    <>
      <Row className="row-gap">
        <Col sm="12" md="4" lg="3" xl="3">
          <div className="child-card dark-theme-child-card">
            <div
              className="inner-child-card dark-theme-inner-child-card"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/instagram");
              }}
            >
              <Row className="d-flex align-items-center ">
                <Col className="">
                  <InstagramSvg />
                </Col>
              </Row>
              <Row>
                <Col className="mt-2">
                  <Card.Title>Instagram</Card.Title>
                  <Card.Subtitle className="text-muted">
                    {" "}
                    Create best content for your Instagram Profile
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
                navigate("/youtube");
              }}
            >
              <Row className="d-flex align-items-center">
                <Col>
                  <YoutubeSvg />
                </Col>
              </Row>
              <Row>
                <Col className="mt-2">
                  <Card.Title className="">Youtube</Card.Title>
                  <Card.Subtitle className="text-muted">
                    Create unique videos for Youtube that rank well in search.
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
                navigate("/facebook");
              }}
            >
              <Row className="d-flex align-items-center">
                <Col>
                  <FacebookSvg />
                </Col>
              </Row>
              <Row>
                <Col className="mt-2">
                  <Card.Title className="">Facebook</Card.Title>
                  <Card.Subtitle className="text-muted">
                    Generate viral &amp; unique post for Facebook.
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
                navigate("/twitter");
              }}
            >
              <Row className="d-flex align-items-center">
                <Col>
                  <TwitterSvg />
                </Col>
              </Row>
              <Row>
                <Col className="mt-2">
                  <Card.Title className="">Twitter</Card.Title>
                  <Card.Subtitle className="text-muted">
                    Generate most viral tweets for Twitter.
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
                navigate("/blog");
              }}
            >
              <Row className="d-flex align-items-center">
                <Col>
                  <BlogSvg />
                </Col>
              </Row>
              <Row>
                <Col className="mt-2">
                  <Card.Title className="">Blog</Card.Title>
                  <Card.Subtitle className="text-muted">
                    Create your blog posts with an engaging content.
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
                navigate("/tiktok");
              }}
            >
              <Row className="d-flex align-items-center">
                <Col>
                  <TiktokSvg />
                </Col>
              </Row>
              <Row>
                <Col className="mt-2">
                  <Card.Title className="">Tik Tok</Card.Title>
                  <Card.Subtitle className="text-muted">
                    Generate viral content for your Tiktok videos.
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
                navigate("/ecommerce");
              }}
            >
              <Row className="d-flex align-items-center">
                <Col>
                  <EcommerceSvg />
                </Col>
              </Row>
              <Row>
                <Col className="mt-2">
                  <Card.Title className="">E-commerce</Card.Title>
                  <Card.Subtitle className="text-muted">
                    Create compelling product content for your ecommerce
                    project.{" "}
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
                navigate("/funnels");
              }}
            >
              <Row className="d-flex align-items-center">
                <Col>
                  <MarketingFunnelSvg />
                </Col>
              </Row>
              <Row>
                <Col className="mt-2">
                  <Card.Title className="">Marketing Funnels</Card.Title>
                  <Card.Subtitle className="text-muted">
                    Create best content for your Marketing Funnels{" "}
                  </Card.Subtitle>
                </Col>
              </Row>
            </div>
          </div>
        </Col >
      </Row >
    </>
  );
};
export default CreationHubCards;
