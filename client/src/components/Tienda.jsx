import React from "react";
import Nav from "./Nav";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export default function Tienda(){
    return(
        <div>
            <div className="contenedor">
                <div className="titulo-tienda">
                    <h1>Tienda</h1>
                    <span className="carrito"><ShoppingBasketIcon fontSize="3rem"/></span>
                </div>
            </div>
        </div>

    )
}