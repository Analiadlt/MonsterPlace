import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCard } from '../../redux/actions';
import CartaTienda from '../cartaTienda';




export default function Inventario() {

  const dispatch = useDispatch();
  const cardsDetail = useSelector(state => state.userCards)
  const user = useSelector(state => state.userLogueado.email)
  const userId = useSelector(state => state.userLogueado.id)
 
// console.log("Datos de los Usuarios desde Inventario: ", userId)
// console.log("User Email Logeado desde Inventario ", user)


// const resultado = users.find( e=> e.email === user );

// console.log ("Encontrado desde inventario", resultado.id)




// const uId = resultado?.id



// console.log("Id del usuario: " , uId.id)

  
  
  
  useEffect(() => { 
      
      if(!user){
          alert("No hay user")
      } else {
      dispatch(getUserCard(userId))
      }
  }, [dispatch, user, userId]);

//   console.log("Cartas desde inventario", cardsDetail)




    return(
        <div className="grid-inventario">
              {
                cardsDetail?.map(c => 
                   
                   <CartaTienda
                             
                   name={c.name} attack={c.attack} defense={c.defense} img={c.img} price={c.sellPrice} type={c.type} 

                    />
                )
              }
    </div>
    )




}