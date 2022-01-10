import axios from "axios";

export const CAMBIAR_FONDO = "CAMBIAR_FONDO";
export const ADD_USER = "ADD_USER";
export const GET_USER = "GET_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOADING = "LOADING";
export const ADD_CART = "ADD_CART";
export const REMOVE_CART = "REMOVE_CART";
export const RESET_USER = "RESET_USER";
export const RESET_LOGIN = "RESET_LOGIN";
export const GET_CARDS = "GET_CARDS";
export const GET_BY_ID = "GET_BY_ID";



export function cambiarFondo() {
  return { type: CAMBIAR_FONDO, payload: "MODO" };
}

export function addUser(payload) {
  return async (dispatch) => {
    try {
      var json = await axios.post(`http://localhost:3001/users`, payload);
      return dispatch({
        type: ADD_USER,
        payload: json,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCard() {
  return function (dispatch) {
    dispatch({ type: LOADING, payload: "Buscando Cartas..." });
    return axios
      .get("http://localhost:3001/cards/get")
      .then((res) => res.data)
      .then((data) => dispatch({ type: GET_CARDS, payload: data }));
  };
}

export function loginUser(payload) {
  return async (dispatch) => {
    try {
      var json = await axios.post(
        `http://localhost:3001/login/loginUser`,
        payload
      );
        return dispatch({
        type: LOGIN_USER,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: LOGIN_USER,
        payload: "400",
      });
    }
  };
}

export function getUser() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/users")
      .then((res) => res.data)
      .then((data) => dispatch({ type: GET_USER, payload: data }));
  };
}

export function getById(id) {
   return async (dispatch) => {
    try {
      var json = await axios.get(`http://localhost:3001/users/${id}`);
        return dispatch({
        type: GET_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addCart(card) {
  return { type: ADD_CART, payload: card };
}
export function removeCart(card) {
  return { type: REMOVE_CART, payload: card };
}

export function reset() {
  return {
    type: RESET_USER,
    payload: {
      firstName: "",
      lastName: "",
      email: "",
      nickname: "",
      dob: "",
      password: "",
    },
  };
}

export function loginReset() {
  return { type: RESET_LOGIN, payload: [] };
}
