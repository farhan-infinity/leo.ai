import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaShopify } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import BreadCrumbs from '../../../@core/components/breadcrumbs'
import { Ecom } from "../../../icon/Ecom";
import EcommerceSvg from "../svg/EcommerceSvg";
import HCSvg from "./svg/HCSvg";
import PDSvg from "./svg/PDSvg";
function Ecommerce() {
  const navigate = useNavigate();

  return (
    <Container className="parent-card-2 dark-theme-parent-card-2 dark-theme-parent-card-2">
      <div className="breadCrumb-custom dark-breadCrumb-custom">
        <EcommerceSvg />
        <BreadCrumbs title="Ecommerce" data={[{ title: "Creation Hub", link: "/creationhub" }, { title: "Ecommerce", link: "/ecommerce" }]} />
      </div>
      <div className="component dark-theme-component w-100">
        <Row lg={12}>
          <Col sm="12" md="4" lg="3" xl="3">
            <div className="child-card dark-theme-child-card">
              <div
                className="inner-child-card dark-theme-inner-child-card"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/product_description");
                }}
              >
                <Row className="d-flex align-items-center">
                  <Col>
                    <PDSvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title className="">Product description</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Create compelling product descriptions for your listings.
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
                  navigate("/home_copy");
                }}
              >
                <Row className="d-flex align-items-center">
                  <Col>
                    <HCSvg />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Card.Title className="">Home Copy</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Write a creative copy for your Ecommerce
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

export default Ecommerce;
