import axios from "axios";

export const CAMBIAR_FONDO = "CAMBIAR_FONDO"
export const ADD_USER = "ADD_USER"
export const GET_USER = "GET_USER"
export const LOADING = "LOADING"


export function cambiarFondo() {
    return{ type: CAMBIAR_FONDO, payload: 'MODO'} 
}

// export function addUser() {
//     return{ type: ADD_USER, payload: 'values'}
// }

export function addUser(payload) {
  console.log("Datos para posteo", payload)
    return async (dispatch) => {
      try {
        var json = await axios.post(`http://localhost:3001/user`, payload);
        return dispatch({
          type: ADD_USER, 
          payload: json,
        });
      } catch (error) {
        console.log(error);
      }

    }

}

export function getUser() {
  return function (dispatch) {
      dispatch({ type: LOADING, payload: 'Buscando Usuarios...' })
      return axios.get('http://localhost:3001/user')
          .then(res => res.data)
          .then(data => dispatch({ type: GET_USER, payload: data }))
  }
}