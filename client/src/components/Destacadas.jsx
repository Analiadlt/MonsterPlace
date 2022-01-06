import React from "react";
import { useSelector } from 'react-redux';
import Card from "./Card";

export default function Destacadas() {
    const dragones = useSelector(state => state.dragones)
    return(
        <div className="destacadas">
            <div className="contenedor-destacadas">
                <h2>Destacadas:</h2>
                <div className="grid-destacadas">
                {
                dragones.map(dragon=>
                    <Card name={dragon.name} atack={dragon.atack} defense={dragon.defense}  img={dragon.img} price={dragon.price} />
                ) 
                }
                </div>
                
            </div>
        </div>
    )


}