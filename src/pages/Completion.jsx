import React, {useState} from "react";
import {useUser} from "../hook/User";
import Idm from "../backend/idm";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

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
        <div>
            LOADING.....
        </div>
    );

}

export default Complete;