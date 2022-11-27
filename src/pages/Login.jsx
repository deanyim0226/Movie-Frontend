import React from "react";
import {useUser} from "hook/User";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import Idm from "backend/idm";
import {Link, useNavigate} from "react-router-dom";


const StyledDiv = styled.div`
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

const StyledH1 = styled.h1`
  font-size: 2.5em;
  padding-bottom: 1em;
  border-bottom: 2px solid #ebebeb;

  text-align: center;
`

const StyleLabel = styled.label`

  font-size: 20px;
  padding: 0.5em;
  
`

const StyledInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 24.1em;
  outline: none;
  height: 60px;
  line-height: 30px;
  font-size: 1em;
  border-radius: 10px;
  text-indent: 1em;
`

const StyledP = styled.p`
  width: 29em;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
  padding: 1em;
  
  text-indent: 7.5em;  
  color: #8a8b8e;

  border-top: 2px solid #ebebeb;
  
`

const StyledButton = styled.button`
  
  display: block;
  background-color: black;
  color: #fff;
  font-weight: bold;
  border-radius: 10px;
  width: 24.1em;
  padding: 0.5em;
  font-size: 20px;
  padding-left: 10px;
  position: relative;
  display: inline-block;
  text-align: center;
  
  height: 2.8em;
  
  cursor: pointer;
  :hover{
    color: #525252;
  }
`


/**
 * useUser():
 * <br>
 * This is a hook we will use to keep track of our accessToken and
 * refreshToken given to use when the user calls "login".
 * <br>
 * For now, it is not being used, but we recommend setting the two tokens
 * here to the tokens you get when the user completes the login call (once
 * you are in the .then() function after calling login)
 * <br>
 * These have logic inside them to make sure the accessToken and
 * refreshToken are saved into the local storage of the web browser
 * allowing you to keep values alive even when the user leaves the website
 * <br>
 * <br>
 * useForm()
 * <br>
 * This is a library that helps us with gathering input values from our
 * users.
 * <br>
 * Whenever we make a html component that takes a value (<input>, <select>,
 * ect) we call this function in this way:
 * <pre>
 *     {...register("email")}
 * </pre>
 * Notice that we have "{}" with a function call that has "..." before it.
 * This is just a way to take all the stuff that is returned by register
 * and <i>distribute</i> it as attributes for our components. Do not worry
 * too much about the specifics of it, if you would like you can read up
 * more about it on "react-hook-form"'s documentation:
 * <br>
 * <a href="https://react-hook-form.com/">React Hook Form</a>.
 * <br>
 * Their documentation is very detailed and goes into all of these functions
 * with great examples. But to keep things simple: Whenever we have a html with
 * input we will use that function with the name associated with that input,
 * and when we want to get the value in that input we call:
 * <pre>
 * getValue("email")
 * </pre>
 * <br>
 * To Execute some function when the user asks we use:
 * <pre>
 *     handleSubmit(ourFunctionToExecute)
 * </pre>
 * This wraps our function and does some "pre-checks" before (This is useful if
 * you want to do some input validation, more of that in their documentation)
 */
const Login = () => {
    const {
        accessToken, setAccessToken,
        refreshToken, setRefreshToken
    } = useUser();

    const {register, getValues, handleSubmit} = useForm();

    const navigate = useNavigate();

    const submitLogin = () => {
        const email = getValues("email");
        const password = getValues("password");

        const payLoad = {
            email: email,
            password: password.split('')
        }

        Idm.login(payLoad)
            .then(response => {
                setAccessToken(response.data.accessToken)
                navigate("/")
            })
            .catch(error => alert(JSON.stringify(error.response.data, null, 2)))

        console.log(accessToken);
    }

    return (

        <StyledDiv>
            <StyledH1>Login</StyledH1>
            <StyleLabel>
                <StyledInput {...register("email",)} placeholder = {"Email Address"} type={"email"}/>
            </StyleLabel>

            <StyleLabel>
                <StyledInput {...register("password", )} placeholder = {"Password"} type={"password"}/>
            </StyleLabel>

            <StyleLabel>
            <StyledButton onClick={handleSubmit(submitLogin)}>Login</StyledButton>
            </StyleLabel>

            <StyledP>
                New to FabFlix? <Link to = "/register"> Register Now </Link>
            </StyledP>

        </StyledDiv>
    );
}


export default Login;
