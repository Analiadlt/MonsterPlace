
import {CAMBIAR_FONDO, ADD_USER, GET_USER, LOADING, ADD_CART , LOGIN_USER, REMOVE_CART , RESET_USER }  from './actions'
import dragon1 from '../img/recurso4.png'
import dragon2 from '../img/recurso1.png'
import dragon3 from '../img/recurso11.png'
import dragon4 from '../img/recurso6.png'
import dragon5 from '../img/recurso7.png'
import dragon6 from '../img/recurso9.png'
import dragon7 from '../img/recurso12.png'
import dragon8 from '../img/recurso13.png'
import dragon9 from '../img/recurso3.png'
const initialState = {
    modo :'claro',
    dragones:[        {
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
    dragonesbd:[
        {
            name: 'warlockk',
            img: dragon4,
            atack:85,
            defense: 90,
            type:'Rare',
            price:200
    
    
        },
        {
            name: 'plover',
            img: dragon3,
            atack:85,
            defense: 90,
            type:'Rare',
            price:200
    
    
        },
        {
            name: 'gigadude',
            img: dragon1,
            atack:85,
            defense: 90,
            type:'Legendary',
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
            name: 'ouster',
            img: dragon5,
            atack:85,
            defense: 90,
            type:'Rare',
            price:200
    
    
        },
        {
            name: 'oxonomy',
            img: dragon6,
            atack:85,
            defense: 90,
            type:'Rare',
            price:200
    
    
        },
        {
            name: 'kerplunk',
            img: dragon8,
            atack:85,
            defense: 90,
            type:'Rare',
            price:200
    
    
        },
        {
            name: 'succotash',
            img: dragon9,
            atack:85,
            defense: 90,
            type:'Rare',
            price:200
    
    
        },        {
            name: 'peregrint',
            img: dragon7,
            atack:85,
            defense: 90,
            type:'Rare',
            price:200
    
    
        }

    ],

    user:{
        firstName: '',
		lastName: '',
		email: '',
		nickname: '',
		dob: '',
		password: '',
},
    userLogin:{
        email: '',
        password: '',
    },

    loading:{

        loading:false,
        message:''

    },

    users:[],

    carrito:[]

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
                 user: action.payload 
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

