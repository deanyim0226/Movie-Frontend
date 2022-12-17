import React, {useState} from "react";
import {useUser} from "../hook/User";
import Idm from "../backend/idm";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import styled from "styled-components";

const Styledbody = styled.body`
  background-image: url("https://cdn.pixabay.com/photo/2012/08/27/22/59/movie-projector-55122_960_720.png");
  background-size: 100%;
  width: 100%;

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
  height: 400px;

  padding: 2em;
  margin-top: 3.5em;

  margin-left: auto;
  margin-right: auto;

  border: 1px solid #ebebeb;
  box-shadow: 1px 1px 20px 1px rgba(0,0,0,0.8);
`

const Complete = () => {

    const [paymentIntentId, setPaymentIntendId]= useSearchParams();

    const {
        accessToken
    } = useUser();

    const navigate = useNavigate();

    React.useEffect(() => {
        Idm.complete(paymentIntentId.get("payment_intent"),accessToken)
            .then(response => {
                alert("Order Completed")
                navigate("/")
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data, null, 2))

            })
    },[])

    return (
        <Styledbody>
            <StyledDiv>
                <StyledH1>LOADING.....</StyledH1>
            </StyledDiv>
        </Styledbody>

    );

}

export default Complete;