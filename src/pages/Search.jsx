import styled from "styled-components";
import {useForm} from "react-hook-form";
import React from "react";

import Idm from "backend/idm";
import {useUser} from "../hook/User";
import {useNavigate} from "react-router-dom";


const Styledbody = styled.body`
  background-image: url("https://cdn.pixabay.com/photo/2012/08/27/22/59/movie-projector-55122_960_720.png");
  
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: 100%;

`

const SyledTable = styled.table`
  padding: 0px;
  width: auto;
  border: black solid 1px;

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
const Styledlayout = styled.div`
  opacity: 0.95;
  display: flex;
  flex-direction: column;

  background-color: #f0f0f5;
  width: 50em;
  height: 47em;
  
  padding: 2em;
  margin-top: 1.5em;

  margin-left: auto;
  margin-right: auto;

  border: 1px solid #ebebeb;
  box-shadow: 1px 1px 20px 1px rgba(0,0,0,0.8);
`

const StyledH1 = styled.h1`
  font-size: 2.5em;
  padding-bottom: 0.3em;
  border-bottom: 2px solid #ebebeb;
  text-align: center;
`

const StyledH2 = styled.h2`
  
  background-color: black;
  color: white;
  margin-top: 0.5rem;
  
  border: 1px solid black ;
  padding-top: 0.3em;
  text-align: center;
  height: 1.5em;
  width: 8em;
  border-radius: 10px;
`

const StyledH3 = styled.h3`
  border: 1px solid black ;
  padding-top: 0.3em;
  text-align: center;
  height: 1.5em;
  width: 8em;
  border-radius: 10px;

`

const Styledinput = styled.input`
  width: 27em;
  height: 3.2em;
  display: inline-block;
  border-radius: 10px;
  margin-top: 0.5rem;
  margin-right: 0.1rem;
  margin-left: 0.1rem;
  padding-left: 1em;
  
  font-size: 16px;
  font-weight: bold;
  ::placeholder {
    font-weight: bold;
    opacity: 0.5;
    font-size: 1.5em;
  }
  
`
const Styledtd = styled.td`
  padding-right: 1em;

`

const Styledselect = styled.select`
  width: 6em;
  margin-left: 0.1em;
  height: 2.5em;
  display: inline-block;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 1em;  
`

const Styledtable = styled.table`
  margin-left: auto;
  margin-right: auto;
`
const StyledButtonDetail = styled.button`
  
  background-color: #f0f0f5;
  width: 100%;
  height: 2em;
  border: 1px solid  #f0f0f5 ;

  cursor: pointer;
  :hover{
    color: red;
  }
`
const StyledButtonCustom = styled.button`
  background-color: black;
  color: #fff;
  width: 100%;
  height: 2.5em;
  
  cursor: pointer;
  :hover{
    color: #525252;
  }
`

const StyledButton = styled.button`
  margin-top: 0.5rem;
  background-color: black;
  color: #fff;
  font-weight: bold;
  border-radius: 10px;
  width: 3em;
  padding: 0.5em;
  
  font-size: 30px;
  padding-left: 10px;
  position: relative;
  display: inline-block;
  text-align: center;
  height: 2em;
  
  cursor: pointer;
  :hover{
    color: #525252;
  }
`

const StyledFooter = styled.footer`
  overflow: hidden;
  position: sticky;
  bottom: 0;
  height: 50px;
  width: 100%;
  background-color: black;
  border-top: 1px solid white;
  //padding-top: 1em;
  z-index: 1020;
`


const Search = () => {
    const {
        accessToken
    } = useUser();

    const navigate = useNavigate();
    const {register, getValues, handleSubmit} = useForm();

    const [movies, setMovies ]  = React.useState([]);
    const [genres, setGenres] = React.useState([]);
    const [persons, setPersons] = React.useState([]);

    const [success, setSuccess] = React.useState(false);

    const [menu,setMenu] = React.useState(false);
    const [page,setPage] = React.useState(1);

    const viewMenu = () =>{
        if(menu === false){
            setMenu(true);
        }else{
            setMenu(false);
        }
    }

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
                setGenres(response.data.genres)
                setPersons(response.data.persons)
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
                setGenres(response.data.genres)
                setPersons(response.data.persons)
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
                setGenres(response.data.genres)
                setPersons(response.data.persons)
                setSuccess(true)

            })
            .catch(error => {
                alert(JSON.stringify(error.response.data, null, 2))
                setSuccess(false)
            })

    }

    return (

        <Styledbody>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <Styledlayout>
            <StyledH1>
                Search
            </StyledH1>

            {!!success &&
                <StyledButtonDetail className="material-symbols-outlined" onClick={handleSubmit(backToSearch)}>arrow_back</StyledButtonDetail>
            }

                {!success &&
                    <Styledtable >
                        <tr>
                            <td>
                                <StyledH2>Title</StyledH2>
                            </td>
                            <td>
                                <Styledinput placeholder={" Search with Title"} {...register("title")} type={"title"}/>
                            </td>
                            <td>
                                <StyledButton className="material-symbols-outlined" onClick={handleSubmit(searchM)}>SEARCH</StyledButton>
                            </td>
                            <td>
                                <StyledButton className="material-symbols-outlined" onClick={handleSubmit(viewMenu)}>menu</StyledButton>
                            </td>
                        </tr>
                        {!!menu &&
                            <tr>
                                <td>
                                    <StyledH2>Director</StyledH2>
                                </td>
                                <td>
                                    <Styledinput placeholder={" Search with Director"} {...register("director")}
                                                 type={"director"}/>
                                </td>
                            </tr>
                        }
                        {!!menu &&
                            <tr>
                                <td>
                                    <StyledH2>Genre</StyledH2>
                                </td>
                                <td>
                                    <Styledinput placeholder={" Search with Genre"} {...register("genre")}
                                                 type={"genre"}/>
                                </td>

                            </tr>
                        }
                        {!!menu &&
                            <tr>
                                <td>
                                <StyledH2>Year</StyledH2>
                                </td>
                                <td>
                                <Styledinput placeholder={" Search with Year"} {...register("year")} type={"year"}/>
                                </td>
                            </tr>
                        }
                    </Styledtable>
                }
                <br></br>
                {!success &&
                    <table>
                        {!!menu &&
                            <tr>
                                <td>
                                    <StyledH3>SortBy</StyledH3>
                                </td>
                                <Styledtd>

                                    <Styledselect {...register("orderBy")}>
                                        <option value={"title"}>TITLE</option>
                                        <option value={"rating"}>RATING</option>
                                        <option value={"year"}>YEAR</option>
                                    </Styledselect>

                                </Styledtd>

                                <td>
                                    <StyledH3>Limit</StyledH3>
                                </td>
                                <Styledtd>

                                    <Styledselect {...register("limit")}>
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </Styledselect>

                                </Styledtd>

                                <td>
                                    <StyledH3>OrderBy</StyledH3>
                                </td>
                                <td>

                                    <Styledselect {...register("direction")}>
                                        <option value={"asc"}>ASC</option>
                                        <option value={"desc"}>DESC</option>
                                    </Styledselect>

                                </td>

                            </tr>
                        }
                    </table>
                }
                {!!success &&

                    <SyledTable>
                        <tr>

                            <SyledTH>Image</SyledTH>
                            <SyledTH>Title</SyledTH>
                            <SyledTH>Year</SyledTH>
                            <SyledTH>Director</SyledTH>
                            <SyledTH>Detail</SyledTH>
                        </tr>

                        {
                            movies.map(movies => (
                                <tr>
                                    <SyledTD><img  src={"https://image.tmdb.org/t/p/original" + movies.posterPath} width={"100%"} height={"50"} alt={"movie poster"}/></SyledTD>
                                    <SyledTD>{movies.title}</SyledTD>
                                    <SyledTD>{movies.year}</SyledTD>
                                    <SyledTD>{movies.director}</SyledTD>
                                    <SyledTD> <StyledButtonDetail className="material-symbols-outlined" onClick={ () =>navigate("/search/" + movies.id)}>info</StyledButtonDetail></SyledTD>

                                </tr>
                            ))
                        }

                    </SyledTable>
                }

                {!!success &&
                    <table>
                        <tr>
                            <td>
                                <StyledButtonCustom onClick={handleSubmit(decreasePageByOne)}>Prev</StyledButtonCustom>
                            </td>
                            <td>
                                <StyledButtonCustom  onClick={handleSubmit(increasePageByOne)}>Next</StyledButtonCustom>
                            </td>
                        </tr>

                    </table>

                }

        </Styledlayout>



        </Styledbody>
    );
}

export default Search;