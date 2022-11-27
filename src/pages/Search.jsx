import styled from "styled-components";
import {useForm} from "react-hook-form";
import React from "react";

import Idm from "backend/idm";
import {useUser} from "../hook/User";
import {useNavigate} from "react-router-dom";



const StyledDiv = styled.div`
  
  display: flex;
  flex-direction: column;
  background-color: #FFF;
`

const StyleLabel = styled.label`
  border: black solid 1px;
  width: 20px;
  font-size: 20px;
`

const StyledH1 = styled.h1`
    border: black solid 1px;
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
const StyledInput = styled.input`
`
const StyledButton = styled.button`
`

const Search = () => {
    const {
        accessToken
    } = useUser();

    const navigate = useNavigate();
    const {register, getValues, handleSubmit} = useForm();
    const [movies, setMovies ]  = React.useState([]);
    const [success, setSuccess] = React.useState(false);

    const [page,setPage] = React.useState(1);

    const backToSearch = () => {
        setSuccess(false);
        setPage(1);
    }

    const increasePageByOne = () => {
        setPage(page+1);

        const title = getValues("title");
        const genre = getValues("genre");
        const year = getValues("year");
        const director = getValues("director");
        const orderBy = getValues("orderBy");
        const direction = getValues("direction");
        const limit = getValues("limit");

        const payload = {

            title: title === "" ? null : title,
            genre: genre === "" ? null : genre,
            year: year === "" ? null : year,
            director: director === "" ? null : director,
            orderBy: orderBy === "" ? null : orderBy,
            direction: direction === "" ? null : direction,
            limit: limit === "" ? null : limit,
            page: page === "" ? null : page
        }

        Idm.nextSearch(accessToken, payload, page+1)
            .then(response => {
                setMovies(response.data.movies)
                setSuccess(true)

            })
            .catch(error => {
                alert(JSON.stringify(error.response.data, null, 2))
                setSuccess(false)
                setPage(1)
            })

    }
    const decreasePageByOne = () =>{
        setPage(page-1);

        const title = getValues("title");
        const genre = getValues("genre");
        const year = getValues("year");
        const director = getValues("director");
        const orderBy = getValues("orderBy");
        const direction = getValues("direction");
        const limit = getValues("limit");

        const payload = {

            title: title === "" ? null : title,
            genre: genre === "" ? null : genre,
            year: year === "" ? null : year,
            director: director === "" ? null : director,
            orderBy: orderBy === "" ? null : orderBy,
            direction: direction === "" ? null : direction,
            limit: limit === "" ? null : limit,
            page: page === "" ? null : page
        }

        Idm.nextSearch(accessToken, payload, page-1)
            .then(response => {
                setMovies(response.data.movies)
                setSuccess(true)
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data, null, 2))
                setSuccess(false)
                setPage(1)
            })
    }

    const searchM = () => {

        const title = getValues("title");
        const genre = getValues("genre");
        const year = getValues("year");
        const director = getValues("director");
        const orderBy = getValues("orderBy");
        const direction = getValues("direction");
        const limit = getValues("limit");
        const page = getValues("page");

        const payload = {

            title: title === "" ? null : title,
            genre: genre === "" ? null : genre,
            year: year === "" ? null : year,
            director: director === "" ? null : director,
            orderBy: orderBy === "" ? null : orderBy,
            direction: direction === "" ? null : direction,
            limit: limit === "" ? null : limit,
            page: page === "" ? null : page
        }

        Idm.search(accessToken, payload)
            .then(response => {
                setMovies(response.data.movies)
                setSuccess(true)
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data, null, 2))
                setSuccess(false)
            })

    }

    return (

        <StyledDiv>
            {!success &&
                <StyledDiv>Search With Title
                    <input {...register("title")} type={"title"}/>
                </StyledDiv>
            }
            {!success &&
                <StyledDiv> Search With Year
                    <input {...register("year")} type={"year"}/>
                </StyledDiv>
            }
            {!success &&
                <StyledDiv> Search With Director
                    <input {...register("director")} type={"director"}/>
                </StyledDiv>
            }
            {!success &&
                <StyledDiv> Search With Genre
                    <input {...register("genre")} type={"genre"}/>
                </StyledDiv>
            }
            {!success &&
                <StyledDiv> SortBy:
                    <select {...register("orderBy")}>
                        <option value = {"title"}>TITLE</option>
                        <option value = {"rating"}>RATING</option>
                        <option value = {"year"}>YEAR</option>
                    </select>
                </StyledDiv>
            }
            {!success &&
                <StyledDiv> OrderBy:
                    <select {...register("direction")}>
                        <option value = {"asc"}>ASC</option>
                        <option value = {"desc"}>DESC</option>
                    </select>
                </StyledDiv>
            }
            {!success &&
                <StyledDiv> Limit:
                    <select {...register("limit")}>
                        <option value = {10}>10</option>
                        <option value = {25}>25</option>
                        <option value = {50}>50</option>
                        <option value = {100}>100</option>
                    </select>
                </StyledDiv>
            }
            {!success &&
                <button onClick={handleSubmit(searchM)}>Search</button>
            }

            {!!success &&
                <SyledTable>

                    <tr>
                        <SyledTH>Title</SyledTH>
                        <SyledTH>Year</SyledTH>
                        <SyledTH>Director</SyledTH>
                        <SyledTH>Detail</SyledTH>
                    </tr>
                    {
                        movies.map(movies => (
                            <tr>
                                <SyledTD>{movies.title}</SyledTD>
                                <SyledTD>{movies.year}</SyledTD>
                                <SyledTD>{movies.director}</SyledTD>
                                <button onClick={ () =>navigate("/search/" + movies.id)}>Detail</button>
                            </tr>
                        ))
                    }

                </SyledTable>
            }
            {!!success &&
                <button onClick={handleSubmit(increasePageByOne)}>Next</button>
            }
            {!!success &&
                <button onClick={handleSubmit(decreasePageByOne)}>Prev</button>
            }
            {!!success &&
                <button onClick={handleSubmit(backToSearch)}>BackToSearch</button>
            }
        </StyledDiv>
    );
}

export default Search;