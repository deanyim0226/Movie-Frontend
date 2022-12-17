import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import {useUser} from "../hook/User";
import {hover} from "@testing-library/user-event/dist/hover";
import {useForm} from "react-hook-form";
import Idm from "../backend/idm";

const StyledHeader = styled.header`
  overflow: hidden;
  position: sticky;
  top: 0;
  height: 50px;
  width: 100%;
  background-color: black;
  border-bottom: 1px solid white;
  padding-top: 1em;
  z-index: 1020;
`

const StyledNavHome = styled.nav`
  float: left;
  background-color: black;
`

const StyledNavRest = styled.nav`
  float: right;
  background-color: black;
`

const StyledNavLink = styled(NavLink)`
  padding: 15px;
  font-size: 1.8em;
  color: #fff;
  text-decoration: none;
  font-weight: bolder;
  :hover{
    color: #525252;
  }
`
const StyledButton = styled.button`

  background-color: black;
  color: #fff;
  font-weight: bold;
  
  font-size: 30px;
  
  cursor: pointer;
  :hover{
    color: #525252;
  }
`

/**
 * To be able to navigate around the website we have these NavLink's (Notice
 * that they are "styled" NavLink's that are now named StyledNavLink)
 * <br>
 * Whenever you add a NavLink here make sure to add a corresponding Route in
 * the Content Component
 * <br>
 * You can add as many Link as you would like here to allow for better navigation
 * <br>
 * Below we have two Links:
 * <li>Home - A link that will change the url of the page to "/"
 * <li>Login - A link that will change the url of the page to "/login"
 */
const NavBar = () => {
    const {accessToken, setAccessToken} = useUser();
    const {handleSubmit} = useForm();
    const submitLogout = () => {

        setAccessToken("");
    }
    return (
        <StyledHeader>

            <StyledNavHome>
                <StyledNavLink to="/">
                    FabFlix
                </StyledNavLink>
            </StyledNavHome>

            <StyledNavRest>

                {!accessToken &&
                    <StyledNavLink to="/login">
                        Login
                    </StyledNavLink>
                }
                {!accessToken &&
                    <StyledNavLink to="/register">
                        Register
                    </StyledNavLink>
                }
                {!!accessToken &&
                    <StyledNavLink to="/search">
                    Search
                    </StyledNavLink>
                }

                {!!accessToken &&
                <StyledNavLink to="/cart">
                    Cart
                </StyledNavLink>
                }

                {!!accessToken &&
                    <StyledNavLink to="/order">
                        OrderHistory
                    </StyledNavLink>
                }

                {!!accessToken &&
                    <StyledButton onClick={handleSubmit(submitLogout)} >
                        Logout
                    </StyledButton>
                }

            </StyledNavRest>

        </StyledHeader>
    );
}

export default NavBar;
