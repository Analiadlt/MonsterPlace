import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/actions";


export default function Card({ name, atack, defense, img , price }) {
    const dispatch = useDispatch();
    const card ={
        name
        , atack
        , defense
        , img 
        , price
    } 
    return (
        <div>
            <div className='card' >
                <div className="fondo">
                    <img src={img} alt="" className="card_img" />
                </div>
                <div className="card-contenido">
                    <h3 className="card-nombre" >{name}</h3>
                    <div className="card-grid">
                        <div className="caracteristicas">
                            <div className="carac">
                                <h3>Ataque:</h3><span>{atack}</span>

                            </div>
                            <div className="carac">
                                <h3>Defensa:</h3><span>{defense}</span>
                            </div>
                        </div>
                        <div className="precio">
                            <h3>Precio:</h3>
                            <span>Ars: ${price}</span>

                        </div>
                    </div>
                    <div className="btn-card">
                        <button className="btn-gl btn-ver-detalle">Ver Detalle</button>
                        {window.location.pathname === '/'?
                            <Link to='/Tienda'>
                                <button className="btn-gl btn-comprar">Comprar</button>
                            </Link> :
                            <button className="btn-gl btn-comprar" onClick={()=>dispatch(addCart(name))}>Comprar</button>
                        }       
                    </div>

                </div>

            </div>
        </div>
    )
}