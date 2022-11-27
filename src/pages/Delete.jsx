

import styled from "styled-components";
import React from "react";
import Idm from "backend/idm";
import {useUser} from "../hook/User";
import {replaceBehavior} from "@testing-library/user-event/dist/keyboard/plugins";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";

const StyledDiv = styled.div` 
`

const StyledH1 = styled.h1`
    font-size: 30px;
`
const StyledButton = styled.button`
  width: 120px;
  height: 30px;
`
const SyledTable = styled.table`
    padding: 0px;
    width: auto;
    border: black solid 1px;
    
`
const SyledTD = styled.td`
    width: auto;
    border: black solid 1px;
  
`
const SyledTH = styled.th`
    width: auto;
    border: black solid 1px;
   
`
//update cart or remove item
//checkout button to nevigate purchase

const Delete = () => {
    const {
        accessToken
    } = useUser();
    const {id} = useParams();

    const navigate = useNavigate();
    const [total, setTotal ]  = React.useState(0);
    const [items, setItems ]  = React.useState([]);

    React.useEffect(() => {
        Idm.cartDelete(id,accessToken)
            .then(response =>{
                alert("Item deleted from cart")
                Idm.cartRetrieve(accessToken)
                    .then(response => {
                        setTotal(response.data.total)
                        setItems(response.data.items)
                        navigate("/cart")
                    })
                    .catch(error => {
                        alert(JSON.stringify(error.response.data, null, 2))
                    })
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data, null, 2))
            })
    },[])

    return (
        <StyledDiv>

        </StyledDiv>
    );
}

export default Delete;

