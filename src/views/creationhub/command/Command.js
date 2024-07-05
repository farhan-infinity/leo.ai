import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { GrCommand } from "react-icons/gr";
import { useNavigate, Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
function Command() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="pb-3">
        <Breadcrumb className='ms-1'>
          <BreadcrumbItem active >
            <Link to="/creationhub">Creation Hub</Link>
          </BreadcrumbItem>

        </Breadcrumb>
      </div>

      <Container>
        <Row>
          <Col sm="12" md="4" lg="3" xl="3">
            <Card
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/any_commands");
              }}
              className="card"
            >
              <Card.Body>
                <Container>
                  <Row className="d-flex align-items-center">
                    <Col>
                      <GrCommand
                        color="#000"
                        style={{
                          fontSize: "4rem",
                          background: "#F4F7FA",
                          borderRadius: "21%",
                          padding: "1rem",
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-2">
                      <Card.Title className="">Any command</Card.Title>
                      <Card.Subtitle className="text-muted">
                        Endless possibility.
                      </Card.Subtitle>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div >
  );
}

export default Command;
