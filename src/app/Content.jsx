import React from "react";
import {Route, Routes} from "react-router-dom";

import Login from "pages/Login";
import Home from "pages/Home";
import styled from "styled-components";
import {useUser} from "../hook/User";
import Register from "../pages/Register";
import Search from "../pages/Search";
import ShoppingCart from "../pages/ShoppingCart";
import MovieDetail from "../pages/MovieDetail";
import Checkout from "../pages/Checkout";
import Completion from "../pages/Completion";
import OrderHistory from "../pages/OrderHistory";
import Delete from "../pages/Delete";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  
  width: 100vw;
  height: 100vh;
  

  background: #ffffff;
  box-shadow: inset 0 3px 5px -3px #000000;
  
`

/**
 * This is the Component that will switch out what Component is being shown
 * depending on the "url" of the page
 * <br>
 * You'll notice that we have a <Routes> Component and inside it, we have
 * multiple <Route> components. Each <Route> maps a specific "url" to show a
 * specific Component.
 * <br>
 * Whenever you add a Route here make sure to add a corresponding NavLink in
 * the NavBar Component.
 * <br>
 * You can essentially think of this as a switch statement:
 * @example
 * switch (url) {
 *     case "/login":
 *         return <Login/>;
 *     case "/":
 *         return <Home/>;
 * }
 *
 */
const Content = () => {
    const{accessToken} = useUser();

    return (
        <StyledDiv>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/search/:id" element={<MovieDetail/>}/>

                <Route path="/cart" element={<ShoppingCart/>}/>
                <Route path="/cart/delete/:id" element={<Delete/>}/>

                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/complete" element={<Completion/>}/>
                <Route path="/order" element={<OrderHistory/>}/>
                {!!accessToken &&
                    <Route path="/search" element={<Search/>}/>
                }
                <Route path="/" element={<Home/>}/>

            </Routes>
        </StyledDiv>
    );
}

export default Content;
