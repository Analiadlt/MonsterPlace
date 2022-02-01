import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";


import { getCard } from "../../redux/actions";
import CartaPanel from "./cartaPanel";
import { Link } from "react-router-dom";



export default function ListadoPanel() {
 
  const loading = useSelector(state => state.loading)
    const bichos = useSelector(state => state.dragonesbd)
    // const bichos = useSelector(state => state.cardsorden)
    const dragones = bichos.filter(bi => bi.createdNFT === false)
    const dispatch = useDispatch()
    const [orden, setOrden] = useState('ASC');

    

    //ordenamiento
    function changeOrder(e) {
        e.preventDefault();
        setOrden(e.target.value);
    };


  useEffect(() => {
    // if (!bichos.length && !loading.loading) {
    dispatch(getCard(orden))
    //    }
}, [dispatch, orden])

  

 

  return (
    <div>
      <div className="background-tienda">
                <div className="contenedor-tienda">

                    <div className="titulo-tienda">
                      <h2>Listado Cartas</h2>
                    
                    <div className="contenedor-filtros">
                            <h5>Ordenar por</h5>
                            <select onChange={(e) => changeOrder(e)} className="filtros">
                                <option value='ASC'>Menor Precio</option>
                                <option value='DESC'>Mayor Precio</option>
                                <option value='A_ASC'>Menor Ataque</option>
                                <option value='A_DESC'>Mayor Ataque</option>
                                <option value='D_ASC'>Menor Defensa</option>
                                <option value='D_DESC'>Mayor Defensa</option>
                            </select>
                          </div>
                    </div>      
                          {loading.loading ? <h1>Cargando...</h1> :
                          <div className="contenedor-tajetas">

                            <div className="grid-tienda">
                                {
                                    dragones.map(dragon => (
                                        
                                        <div className="cart-tienda">
                                            {/* <Link className="Link" to={"/panel/" + dragon.id}> */}
                                            <CartaPanel id={dragon.id} name={dragon.name} attack={dragon.attack} defense={dragon.defense} img={dragon.img} price={dragon.sellPrice} botones={true} />
                                            {/* </Link> */}
                                        </div>

                                    )
                                    )
                                }
                            </div>
                        </div>

                    }
        </div>
      </div>
    </div>
    
  );
}