import Config from "backend/config.json";
import Axios from "axios";


/**
 * We use axios to create REST calls to our backend
 *
 * We have provided the login rest call for your
 * reference to build other rest calls with.
 *
 * This is an async function. Which means calling this function requires that
 * you "chain" it with a .then() function call.
 * <br>
 * What this means is when the function is called it will essentially do it "in
 * another thread" and when the action is done being executed it will do
 * whatever the logic in your ".then()" function you chained to it
 * @example
 * login(request)
 * .then(response => alert(JSON.stringify(response.data, null, 2)));
 */
async function login(loginRequest) {
    const requestBody = {
        email: loginRequest.email,
        password: loginRequest.password
    };

    const options = {
        method: "POST", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.baseUrl, // Base URL (localhost:8081 for example)
        url: Config.idm.login, // Path of URL ("/login")
        data: requestBody // Data to send in Body (The RequestBody to send)
    }

    return Axios.request(options);
}

async function register(registerRequest) {
    const requestBody = {
        email: registerRequest.email,
        password: registerRequest.password
    };

    const options = {
        method: "POST", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.baseUrl, // Base URL (localhost:8081 for example)
        url: Config.idm.register, // Path of URL ("/register")
        data: requestBody // Data to send in Body (The RequestBody to send)
    }

    return Axios.request(options);
}
async function nextSearch(accessToken,searchRequest,page)
{
    const options = {
        method: "GET", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.searchUrl, // Base URL (localhost:8082 for example)
        url: Config.idm.search, // Path of URL ("/movie/search")
        params: {
            genre: searchRequest.genre,
            title: searchRequest.title,
            year: searchRequest.year,
            director: searchRequest.director,
            orderBy: searchRequest.orderBy,
            direction: searchRequest.direction,
            limit: searchRequest.limit,
            page: page
        },
        headers:{
            Authorization: "Bearer " + accessToken
        }
    }
    return Axios.request(options);
}
async function search(accessToken,searchRequest) {

    const options = {
        method: "GET", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.searchUrl, // Base URL (localhost:8082 for example)
        url: Config.idm.search, // Path of URL ("/movie/search")
        params: {
            id: searchRequest.id,
            genre: searchRequest.genre,
            title: searchRequest.title,
            year: searchRequest.year,
            director: searchRequest.director,
            orderBy: searchRequest.orderBy,
            direction: searchRequest.direction,
            limit: searchRequest.limit,
            page: searchRequest.page
        },
        headers:{
            Authorization: "Bearer " + accessToken
        }
    }
    return Axios.request(options);
}

async function post(id,accessToken){

    const options = {
        method: "GET", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.searchUrl, // Base URL (localhost:8081 for example)
        url: Config.idm.movieDetail + id, // Path of URL ("/ShoppingCart/id")

        headers:{
            Authorization: "Bearer " + accessToken
        }
    }
    return Axios.request(options);
}
async function insertIntoCart(cartRequest, accessToken){
    const requestBody = {
        movieId: cartRequest.movieId,
        quantity: cartRequest.quantity
    };

    const options = {
        method: "POST", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.billingUrl, // Base URL (localhost:8081 for example)
        url: Config.idm.insertCart, // Path of URL ("/ShoppingCart/id")
        data: requestBody,
        headers:{
            Authorization: "Bearer " + accessToken
        }
    }
    return Axios.request(options);
}

async function cartRetrieve(accessToken){

    const options = {
        method: "GET", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.billingUrl, // Base URL (localhost:8081 for example)
        url: Config.idm.retrieveCart, // Path of URL ("/ShoppingCart/id")

        headers:{
            Authorization: "Bearer " + accessToken
        }
    }
    return Axios.request(options);
}

async function cartUpdate(cartRequest, accessToken){
    const requestBody = {
        movieId: cartRequest.movieId,
        quantity: cartRequest.quantity
    }
    const options = {
        method: "POST", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.billingUrl, // Base URL (localhost:8081 for example)
        url: Config.idm.updateCart, // Path of URL ("/ShoppingCart/id")
        data: requestBody,
        headers:{
            Authorization: "Bearer " + accessToken
        }
    }
    return Axios.request(options);
}
async function cartDelete(id,accessToken){

    const options = {
        method: "DELETE", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.billingUrl, // Base URL (localhost:8081 for example)
        url: Config.idm.cartDelete + id, // Path of URL ("/ShoppingCart/id")

        headers:{
            Authorization: "Bearer " + accessToken
        }
    }
    return Axios.request(options);
}
async function cartClear(accessToken){

    const options = {
        method: "POST", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.billingUrl, // Base URL (localhost:8081 for example)
        url: Config.idm.cartClear, // Path of URL ("/ShoppingCart/id")
        headers:{
            Authorization: "Bearer " + accessToken
        }
    }
    return Axios.request(options);
}

async function payment(accessToken){

    const options = {
        method: "GET", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.billingUrl, // Base URL (localhost:8081 for example)
        url: Config.idm.payment, // Path of URL ("/ShoppingCart/id")
        headers:{
            Authorization: "Bearer " + accessToken
        }
    }
    return Axios.request(options);
}

async function complete(paymentIntentId,accessToken){

    const requestBody = {
        paymentIntentId: paymentIntentId
    }

    const options = {
        method: "POST", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.billingUrl, // Base URL (localhost:8081 for example)
        url: Config.idm.complete, // Path of URL ("/ShoppingCart/id")
        data: requestBody,
        headers:{
            Authorization: "Bearer " + accessToken
        }
    }
    return Axios.request(options);
}

async function orderHistory(accessToken){

    const options = {
        method: "GET", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.billingUrl, // Base URL (localhost:8081 for example)
        url: Config.idm.orderList, // Path of URL ("/ShoppingCart/id")

        headers:{
            Authorization: "Bearer " + accessToken
        }
    }
    return Axios.request(options);
}

export default {
    login,register,search,nextSearch,post,insertIntoCart,cartRetrieve,cartUpdate,cartDelete,cartClear,payment,complete,orderHistory
}

