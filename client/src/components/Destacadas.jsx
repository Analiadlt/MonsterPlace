import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import Card from "./Card";
import { getCard } from "../redux/actions";
export default function Destacadas() {
    const dragones = useSelector(state => state.dragones)
    const loading = useSelector(state => state.loading)
    const cartasbd = useSelector(state => state.cartasbd)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!cartasbd.length && !loading.loading) {
            dispatch(getCard())
        }
    })

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