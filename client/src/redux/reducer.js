
import {CAMBIAR_FONDO, ADD_USER, GET_USER, LOADING, ADD_CART , 
    LOGIN_USER, REMOVE_CART , RESET_USER, GET_CARDS, GET_BY_ID, 
    RESET_LOGIN, USER_LOG, PARTIDA , SELL_ORDER, GET_ORDERS} from './actions'




const initialState = {
    //validador de modo de color de la pagina 
    modo :'claro',
    //cartas hardcode
    user:[],

    dragonesbd:[],
    
    partida:false,
    //recolecta la informacion del usuario para crearlo 

    //informacion del usuario que se encuentra logueado 
    userLogueado:[],

    //carga la informacion para enviar del login
    userLogin:{
        email: '',
        password: '',
    },

    //trae todos los usuarios de la base de datos 
    users:[],

    //carrito de compras
    carrito:[],

    //trae todas las cartas 

    //informacion para el detalle del usuario
    userDetail:[],

    //tiempo de espera de las actions
    loading:{

        loading:false,
        message:''

    },

    //Carga ordenes de compra
    orden: [],
    //trae todas las ordenes de compra
    ordenes: [],
    


}

export default function Reducer(state=initialState, action){    

    switch (action.type) {
        case LOADING:
            return{
                ...state,
                loading:{
                    loading:true,
                    message: action.payload
                }

            }
        case CAMBIAR_FONDO:
          return {

              modo:state.modo === 'claro'?
              'oscuro':
              'claro'

          }
          case ADD_USER: 
            return {
                ...state,
                 user: action.payload 
          }

          case LOGIN_USER: 
          
            return {
                ...state,
                 userLogueado: action.payload 
          }
          case RESET_LOGIN: 
          
            return {
                ...state,
                 userLogueado: action.payload 
          }
          case RESET_USER: 
            return {
                ...state,
                 user: action.payload 
          }

          case GET_USER:
              return{
                    ...state,
                    users: action.payload === 'No se encontraron usuarios'?
                    []:
                    action.payload
                    ,
                    loading:{
                        loading:false,
                        message:''
                    }
              }
        case GET_BY_ID:
                console.log("Desde Reducer ID", action.payload)
            return {
                 ...state, 
                userDetail: action.payload,
                
            };

            case GET_CARDS:
                return{
                ...state,
                dragonesbd: action.payload,
                loading:{
                    loading: false,
                    message: ''
                    } 
            }
            case ADD_CART:
                return{
                    ...state,
                    carrito: !state.carrito.find(dra=> dra.name === action.payload)?
                        [...state.carrito, state.dragonesbd.find(dra=> dra.name === action.payload)]:
                        state.carrito
                }
            case REMOVE_CART:
                return{
                    ...state,
                    carrito: state.carrito.filter(card => card.name !== action.payload)
                }
            case USER_LOG:
                return{
                    ...state,
                    userLogueado: action.payload
                }
            case PARTIDA:
                return{
                    ...state,
                    partida:action.payload
                }
            case SELL_ORDER: 
            console.log("Orden desde el Reducer: ", action.payload)
                return {
                    ...state,
                    user: action.payload 
          }
          case GET_ORDERS:
            console.log("Ordenes desde el reducer", action.payload)
                return {
                ...state, 
                userDetail: action.payload,
            
            };
          default:
            return state;

}}

