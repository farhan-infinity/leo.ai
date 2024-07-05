import {
  CardElement,
  PaymentElement,
  PaymentRequestButtonElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

function PaymentForm(props) {
  const [name, setName] = useState("123456789");
  const [email, setEmail] = useState("pnandaniya01@gmail.com");
  const stripe = useStripe();
  const elements = useElements();

  console.log(props.plan);

  const createSubscription = async (e) => {
    e.preventDefault();
    try {
      const paymentMethod = await stripe.createPaymentMethod({
        card: elements.getElement("card"),
        type: "card",
      });

      console.log(name);
      console.log(email);
      console.log({paymentMethod});

      const response = await axios.post("https://api.clatter.ai/subscribe", {
        name,
        email,
        paymentMethod: paymentMethod.paymentMethod.id,
        amount: "47",
      });

      console.log(response);

      if (!response.status) return alert("Payment unsuccessful!");
      const data = await response.data;
      console.log(data.clientSecret);
      // const confirm = await stripe.confirmCardPayment(data.clientSecret);

      const confirm = await stripe
        .confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement("card"),
            billing_details: {
              name: "Jenny Rosen",
            },
          },
        })
        .then(function (result) {
          console.log(result);
          // Handle result.error or result.paymentIntent
        });

      console.log(confirm);

      //   if (confirm.error) return alert("Payment unsuccessful!");
      //   alert("Payment Successful! Subscription active.");
    } catch (err) {
      console.error(err);
      alert("Payment failed! " + err.message);
    }
  };

  return (
    <>
      <div className="app">
        <div className="loginbg h-100 ">
          <Container className="d-flex align-items-center justify-content-center vh-100 ">
            <Col className="col-6">
              <div className="formsize">
                <div className="customcard p-4 shadow-lg">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between m-b-30">
                      <h2 className="m-b-0">Subscribe</h2>
                    </div>
                    <form>
                      <div className="form-group ">
                        <CardElement />
                      </div>

                      <div className="form-group mt-5">
                        <button
                          className="btn btn-primary w-100"
                          onClick={(e) => createSubscription(e)}
                        >
                          Subscribe
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Col>
          </Container>
        </div>
      </div>

      {/* <Container>
          <Row>
            <Col lg="6">
              <div className="">
                <h1>Hi</h1>
              </div>
            </Col>
            <Col lg="6">
              <div className="">
                <h1>Hi</h1>
              </div>
            </Col>
          </Row>
        </Container>
        <div style={{ width: "40%" }}>
          Name:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          Email:{" "}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <CardElement />
          <br />
          <button onClick={createSubscription}>Subscribe - 5 INR</button>
        </div> */}
    </>
  );
}

export default PaymentForm;
