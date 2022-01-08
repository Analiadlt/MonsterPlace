import React from "react";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Card from '../components/Card'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Modal1 from "./Modal";
import { Modal } from "@mui/material";
import Filtros from "./filtrosTienda";

export default function Tienda(){
    const dragones = useSelector(state => state.dragonesbd)
    return(
        <div>
            <Nav/>
            <div className="contenedor-tienda">
                <div className="titulo-tienda">
                    <h1>Tienda</h1>
                    {/* <Link to='/Carrito'> */}
                   <Modal1/>
                    {/* </Link> */}
                </div>

                <div className="contenedor-tajetas">
                    <div className="grid-tienda">
                        <div>
                            <Filtros/>
                        </div>
                    {
                    dragones.map(dragon=>
                        <Card name={dragon.name} atack={dragon.atack} defense={dragon.defense}  img={dragon.img} price={dragon.price} />
                    ) 
                    }
                    </div>
                </div>
            </div>
            
        </div>

    )
}

