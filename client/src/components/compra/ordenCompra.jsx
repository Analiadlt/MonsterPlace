import React, { Fragment } from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sellOrder, pagar} from '../../redux/actions'
import Card from '../Card'
import NavCheto from '../NavCheto';

export default function Comprar() {
  const dispatch = useDispatch()
  const email = useSelector(state => state.userLogueado.email)
  const cards = useSelector(state => state.carrito)
  const dragones = useSelector(state => state.carrito)
  const datos = useSelector(state => state.userLogueado)
let allCards = []

console.log("UserLoeado desde odernCompra: ", datos)

  function cargarCards(cards) {
      let array = []
    for (let i = 0; i < cards.length; i++) {
        array.push(cards[i].id)

    }
    return array
    
  }


  console.log("Todas las cartas desde comprar: ", allCards)



//   const cards = useSelector(state => state.cards)
  


  const [state, setState] = useState({
    email: email,
    allCards: cargarCards(cards),
 })



const onSubmit = (e) => {
    e.preventDefault()
    if (state.email && state.allCards.length > 0) {
        console.log("dede form: ", state.email, state.allCards)
        dispatch(sellOrder(state))
    }
    else {
        console.log('ERROR')
    }
}
return (
    <div>
        <NavCheto />
        <div>
            <h2 >Prueba</h2>
                <form onSubmit={onSubmit}>
                    <div className="usuario-box">
                        <h3> Email: </h3>
                        <input
                        
                        className="form-control"
                        name="email"
                        value={state.email}
                        readOnly/>
                    </div>
                    <div className="usuario-box">
                        <h3> Cards ID: </h3>
                        <input
                        
                        className="form-control"
                        name="email"
                        value={state.allCards}
                        readOnly/>
                    </div>
  
                    <div className="grid-tienda">
                                {
                                    dragones.map(dragon =>
                                        <Card name={dragon.name} atack={dragon.attack} defense={dragon.defense} img={dragon.img} price={dragon.sellPrice} />
                                    )
                                }
                            </div>
                
                    <div className='botonn'>
                        <button type="submit" className="btn btn-primary">Ir a Pagar</button>
                    </div>
            
                </form>
        </div>
    </div>
    );


}
