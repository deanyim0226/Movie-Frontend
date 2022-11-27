import styled from "styled-components";
import React from "react";
import Idm from "backend/idm";
import {useUser} from "../hook/User";
import {replaceBehavior} from "@testing-library/user-event/dist/keyboard/plugins";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

const StyledDiv = styled.div` 
`

const StyledH1 = styled.h1`
`
const StyledButton = styled.button`
  width: 255px;
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

const OrderHistory = () => {
    const {
        accessToken
    } = useUser();

    const {handleSubmit} = useForm();
    const navigate = useNavigate();
    const [sales, setSales ]  = React.useState(0);

    React.useEffect(() => {
        Idm.orderHistory(accessToken)
            .then(response => {
                setSales(response.data.sales)
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data, null, 2))

            })
    },[])

    return (
        <StyledDiv>

            <SyledTable>
                <tr>
                    <SyledTH>SaleId</SyledTH>
                    <SyledTH>Total</SyledTH>
                    <SyledTH>OrderDate</SyledTH>
                </tr>

                {sales &&
                    sales.map(sale =>
                        <tr>
                            <SyledTD> {sale.saleId}</SyledTD>
                            <SyledTD> {sale.total}</SyledTD>
                            <SyledTD> {sale.orderDate}</SyledTD>
                        </tr>
                    )
                }
            </SyledTable>

        </StyledDiv>
    );
}

export default OrderHistory;

