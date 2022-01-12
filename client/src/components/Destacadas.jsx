import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import Card from "./Card";
import { getCard } from "../redux/actions";
import Prueba from "./Prueba";
import Car from './Car'
export default function Destacadas() {
    const loading = useSelector(state => state.loading)
    const cartasbd = useSelector(state => state.dragonesbd)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!cartasbd.length && !loading.loading) {
            dispatch(getCard())
        }
    })

    return(
        <div className="destacadas">
            {loading.loading ? <h1>cargando...</h1>:
            <div className="contenedor-destacadas">
                <h2>Crypys Destacados:</h2>
                <div>
                    {cartasbd.length > 0 ?

                    <Car/>
                    : <h1>cargando</h1>
                    }
                </div>
                
            </div>
}
        </div>
    )


}