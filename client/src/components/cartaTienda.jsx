import React from "react";
import dragon from '../img/bichorojo.png'
import DetalleDr from "./ModalDetalle";
import { Link } from "react-router-dom";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { useDispatch } from "react-redux";
import { addCart } from "../redux/actions";
export default function CartaTienda({ img, name, attack, defense, efect, price, type }) {
    const dispatch = useDispatch()
    return (

        <div id={name} className="carta3d">
            <div id='carta3d' className={`contenido3d ${efect} girar`}>
                <div className="frontCarta logo-carta">
                    q
                </div>
                <div className="backCarta">
                    <div className="contenedor-imagen">
                        <img src={img} alt="" />
                    </div>
                    <div className="contenido-to">
                        <h1>{name}</h1>
                        <div className="radios">
                            <div className="caracteristicasFondo">
                                <div className="caract">
                                    <i class="fab fa-fort-awesome"></i><span>{defense}</span>

                                </div>
                                <div className="caract">
                                    <i class="fab fa-gripfire"></i><span>{attack}</span>
                                </div>
                            </div>
                            <div className="precio-carta">
                                Ars${price}
                            </div>
                            <div className="botones">
                                <button className="btn-cart btn-detalle"><DetalleDr name={name} attack={attack} defense={defense} img={img} type={type} /></button>
                                
                                <button className="btn-cart btn-comprar" onClick={() => dispatch(addCart(name))}>Comprar</button>
                            </div>
                            <div className="botones">
                                
                                


                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>





    )

}
