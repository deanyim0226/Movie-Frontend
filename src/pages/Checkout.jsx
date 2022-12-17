import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

import Idm from "../backend/idm";
import {useUser} from "../hook/User";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
const Styledbody = styled.body`
  background-image: url("https://cdn.pixabay.com/photo/2012/08/27/22/59/movie-projector-55122_960_720.png");
  background-size: 100%;
  width: 100%;
  height: 52em;
`
const StyledH1 = styled.h1`
  font-size: 2.5em;
  padding-bottom: 0.3em;
  border-bottom: 2px solid #ebebeb;
  text-align: center;
`
const StyledDiv = styled.div`
  opacity: 0.95;
  display: flex;
  flex-direction: column;

  background-color: #f0f0f5;
  width: 500px;
  height: 510px;
  
  padding: 1em;
  margin-top: 2em;

  margin-left: auto;
  margin-right: auto;

  border: 1px solid #ebebeb;
  box-shadow: 1px 1px 20px 1px rgba(0,0,0,0.8);
`
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51KwHzfI9E5sjLOtDmd1DjiY5KerkUcLRNySLPNkdgK1dSw4tedwI2YF3XeTBuuMvkQxtnP6K03QXqEPU3xvdndFl00tDCokoXo");

const Checkout = () => {

    const [clientSecret, setClientSecret] = useState("");
    const [paymentIntentId, setPaymentIntentId] = useState("");

    const {
        accessToken
    } = useUser();

    React.useEffect(() => {
        Idm.payment(accessToken)
            .then(response => {
                setPaymentIntentId(response.data.paymentIntent)
                setClientSecret(response.data.clientSecret)
                alert("Order Payment Intent Created")
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data, null, 2))

            })
    },[])



    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
            <Styledbody className="Checkout">
                <StyledDiv>
                    <StyledH1>
                        Payment
                    </StyledH1>
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
                </StyledDiv>
            </Styledbody>
    );


}

export default Checkout;