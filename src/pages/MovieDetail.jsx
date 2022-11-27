import styled from "styled-components";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import Idm from "../backend/idm";
import {useUser} from "../hook/User";
import {useForm} from "react-hook-form";

const StyledDiv = styled.div`
    
`
const StyledDiv1 = styled.div`
    font-size: 30px;
`

const StyledH1 = styled.h1`
`
const Styleimg = styled.img`
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: 300px;
`
const StyledButton = styled.button`
  width: 195px;
  height: 30px;
  font-size: 25px;
`
const StyledSelect = styled.select`
  width: 105px;
  height: 30px;
  font-size: 25px;
`
const MovieDetail = () => {
    const {id} = useParams();
    const {accessToken} = useUser();
    const navigate = useNavigate();
    const {register, getValues, handleSubmit} = useForm();

    const [movies, setMovies ]  = React.useState();

    const [backG, setBackG] = React.useState();

    React.useEffect(() => {
        Idm.post(id,accessToken).
        then(response => setMovies(response.data.movie))
            .catch(error => {
                alert(JSON.stringify(error.response.data, null, 2))
            })
    },[])

    const background = {
        backgroundImage:`url(${"https://image.tmdb.org/t/p/original" + "/image.png"})`,
        height:'100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    const insertMovieIntoCart = () => {
        const quantity = getValues("quantity"); // This gets the current value in the input below
        const movieId = id;

        const payLoad = {
            movieId: movieId,
            quantity: quantity,
        }

        Idm.insertIntoCart(payLoad,accessToken)
            .then(response => alert("Item inserted into cart")
            )
            .catch(error => {
                console.log(movieId);
                console.log(quantity);
                alert(JSON.stringify(error.response.data, null, 2))
            })
    }

    return (
        <StyledDiv>
                {movies &&
                    <div style={{backgroundImage:`url(${"https://image.tmdb.org/t/p/original" + movies.backdropPath})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',}}>
                        <p><img src={"https://image.tmdb.org/t/p/original" + movies.posterPath} width={"300"} height={"425"} alt={"movie poster"} style={{float: 'left'}}/></p>
                        <StyledH1> [Title] {movies.title}</StyledH1>
                        <StyledH1> [Year] {movies.year}</StyledH1>
                        <StyledH1> [Director] {movies.director}</StyledH1>
                        <StyledH1> [Rating] {movies.rating}</StyledH1>
                        <StyledH1> [Num_Votes] {movies.numVotes}</StyledH1>
                        <StyledH1> [Budget] {movies.budget}</StyledH1>
                        <StyledH1> [Revenue] {movies.revenue}</StyledH1>
                        <StyledH1> [Overview] {movies.overview}</StyledH1>
                        <StyledDiv1>

                            <StyledSelect {...register("quantity")}>
                                <optgroup label="Quantity">
                                <option value = {1}>1</option>
                                <option value = {2}>2</option>
                                <option value = {3}>3</option>
                                <option value = {4}>4</option>
                                <option value = {5}>5</option>
                                <option value = {6}>6</option>
                                <option value = {7}>7</option>
                                <option value = {8}>8</option>
                                <option value = {9}>9</option>
                                <option value = {10}>10</option>
                                 </optgroup>
                            </StyledSelect>
                            <StyledButton onClick={handleSubmit(insertMovieIntoCart)}>InsertIntoCart</StyledButton>
                        </StyledDiv1>

                    </div>
                }
        </StyledDiv>
    );
}

export default MovieDetail;

//  <button onClick={ () =>navigate("/search/" + movies.id)}>Add to ShoppingCart</button>