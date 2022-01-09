
import {CAMBIAR_FONDO, ADD_USER, GET_USER, LOADING, ADD_CART , LOGIN_USER, REMOVE_CART , RESET_USER, GET_CARDS, GET_BY_ID }  from './actions'
import dragon2 from '../img/recurso1.png'
import dragon6 from '../img/recurso9.png'
import dragon9 from '../img/recurso3.png'



const initialState = {
    //validador de modo de color de la pagina 
    modo :'claro',
    //cartas hardcode
    dragones:[{
        name: 'oxonomy',
        img: dragon6,
        atack:85,
        defense: 90,
        type:'Rare',
        price:200


    },
    {
        name: 'octopi',
        img: dragon2,
        atack:85,
        defense: 90,
        type:'Epic',
        price:200

    },
    {
        name: 'succotash',
        img: dragon9,
        atack:85,
        defense: 90,
        type:'Rare',
        price:200


    }

    ],
    dragonesbd:[],
    //recolecta la informacion del usuario para crearlo 
    user:[],
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
    cartasbd:[],
    //informacion para el detalle del usuario
    userDetail:[],
    //tiempo de espera de las actions
    loading:{

        loading:false,
        message:''

    },
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
          case RESET_USER: 
            return {
                ...state,
                 user: action.payload 
          }

          case GET_USER:
              return{
                    ...state,
                    users: action.payload,
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
          default:
            return state;

}}

