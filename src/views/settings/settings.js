import React, { useEffect } from "react";
import EditProfile from "./EditProfile";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import useState from "react-usestateref";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstace from "../../helpers/api/axios";

const setting = () => {
  const [data, setData, dataRef] = useState([]);
  const [plan, setPlan, planRef] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    getCredits();
    getPlan();
    console.log("21313123")
  }, []);

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  async function getCredits() {
    axiosInstace
      .get("/dashboard", axiosConfig)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function cancelAccount() {
    axiosInstace
      .post("/cancel-account", {}, axiosConfig)
      .then(function (response) {
        console.log(response);
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getPlan() {
    axiosInstace
      .get("/active-subscription", axiosConfig)
      .then(function (response) {
        console.log(response.data.data.plan);
        setPlan(response.data.data.plan);
        console.log(planRef.current);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="">
        <div className="section bg-light py-lg" id="pricing">
          <Container>
            <Row>
              <Col lg="8">
                <div className="">
                  <div className="">
                    <EditProfile />
                  </div>
                  {planRef.current ? (
                    <div className="mt-4 card pricing ediitProfile">
                      <div className="card-body">
                        <h3 className="font-weight-bold text-center">
                          Billings
                        </h3>
                        <small className="text-muted">
                          {planRef.current.name}
                        </small>
                        <div className="card-title">
                          ${planRef.current.amount}
                          <span className="small-text">/mo</span>
                        </div>
                        <div className="card-text">
                          <ul className="list-unstyled">
                            <li>{planRef.current.credit} CREDITS </li>
                            <li>Billing cycle renews in 29 days</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {/* <div className="mt-4 card pricing">
                    <div className="card-body">
                      <h3 className="font-weight-bold text-center">Billings</h3>
                      <small className="text-muted">CREATOR</small>
                      <div className="card-title">
                        $47<span className="small-text">/mo</span>
                      </div>
                      <div className="card-text">
                        <ul className="list-unstyled">
                          <li>20.000 CREDITS </li>
                          <li>Billing cycle renews in 29 days</li>
                        </ul>
                      </div>
                    </div>
                  </div> */}
                </div>
              </Col>

              <Col lg="4">
                <Container>
                  <Row>
                    <Col>
                      <Card className="card">
                        <Card.Body className="">
                          <Row className="">
                            <Col lg="12">
                              <div className="">
                                <div className="ctitle">Total credits</div>
                                <h1 className="card-title">20,000</h1>
                                <div
                                  className="text-uppercase"
                                  style={{ fontSize: ".8em" }}
                                >
                                  {(
                                    (dataRef.current.credit_count * 100) /
                                    20000
                                  ).toFixed(2)}
                                  % of plan credits used
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Card className="card">
                        <Card.Body className="">
                          <Row className="">
                            <Col lg="12">
                              <div className="">
                                <div className="ctitle">Plan credits</div>
                                <h1 className="card-title">20,000</h1>
                                <div
                                  className="text-uppercase"
                                  style={{ fontSize: ".8em" }}
                                >
                                  {(
                                    (dataRef.current.credit_count * 100) /
                                    20000
                                  ).toFixed(2)}
                                  % of plan credits used
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Card className="card">
                        <Card.Body className="">
                          <Row className="">
                            <Col lg="12">
                              <div className="">
                                <div className="ctitle">Invoices</div>
                                <div
                                  className="text-uppercase"
                                  style={{ fontSize: ".8em" }}
                                >
                                  View your payment history
                                </div>
                                <div className="mt-3 btn btn-light">
                                  View billing history
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Card className="card">
                        <Card.Body className="">
                          <Row className="">
                            <Col lg="12">
                              <div className="">
                                <div className="ctitle">Cancel account</div>
                                <div className="" style={{ fontSize: ".8em" }}>
                                  Please be aware that cancelling your account
                                  will cause you to lose all of your saved
                                  content and earned credits on your account.
                                </div>
                                <div
                                  onClick={() => cancelAccount()}
                                  className="mt-3 btn btn-light"
                                >
                                  Cancel
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container >
        </div >
      </div >
    </div >
  );
};

export default setting;
