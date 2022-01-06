import React from "react";
import Nav from "./Nav";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export default function Tienda(){
    return(
        <div>
            <Nav/>
            <div className="contenedor">
                <div className="titulo-tienda">
                    <h1>Tienda</h1>
                    <h1 className="carrito"><ShoppingBasketIcon/></h1>
                </div>
            </div>
        </div>

    )
}