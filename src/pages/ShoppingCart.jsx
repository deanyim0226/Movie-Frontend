import styled from "styled-components";
import React from "react";
import Idm from "backend/idm";
import {useUser} from "../hook/User";
import {replaceBehavior} from "@testing-library/user-event/dist/keyboard/plugins";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";

const StyledDiv = styled.div`
  opacity: 0.95;
  display: flex;
  flex-direction: column;

  background-color: #f0f0f5;
  width: 500px;
  
  padding: 1em;
  margin-top: 2em;

  margin-left: auto;
  margin-right: auto;

  border: 1px solid #ebebeb;
  box-shadow: 1px 1px 20px 1px rgba(0,0,0,0.8);
`

const StyledName = styled.p`
    color: pink;
    display: inline-block;
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

const SyledTable = styled.table`
  padding: 0px;
  width: auto;
  border: black solid 1px;

`
const StyledSelect = styled.select`

  width: 100%;
  border-radius: 10px;
  font-size: 1.55em;
  text-align: center;
  
`
const SyledTD = styled.td`
  width: auto;
  border: black solid 1px;

  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 20px;

`
const SyledTH = styled.th`
  width: auto;
  border: black solid 1px;
  font-size: 20px;

`
const StyledButtonDetail = styled.button`
  
  background-color: #f0f0f5;
  width: 100%;
  height: 2em;
  border: 1px solid  #f0f0f5 ;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  :hover{
    color: red;
  }
`
const StyledButton = styled.button`
  margin-top: 1rem;
  margin-left: 1.5em;
  background-color: black;
  color: #fff;
  font-weight: bold;
  border-radius: 10px;
  width: 8em;
  
  padding-left: 10px;

  text-align: center;
  height: 2.7em;
  
  cursor: pointer;
  :hover{
    color: #525252;
  }
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
        <Styledbody>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            <Styledlayout>
                <StyledH1>
                    Cart
                </StyledH1>

            <SyledTable>
                <tr>
                    <SyledTH>Image</SyledTH>
                    <SyledTH>Movie Title</SyledTH>
                    <SyledTH>Quantity</SyledTH>
                    <SyledTH>Unit Price</SyledTH>
                    <SyledTH><StyledButtonDetail onClick={handleSubmit(cartClear)}>Clear</StyledButtonDetail></SyledTH>
                </tr>

                    {items &&
                        items.map(item =>
                            <tr>
                                <SyledTD><img  src={"https://image.tmdb.org/t/p/original" + item.posterPath} width={"100%"} height={"70"} alt={"movie poster"}/></SyledTD>
                                <SyledTD> {item.movieTitle}</SyledTD>
                                <SyledTD>
                                    <StyledSelect value={item.quantity} onChange={event => updateCart(event,item.movieId)}>
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
                                    </StyledSelect>

                                </SyledTD>
                                <SyledTD> ${item.unitPrice} </SyledTD>
                                <SyledTD> <StyledButtonDetail  className="material-symbols-outlined" onClick={() =>navigate("/cart/delete/" + item.movieId)}>Delete</StyledButtonDetail> </SyledTD>
                            </tr>
                        )
                    }

            </SyledTable>

            {total &&
                <StyledDiv>
                    <StyledH1>  Total:  $ {total}  <StyledButton  className="material-symbols-outlined" onClick = { () =>  navigate("/checkout") }> payment</StyledButton> </StyledH1>
                </StyledDiv>
            }
            </Styledlayout>
        </Styledbody>
    );
}

export default ShoppingCart;

