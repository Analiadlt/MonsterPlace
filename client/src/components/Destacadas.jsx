import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import Card from "./Card";
import { getCard } from "../redux/actions";
import Prueba from "./Prueba";
import Car from './Car'
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
                <div>
                    <Car/>
                </div>
                
            </div>
        </div>
    )


}