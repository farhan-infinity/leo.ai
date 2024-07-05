import React, { useEffect } from "react";
import useState from "react-usestateref";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";

function EditProfile() {
  const [data, setData, dataRef] = useState("");
  useEffect(() => {
    getData();
  }, []);

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  async function getData() {
    axios
      .get(`${Domain}/user-profile`, axiosConfig)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <div className="card ediitProfile">
        <div className="card-body">
          <h3 className="font-weight-bold text-center">Profile</h3>
          <div className="card-text mt-3">
            <Container>
              <Row>
                <Col lg="6">
                  <label className="font-weight-semibold">Username:</label>
                  <div className="input-affix">
                    <input
                      type="text"
                      value={dataRef.current.username}
                      className="form-control w-100"
                    />
                  </div>
                </Col>
                <Col lg="6">
                  <label className="font-weight-semibold">Created at:</label>
                  <div className="input-affix">
                    <input
                      type="text"
                      value={moment(dataRef.current.created_at).format(
                        "MMMM Do YYYY"
                      )}
                      className="form-control w-100"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <label className="font-weight-semibold">Email:</label>
                  <div className="input-affix">
                    <input
                      type="text"
                      value={dataRef.current.email}
                      className="form-control"
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div >
    </>
  );
}

export default EditProfile;