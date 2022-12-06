import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import { CartState } from "../../../Context/CartProvider";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51Leyj1SBeH3rHHS64XcP46U125vsnEJWuKT5TiVJBC2yyef09PmpN4YJPeJK6IEdI2SQ2jWykQYSbQwnGwqINhi900tbRBw6u9"
);

function StripePayment() {
  const { cart } = CartState();
  const [clientSecret, setClientSecret] = React.useState("");
  useEffect(() => {
    axios
      .post(
        "https://meal-monkey-with-stripe.herokuapp.com/api/payment/paymentIntent",
        {
          amount: cart.total,
        }
      )
      .then((res) => {
        console.log(res.data);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const options = {
    clientSecret: clientSecret,
  };

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default StripePayment;
