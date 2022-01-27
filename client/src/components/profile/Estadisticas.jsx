import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStats } from "../../redux/actions";
import moment  from 'moment';

export default function Estadisticas() {
  
  const dispatch = useDispatch();
  const usuario = useSelector(state => state.userLogueado)
  const stats = useSelector ((state)=> state.stats);
 
  useEffect(() => {      
      if(!usuario){
          alert("No hay user")
      } else {
        dispatch(getUserStats(usuario.email))
      }
  }, [dispatch, usuario]);

  const compras = stats?.filter(s => s.payment_status === "approved")
  let ultima = "01/01/2022";
  let cards = [];
  for (let i=0; i<compras.length; i++) {
    if (compras[i].updatedAt > ultima) {
      ultima = compras[i].updatedAt;
      cards = compras[i].cards
    }
  }
   
  function sumar(cards){
   let total = 0;
   for(let i = 0 ; i < cards.length; i++){
      total += Math.ceil(cards[i].sellPrice);
    }
    return total;
  }
  
  return (
    <div className="profile">
      
      <div className="grid-info">
        <div className="campo contrase">
          <i class="fas fa-edit"></i> Partidas ganadas: <span>{usuario.win_games}</span>
        </div>
        <div className="campo contrase">
          <i class="fas fa-edit"></i> Partidas perdidas: <span>{usuario.lost_games}</span>
        </div>
        
         { (ultima !== "01/01/2022")? 
         <>
            <div className="campo contrase">
              <i class="fas fa-edit"></i>Última compra: <span>{moment(ultima).format('DD/MM/YYYY')}</span>
              <span>${sumar(cards)}</span>
           </div> 
           <div className="campo">
           <i class="fas fa-edit"></i>Últimas cartas
           <ul>{cards.map(c => <li>{c.name} ${Math.ceil(c.sellPrice)}</li>)}</ul>
          </div> 
          </>
           : <div className="campo">
              <i class="fas fa-edit"></i>No ha realizado compras recientemente.
             </div> 
           }
      
      </div>
    </div>
  );
}
