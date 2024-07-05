import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./payment/Payment";

const stripePromise = loadStripe("pk_test_51NDnI6LZN4yST3Ga5kiqjVCtoemjPgXqU8TiQ7vUtyLrL8tyPj4lbFpL6o2euipPyECyWB2RWho4CLXzFOWPADIE00ZDWsfhLf");

function Payment() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

export default Payment;
