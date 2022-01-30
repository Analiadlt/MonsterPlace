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
export const USER_LOG = "USER_LOG";
export const PARTIDA = "PARTIDA";
export const SELL_ORDER = "SELL_ORDER";
export const GET_ORDERS = "GET_ORDERS";
export const GET_PAGAR = "GET_PAGAR";
export const RESTAR_SALDO = "RESTAR_SALDO";
export const CARGAR_SALDO = "CARGAR_SALDO";
export const ADD_METAMASK_ACCOUNT = "METAMASK_ACCOUNT";
export const ADD_CARD_NFT = "ADD_CARD_NFT"
export const GET_USER_CARD = "GET_USER_CARD"
export const LINK_USER_CARDNFT ="LINK_USER_CARDNFT"
export const AGREGAR_MAZO ="AGREGAR_MAZO";
export const GET_USER_STATS = "GET_USER_STATS"
export const ADD_CARD ="ADD_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const GET_CARD_ID = "GET_CARD_ID";


export function cambiarFondo() {
  return { type: CAMBIAR_FONDO, payload: "MODO" };
}

// Funcion para crear usuario
export function addUser(payload) {
  return async (dispatch) => {
    try {
      var json = await axios.post(`/users`, payload);
      return dispatch({
        type: ADD_USER,
        payload: json,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postCardNFT(payload) {
  return async (dispatch) => {
    try {
      var json = await axios.post('/postcards', payload);
      return dispatch({
        type: ADD_CARD_NFT,
        payload: json,
      });
    } catch (error) {
      console.log(error);
    }
  };
}


export function addMetamaskAccount(payload) {
  return async (dispatch) => {
    try {
      var json = await axios.put(`/putmetamask`, payload);
      return dispatch({
        type: ADD_METAMASK_ACCOUNT,
        payload: json,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getCard(orden) {
  return function (dispatch) {
    /* dispatch({ type: LOADING, payload: 'Buscando Cartas...' }) */
    return axios
      .get("/cards/get?orden=" + orden)
      .then((res) => res.data)
      .then((data) => dispatch({ type: GET_CARDS, payload: data }));
  };
}

// Funcion para verificar login de usuario
export function loginUser(payload) {
  console.log("datos enviados para ac", payload);

  return async (dispatch) => {
    try {
      var json = await axios.post(`/login/loginUser`, payload);

      console.log("Datos para posteo", json.data);

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

export function loginUserMetamask(payload) {
  console.log("loginUserMetamask", payload);

  return async (dispatch) => {
    try {
      var json = await axios.post('/loginMetamask', payload);
      console.log("respuesta de login user meta", json)
      return dispatch({
        type: LOGIN_USER,
        payload: json.data,
      });
    } catch (error) {
      console.log('problemas action loginUserMetamask', error)
      return dispatch({
        type: LOGIN_USER,
        payload: "400",
      });
    }
  };
}

//Obtener todos los usuarios
export function getUser() {
  return function (dispatch) {
    return axios
      .get("/users")
      .then((res) => res.data)
      .then((data) => dispatch({ type: GET_USER, payload: data }));
  };
}

//Obtener un usuario por ID
export function getById(id) {
  console.log("id desde actions", id);
  return async (dispatch) => {
    try {
      var json = await axios.get(`/users/${id}`);
      console.log("Data Desde Actions", json.data);
      return dispatch({
        type: GET_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//Obtener un usuario por Email
export function getUserLogin(em) {
  let email = { email: em };
  console.log("email desde actions", email);

  return async (dispatch) => {
    try {
      // console.log("email desde actions", email);
      var json = await axios.post(`/loginInfo/loginInformation`, email);
      console.log("Data Desde Actions", json.data);
      return dispatch({
        type: LOGIN_USER,
        payload: json.data[0],
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUserLoginMetamask(payload) {
   console.log(payload);
  return async (dispatch) => {
    try {
      var json = await axios.post(`/loginInformationMetamask`, payload);
      return dispatch({
        type: LOGIN_USER,
        payload: json.data[0],
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

//Reset para formulario
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

//reset usuario

export function loginReset() {
  return { type: RESET_LOGIN, payload: [] };
}

export function usuarioLog(user) {
  return { type: USER_LOG, payload: user };
}

export function empezarPartida(bolea) {
  return { type: PARTIDA, payload: bolea };
}

export function sellOrder(order) {
  console.log("orden de compra", order);
  return async (dispatch) => {
    try {
      var json = await axios.post(`/order`, order);
      console.log(
        "Orden ID desde Actions: ",
        json.data.id,
        "User ID: ",
        json.data.userId
      );
      return dispatch({
        type: SELL_ORDER,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOrder(id) {
  console.log("id de orden desde GET Actions", id);
  return async (dispatch) => {
    try {
      var json = await axios.get(`/detalle/${id}`);
      console.log("Orden de Compra GET ID desde Actions: ", json.data);
      return dispatch({
        type: GET_ORDERS,
        payload: json,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPagar(oId) {
  console.log("Id orden GET-PAGAR desde actions", oId);
  return async (dispatch) => {
    try {
      const params = { id_order: oId };
      var json = await axios.get("/mercadopago", { params });
      console.log("Datos GET_PAGAR desde ACTIONS: ", json.data);
      return dispatch({
        type: GET_PAGAR,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function cargarSaldo(payload) {
  return async (dispatch) => {
    console.log("cargar saldo payload", payload);

    var json = await axios.put(`/putsumamonedas`, payload);
    console.log("respuesta cargar saldo", json.data[0].saldo_cryps);

    return dispatch({
      type: CARGAR_SALDO,
      payload: json.data[0].saldo_cryps,
    });
  };
}



export function restarSaldo(payload) {
  // return{ type: RESTAR_SALDO, payload:6 }
  return async (dispatch) => {
    console.log("restar saldo payload", payload);

    var json = await axios.put(`/putrestamonedas`, payload);
    console.log("respuesta restar saldo", json.data[0].saldo_cryps);

    return dispatch({
      type: RESTAR_SALDO,
      payload: json.data[0].saldo_cryps,
    });
  };
}

export function getUserCard(cId){
  //console.log('User id desde actions', cId);
  return async (dispatch) => {
    try {
      var json = await axios.get(`/CardUser/userCard/${cId}`);
      console.log("Data Desde Actions", json.data[0].cards);
      console.log("Longitud Data Desde Actions", json.data[0].cards.length);
      return dispatch({
        type: GET_USER_CARD,
        payload: json.data[0].cards,
      });
    } catch (error) {
      console.log(error);
    }
  };

}


export function linkUserNFTcard(payload){
  console.log('User id desde actions', payload);
  return async (dispatch) => {
    try {
      var json = await axios.put("/putlinkusercardNFT", payload);
      console.log("link card action", json)
      return dispatch({
        type: LINK_USER_CARDNFT,
        payload: json.data[0].cards,
      });
    } catch (error) {
      console.log(error);
    }
  };

}


export function subirmazo(payload) {
  return async (dispatch) => {
   
    return dispatch({
      type: AGREGAR_MAZO,
      payload: payload
    });
  };
}

//Obtener las compras de un usuario por Email
export function getUserStats(email) {
    
  return async (dispatch) => {
    try {
      var json = await axios.get("/stats/"+ email);
      return dispatch({
        type: GET_USER_STATS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postCardNormal(payload) {
  return async (dispatch) => {
   
      var json = await axios.post('/cards', payload);

      console.log('crear carta',json)
      if(json.data.id){

        return dispatch({
          type: ADD_CARD,
          payload: true,
        });
      }else{
        return dispatch({
          type: ADD_CARD,
          payload: false,
        });
      }


    } 
  };

  export function deleteCard(id) {
    console.log("ID CARTA DESDE ACTIONS: ", id)
    return async (dispatch) => {
      try {
        var json = await axios.delete(`/delete/card/${id}`);
      
        return dispatch({
          type: "DELETE_CARD",
          payload: json.data,
        });
      } catch (error) {
        alert("No se encuentra la carta")
        console.log(error);
      }
    };
  }



  export function resultadoJuego(payload){
    console.log('mando a api', payload);
    return async (dispatch) => {
      try {
        var json = await axios.put("/resultado", payload);
        console.log("recibo de api", json)
       
      } catch (error) {
        console.log(error);
      }
    };
  
  }

  export function getCardId(id){
    return async (dispatch) => {
      try {
        var json = await axios.get(`/cards/get/${id}`);
      
        return dispatch({
          type: "GET_CARD_ID",
          payload: json.data,
        });
      } catch (error) {
        alert("No se encuentra la carta")
        console.log(error);
      }
    };

  }

