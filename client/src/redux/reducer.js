
import {CAMBIAR_FONDO, ADD_USER, GET_USER, LOADING, ADD_CART , 
    LOGIN_USER, REMOVE_CART , RESET_USER, GET_CARDS, GET_BY_ID,      
     RESET_LOGIN, USER_LOG, PARTIDA , SELL_ORDER, GET_ORDERS,
     RESTAR_SALDO,CARGAR_SALDO, GET_PAGAR, GET_USER_CARD, 
     GET_CARD_ORDEN, AGREGAR_MAZO,  GET_USER_STATS,ADD_CARD, DELETE_CARD,
     GET_CARD_ID
 } from './actions'

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
    order: [],
    //trae todas las ordenes de compra
    orders: [],

    //pago
    getpago: [],

     //trae las cardas segun el id de usuario

    userCards: [],

    mazo:[],

    stats:[],

    addCard:false,

    deleteCard:[],

    getcardid: [],

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
          case RESTAR_SALDO: 
          
            return {
                ...state,
                 userLogueado:{...state.userLogueado,saldo_cryps: action.payload }  
          }
          case CARGAR_SALDO: 
          
            return {
                ...state,
                 userLogueado:{...state.userLogueado,saldo_cryps: action.payload }  
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
                    order: action.payload 
          }
          case GET_ORDERS:
            console.log("Ordenes desde el reducer", action.payload)
                return {
                ...state, 
                orders: action.payload,
            
            };
            case GET_PAGAR:
                console.log("Pagar desde el Reducer: ", action.payload)
                return {
                    ...state,
                    getpago: action.payload
                }
            case GET_USER_CARD:
                    //console.log("Desde Reducer ID usuario", action.payload)
                return {
                     ...state, 
                    userCards: action.payload,
                                  
                }
                case AGREGAR_MAZO:
                    
                return {
                     ...state, 
                    mazo: action.payload,

                };        
                
                case ADD_CARD:
                    
                return {
                     ...state, 
                     addCard: action.payload,
                                  
                }

            case GET_USER_STATS: 
                
                    return {
                        ...state,
                        stats: action.payload 
              }


                case DELETE_CARD:
                    console.log("MENSAJE DESDE EL REDUCER: ", action.payload)
                    return {
                        ...state,
                        deleteCard: action.payload
                        
                };

                case GET_CARD_ID:
                    return{
                        ...state,
                        getcardid: action.payload,
                    }


          default:
            return state;

}}


