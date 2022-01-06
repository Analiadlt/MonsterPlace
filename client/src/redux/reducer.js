
import {CAMBIAR_FONDO, ADD_USER}  from './actions'
import dragon1 from '../img/recurso4.png'
import dragon2 from '../img/recurso1.png'
import dragon3 from '../img/recurso11.png'

const initialState = {
    modo :'claro',
    dragones:[{
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
        name: 'plover',
        img: dragon3,
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


}
}

export default function Reducer(state=initialState, action){    

    switch (action.type) {
        case CAMBIAR_FONDO:
          return {

              modo:state.modo === 'claro'?
              'oscuro':
              'claro'

          }
          case ADD_USER: {
                return {
                    ...state,
                    user:action.payload
                    
                    
          }
        }

          default:
            return state;

}}

