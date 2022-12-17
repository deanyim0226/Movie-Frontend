import styled from "styled-components";
import {useForm} from "react-hook-form";
import React from "react";
import Idm from "backend/idm";
import {useNavigate} from "react-router-dom";


const Styledbody = styled.body`
  background-image: url("https://cdn.pixabay.com/photo/2012/08/27/22/59/movie-projector-55122_960_720.png");
  background-size: 100%;
  width: 100%;

`
const StyledDiv = styled.div`
  opacity: 0.95;
  display: flex;
  flex-direction: column;

  width: 500px;
  height: 500px;

  padding: 2em;
  margin-top: 3.5em;
  
  margin-left: auto;
  margin-right: auto;
  
  background-color: #f0f0f5;
  border: 1px solid #ebebeb;
  box-shadow: 0px 1px 20px 1px rgba(0,0,0,0.8);
`

const StyleLabel = styled.label`

  font-size: 20px;
  padding: 0.5em;
  
  
`

const StyledH2 = styled.h1`
  font-size: 2.5em;
  padding-bottom: 1em;
  border-top: 2px solid #ebebeb;

  text-align: center;
`

const StyledP = styled.p`
  
  padding-top: 10px;
  display: inline-block;
  text-indent: 0.9em;
  color: #8a8b8e;
  
  
`

const StyledH1 = styled.h1`
  font-size: 2.5em;
  padding-bottom: 1em;
  border-bottom: 1px solid #ebebeb;

  text-align: center;
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
const StyledButton = styled.button`

  display: block;
  background-color: black;
  color: #fff;
  font-weight: bold;
  border-radius: 10px;
  width: 24.1em;
  padding: 0.5em;
  font-size: 20px;

  position: relative;
  display: inline-block;
  text-align: center;
  height: 2.8em;
  cursor: pointer;
  :hover{
    color: #525252;
  }
  
`

const Register = () => {

    const { getValues, register, formState:{errors}, handleSubmit } = useForm();

    const navigate = useNavigate();

    const submitRegister = () => {
        const email = getValues("email"); // This gets the current value in the input below
        const password = getValues("password");
        const repassword = getValues("repassword");

        if (password !== repassword)
        {
            alert("Passwords don't match");
        }else{

            const payLoad = {
                email: email,
                password: password.split('')
            }

            Idm.register(payLoad)
                .then(navigate("/login"))
                .catch(error => alert(JSON.stringify(error.response.data, null, 2)))
        }
    }

    return (
        <Styledbody>

        <StyledDiv>

            <StyledH1>Register</StyledH1>

            <StyleLabel>
                <StyledInput {...register("email",{required: true})} placeholder = {"Email"}  type={"email"}/>
                { !!errors.email && <StyledP>{errors.email && "Email is required"} </StyledP> }
            </StyleLabel>
            <StyleLabel>
                <StyledInput {...register("password", {required: true})} placeholder = "Password" type={"password"}/>
                { !!errors.email &&<StyledP>{errors.password && "Password is required"}</StyledP> }
            </StyleLabel>
            <StyleLabel>
                <StyledInput {...register("repassword", {required: true})} placeholder = "Re-Password" type={"password"}/>
                { !!errors.email && <StyledP>{errors.password && "Re-password is required"}</StyledP> }
            </StyleLabel>
            <StyleLabel>
            <StyledButton onClick={handleSubmit(submitRegister)}>Submit</StyledButton>
            </StyleLabel>

            <StyledH2></StyledH2>
        </StyledDiv>
        </Styledbody>
    );
}


export default Register;