import React from "react";
import {useSelector} from 'react-redux'
import Card from "../Card";

export default function Juego(){
    const cartas = useSelector(state => state.dragonesbd)
    const muestra = cartas.slice(0,3)
    return(
        <div>
            <div>
                {console.log(muestra)}
                jugador2
            </div>
            <div>
                <h1>Cartas Disponibles</h1>
                <div className="carta-jugador">
                {
                    muestra.map(carta => 
                        <div className="carta-us">
                            <Card name={carta.name} atack={carta.attack} defense={carta.defense}  img={carta.img} price={carta.sellPrice} />
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    )
     
}