import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/actions";
import { useSelector } from "react-redux";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import DetalleDr from "./ModalDetalle";
export default function Card({ name, atack, defense, img , price, type }) {
    
    const dispatch = useDispatch();
    const loading = useSelector(state=>state.loading)
    return (
        <div>
            <div className='card' >
                <div className="fondo">
                    { loading.loading? <h1>Cargando...</h1>:
                    <img src={img} alt="" className="card_img" />
                    }
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
                        <DetalleDr name={name} attack={atack} defense={defense} img={img} type={type}/>
                        {window.location.pathname === '/'?
                            <button className="btn-gl btn-comprar">
                            <Link to='/Tienda' className="links" >
                                Tienda <span style={{position:'relative', top:'3px'}}><LocalMallOutlinedIcon fontSize="large" /></span>
                            </Link> </button> :
                            <button className="btn-gl btn-comprar" onClick={()=>dispatch(addCart(name))}>Agregar <span style={{position:'relative', top:'3px'}}><AddShoppingCartOutlinedIcon fontSize="large" /></span></button>
                        }  
                    
                    </div>

                </div>

            </div>
        </div>
    )
}