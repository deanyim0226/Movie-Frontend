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

const ShoppingCart = () => {
    const {
        accessToken
    } = useUser();
    const {id} = useParams();
    const {register,getValues,handleSubmit} = useForm();
    const navigate = useNavigate();
    const [total, setTotal ]  = React.useState(0);
    const [items, setItems ]  = React.useState([]);

    React.useEffect(() => {
        Idm.cartRetrieve(accessToken)
            .then(response => {
                setTotal(response.data.total)
                setItems(response.data.items)

            })
            .catch(error => {
                alert(JSON.stringify(error.response.data, null, 2))

            })
    },[])

    const cartClear = () => {
        Idm.cartClear(accessToken)
            .then(response => {
                alert("Items have been cleared from cart");
                Idm.cartRetrieve(accessToken)
                    .then(response => {
                        setTotal(response.data.total)
                        setItems(response.data.items)
                    })
                    .catch(error => {
                        alert(JSON.stringify(error.response.data, null, 2))
                    })
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data, null, 2))
            })
    }
    const updateCart = (event,id) => {

        const movieId = id;
        const quantity = event.target.value;

        const payload = {
            movieId: movieId,
            quantity: quantity
        };

        Idm.cartUpdate(payload,accessToken)
            .then(response => {

                alert("Item in cart updated");
                Idm.cartRetrieve(accessToken)
                    .then(response => {
                        setTotal(response.data.total)
                        setItems(response.data.items)
                    })
                    .catch(error => {
                        alert(JSON.stringify(error.response.data, null, 2))
                    })
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data, null, 2))
            })
    }
    const cartDelete = () => {

        console.log(id);
        Idm.cartDelete(id,accessToken)
            .then(response =>{
                alert("Item deleted from cart")
                Idm.cartRetrieve(accessToken)
                    .then(response => {
                        setTotal(response.data.total)
                        setItems(response.data.items)
                    })
                    .catch(error => {
                        alert(JSON.stringify(error.response.data, null, 2))
                    })
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data, null, 2))
            })
    }
    return (
        <StyledDiv>
            <SyledTable>
                <tr>
                    <SyledTH>Movie Title</SyledTH>
                    <SyledTH>Quantity</SyledTH>
                    <SyledTH>Unit Price</SyledTH>
                    <SyledTH><StyledButton onClick={handleSubmit(cartClear)}>Clear</StyledButton></SyledTH>
                </tr>

                    {items &&
                        items.map(item =>
                            <tr>

                                <SyledTD> {item.movieTitle}</SyledTD>
                                <SyledTD>
                                    <select value={item.quantity} onChange={event => updateCart(event,item.movieId)}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value = {5}>5</option>
                                        <option value = {6}>6</option>
                                        <option value = {7}>7</option>
                                        <option value = {8}>8</option>
                                        <option value = {9}>9</option>
                                        <option value = {10}>10</option>
                                    </select>

                                </SyledTD>
                                <SyledTD> {item.unitPrice}</SyledTD>
                                <StyledButton onClick={() =>navigate("/cart/delete/" + item.movieId)}>Delete</StyledButton>
                            </tr>
                        )
                    }

            </SyledTable>

            {total &&
                <div>
                    <StyledH1> [total] {total}  <StyledButton onClick = { () =>  navigate("/checkout") }>CheckOut</StyledButton> </StyledH1>

                </div>
            }

        </StyledDiv>
    );
}

export default ShoppingCart;

