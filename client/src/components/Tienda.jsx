import React, { useEffect } from "react";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Card from '../components/Card'
import { useSelector, useDispatch } from "react-redux";
import { getCard } from "../redux/actions";
import { Link } from "react-router-dom";

import Modal1 from "./Modal";
import { Modal } from "@mui/material";
import Filtros from "./filtrosTienda";
import NavCheto from './NavCheto';
import CartaTienda from "./cartaTienda";
export default function Tienda() {
    const loading = useSelector(state => state.loading)
    const dragones = useSelector(state => state.dragonesbd)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!dragones.length && !loading.loading) {
            dispatch(getCard())
        }
    })

    return (
        <div>
            <NavCheto />
            <div className="nav-tienda">
                
                <h3 className={`tiendaNft ${window.location.pathname === "/Tienda" ? "activoTienda" : null}`}><Link to='/Tienda' className='link-tienda'>Crypis</Link></h3>
                
                <h3 className={`tiendaNft ${window.location.pathname === "/TiendaNft" ? "activoTienda" : null}`}><Link to='/TiendaNft' className='link-tienda'>NFT</Link></h3>
    
            </div>
{/*             <div className="muestra contenedor-cheto" >
                <CartaFondo name={dragones[0]?.name} attack={dragones[0]?.attack} defense={dragones[0]?.defense} img={dragones[0]?.img} price={dragones[0]?.sellPrice} type={dragones[0]?.type} efect={'cine'}/>
    
            </div> */}
            <div className="background-tienda">
                <div className="contenedor-tienda">

                    <div className="titulo-tienda">
                        <h1>Tienda</h1>
                        {/* <Link to='/Carrito'> */}
                        <Modal1 />
                        {/* </Link> */}
                    </div>

                    
                    {loading.loading ? <h1>Cargando...</h1> :
                        <div className="contenedor-tajetas">
                            <div className="grid-tienda">
                                {
                                    dragones.map(dragon =>
                                        <div className="cart-tienda">
                                            <CartaTienda name={dragon.name} attack={dragon.attack} defense={dragon.defense} img={dragon.img} price={dragon.sellPrice} />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}


