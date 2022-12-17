import styled from "styled-components";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import Idm from "../backend/idm";
import {useUser} from "../hook/User";
import {useForm} from "react-hook-form";

const Styledbody = styled.body`
  background-color: black;
  background-size: 100%;
  width: 100%;
  height: 52em;
`

const StyledDiv = styled.div`
    
`
const StyledDiv1 = styled.div`
  
  text-align: center;
`

const StyledH1 = styled.h1`
    color: white;
    text-align: center;
    margin: 0.5em;
`

const StyledH2 = styled.h2`
    color: white;
    text-align: left;
    margin: 0.5em;
`

const StyledH3 = styled.h3`
    color: white;
    text-align: left;
    margin: 0.5em;
`

const StyledName = styled.p`
    color: pink;
    display: inline-block;
`

const Styleimg = styled.img`
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: 300px;
`

/*
const StyledButton = styled.button`
  width: 195px;
  height: 30px;
  font-size: 25px;
`
*/

const StyledButton = styled.button`
  
  background-color: black;
  color: #fff;
  font-weight: bold;
  border-radius: 10px;
  width: 15em;
  
  text-align: center;
  height: 2em;
  
  cursor: pointer;
  :hover{
    color: #525252;
  }
`
const StyledSelect = styled.select`
  margin: 1em;
  width: 4em;
  border-radius: 10px;
  height: 2em;
  font-size: 1.55em;
  text-align: center;
  background-color: black;
  color: white;
  
`
const MovieDetail = () => {
    const {id} = useParams();
    const {accessToken} = useUser();
    const navigate = useNavigate();
    const {register, getValues, handleSubmit} = useForm();

    const [movies, setMovies ]  = React.useState();
    const [genres, setGenres] = React.useState();

    const [persons, setPersons] = React.useState();

    const [backG, setBackG] = React.useState();

    React.useEffect(() => {
        Idm.post(id,accessToken).
        then(response => setMovies(response.data.movie))
            .catch(error => {
                alert(JSON.stringify(error.response.data, null, 2))
            })
    },[])

    React.useEffect(() => {
        Idm.post(id,accessToken).
        then(response => setGenres(response.data.genres))
            .catch(error => {
                alert(JSON.stringify(error.response.data, null, 2))
            })
    },[])

    React.useEffect(() => {
        Idm.post(id,accessToken).
        then(response => setPersons(response.data.persons))
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

    function display(element) {

        let temp = "";
        element.forEach( (data) =>{
            temp += data.name;
            temp += ", ";
        });
        temp = temp.substring(0, temp.length-2);
        return temp;
    }

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
        <Styledbody>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            {movies &&

                <div style={{
                    backgroundImage: `url(${"https://image.tmdb.org/t/p/original" + movies.backdropPath})`,
                    backgroundSize: '100%',
                    height: '100%',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.9
                }}>

                    <div>
                        <StyledH1>{movies.title} ({movies.year})</StyledH1>
                        <p><Styleimg src={"https://image.tmdb.org/t/p/original" + movies.posterPath} width={"300"}
                                     height={"535"} alt={"movie poster"} style={{float: 'left'}}/></p>

                        <StyledH2> <StyledName> Overview : </StyledName> {movies.overview}</StyledH2>

                        <table>
                            <tr>
                                <td>
                                    <StyledH3> <StyledName> Director : </StyledName> {movies.director}</StyledH3>
                                </td>
                                {genres &&
                                    <td>
                                        <StyledH3> <StyledName> Genres : </StyledName> {display(genres)}</StyledH3>
                                    </td>
                                }
                            </tr>

                            <tr>
                                <td>
                                    <StyledH3> <StyledName>Budget : </StyledName> {movies.budget}</StyledH3>
                                </td>
                                <td>
                                    <StyledH3> <StyledName>Revenue : </StyledName> {movies.revenue}</StyledH3>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <StyledH3> <StyledName> Rating : </StyledName> {movies.rating}</StyledH3>
                                </td>

                                <td>
                                    <StyledH3> <StyledName> Num_Votes : </StyledName> {movies.numVotes}</StyledH3>
                                </td>
                            </tr>

                        </table>

                        {persons &&
                            <StyledH3> <StyledName> People : </StyledName> {display(persons)}</StyledH3>
                        }

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

                            <StyledButton className="material-symbols-outlined" onClick={handleSubmit(insertMovieIntoCart)}>Insert Into add_shopping_cart</StyledButton>

                        </StyledDiv1>
                    </div>

                </div>
                }
        </Styledbody>
    );
}

export default MovieDetail;

//  <button onClick={ () =>navigate("/search/" + movies.id)}>Add to ShoppingCart</button>