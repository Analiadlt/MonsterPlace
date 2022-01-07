import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

export default function(){
    const carrito = useSelector(state=> state.carrito)
    return(
        <div>
            <h1>Carrito</h1>
            {
                carrito.map( dragon=>
                    <Card name={dragon.name} atack={dragon.atack} defense={dragon.defense}  img={dragon.img} price={dragon.price} />
                )
            }
        </div>
    )

}
