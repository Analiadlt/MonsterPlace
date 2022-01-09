import React,{useEffect} from "react";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Card from '../components/Card'
import { useSelector,useDispatch } from "react-redux";
import { getCard } from "../redux/actions";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Modal1 from "./Modal";
import { Modal } from "@mui/material";
import Filtros from "./filtrosTienda";

export default function Tienda(){
    const loading = useSelector(state => state.loading)
    const dragones = useSelector(state => state.dragonesbd)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!dragones.length && !loading.loading) {
            dispatch(getCard())
        }
    })

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
                    {
                    dragones.map(dragon=>
                        <Card name={dragon.name} atack={dragon.attack} defense={dragon.defense}  img={dragon.img} price={dragon.sellPrice} />
                    ) 
                    }
                    </div>
                </div>
            </div>
            
        </div>

    )
}

