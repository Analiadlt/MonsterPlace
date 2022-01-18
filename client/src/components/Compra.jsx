import React, { useEffect } from "react";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Card from '../components/Card'
import { useSelector, useDispatch } from "react-redux";
import { getCard } from "../redux/actions";
import { Link } from "react-router-dom";
import Nav from "./Nav";


export default function Compra() {
    const loading = useSelector(state => state.loading)
    const dragones = useSelector(state => state.carrito)
    const dispatch = useDispatch()
    const carrito = useSelector(state => state.carrito)

    function sumarCarrito(carrito) {
        let total = 0;
        for (let i = 0; i < carrito.length; i++) {
            total += Math.round(carrito[i].sellPrice);
        }
        return Math.round(total);
    }


    return (
        <div>
            <Nav />
            <div className="background-tienda">
                <div className="contenedor-tienda">

                    <div className="titulo-tienda">
                        <h1>Detalle</h1>

                    </div>
                    {loading.loading ? <h1>Cargando...</h1> :
                        <div className="contenedor-tajetas">
                            <div className="grid-tienda">
                                {
                                    dragones.map(dragon =>
                                        <Card name={dragon.name} atack={dragon.attack} defense={dragon.defense} img={dragon.img} price={dragon.sellPrice} />
                                    )
                                }
                            </div>
                        </div>
                    }

                    <div className="seccion-compra">
                        <h1>Total:</h1>
                        <h3>$  {sumarCarrito(carrito)}</h3>
                    </div>
                    <div>
                        <button>Realizar Compra</button>
                    </div>
                </div>
            </div>


        </div>

    )
}
