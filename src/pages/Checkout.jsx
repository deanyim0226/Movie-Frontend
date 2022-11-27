import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

import Idm from "../backend/idm";
import {useUser} from "../hook/User";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
const StyledDiv = styled.div` 
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
            <div className="Checkout">
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
    );


}

export default Checkout;