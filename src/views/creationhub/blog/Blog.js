import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import BreadCrumbs from '../../../@core/components/breadcrumbs'
import BlogSvg from "../svg/BlogSvg";
import BPTISvg from "./svg/BPTISvg";
import BPSvg from "./svg/BPSvg";
function Blog() {
  const navigate = useNavigate();

  return (
    <Container className="parent-card-2 dark-theme-parent-card-2 dark-theme-parent-card-2">
      <div className="breadCrumb-custom dark-breadCrumb-custom">
        <BlogSvg />
        <BreadCrumbs title="Instagram" data={[{ title: "Creation Hub", link: "/creationhub" }, { title: "Blog", link: "/blog" }]} />
      </div>
      <div className="component dark-theme-component w-100">
        <Row>
          <Col sm="12" md="4" lg="3" xl="3">
            <div className="child-card dark-theme-child-card">
              <div
                className="inner-child-card dark-theme-inner-child-card"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/blog_post");
                }}
              >
                <Row className="d-flex align-items-center">
                  <Col>
                    <BPSvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title className="">Blog Post</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Create your blog posts with an engaging content.
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
                  navigate("/blog_post_topic_ideas");
                }}
              >
                <Row className="d-flex align-items-center">
                  <Col>
                    <BPTISvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title className="">Blog Post Topic Ideas</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Brainstorm new blog post topics that will engage readers
                      and rank.</Card.Subtitle>
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

export default Blog;

