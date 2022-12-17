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
  font-size: 2.5em;
  padding-bottom: 0.3em;
  border-bottom: 2px solid #ebebeb;
  text-align: center;
`
const Styledbody = styled.body`
  background-image: url("https://cdn.pixabay.com/photo/2012/08/27/22/59/movie-projector-55122_960_720.png");
  background-size: 100%;
  width: 100%;

`

const Styledlayout = styled.div`
  opacity: 0.95;
  display: flex;
  flex-direction: column;

  background-color: #f0f0f5;
  width: 50em;
  height: 45em;
  
  padding: 2em;
  margin-top: 1.5em;

  margin-left: auto;
  margin-right: auto;

  border: 1px solid #ebebeb;
  box-shadow: 1px 1px 20px 1px rgba(0,0,0,0.8);
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
    font-size: 20px;
    text-align: center;
  
`
const SyledTH = styled.th`
    width: auto;
    border: black solid 1px;
    font-size: 20px;
   
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
        <Styledbody>
            <Styledlayout>
                <StyledH1>
                    Order History
                </StyledH1>
            <SyledTable>
                <tr>
                    <SyledTH>SaleId</SyledTH>
                    <SyledTH>OrderDate</SyledTH>
                    <SyledTH>Total</SyledTH>
                </tr>

                {sales &&
                    sales.map(sale =>
                        <tr>
                            <SyledTD> {sale.saleId}</SyledTD>
                            <SyledTD> {sale.orderDate}</SyledTD>
                            <SyledTD> ${sale.total}</SyledTD>
                        </tr>
                    )
                }
            </SyledTable>
            </Styledlayout>
        </Styledbody>
    );
}

export default OrderHistory;

