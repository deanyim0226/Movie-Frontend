import React from "react";
import styled from "styled-components";
import Idm from "../backend/idm";

const StyledDiv = styled.div`
  
`

const StyledImg = styled.img`
    height: 100vh;
    width: 100%;
`

const Home = () => {
    return (
        <StyledImg src = {"https://cdn.pixabay.com/photo/2012/08/27/22/59/movie-projector-55122_960_720.png"}/>

    );
}

export default Home;
