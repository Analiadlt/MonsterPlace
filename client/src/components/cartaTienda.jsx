import React from "react";
import DetalleDr from "./ModalDetalle";
import { Link } from "react-router-dom";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { useDispatch , useSelector} from "react-redux";
import Swal from "sweetalert2";
import { addCart } from "../redux/actions";
import huevoRojo from "../img/huevoRojo.png";



export default function CartaTienda({ img, name, attack, defense, efect, price, type, botones }) {
    const usuario = useSelector((state) => state.userLogueado);
    const dispatch = useDispatch()
    // const ataqueDefensa = nfts.description.split(",");

    let enviar = (name)=>{
        console.log('dentro')
        if(!usuario.email){
            Swal.fire({
                imageUrl: `${huevoRojo}`,
                title: "<strong>Debes loguearte para poder comprar</strong>",
                width: 500,
                confirmButtonText: "Continuar",
                imageWidth: 300,
                imageHeight: 400,
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                },
              });
        }
        else{

            dispatch(addCart(name))
        }
    }
    
    
    return (

        <div id={name} className="carta3d">
            <div id='carta3d' className={`contenido3d ${efect} girar`}>
                <div className="frontCarta logo-carta">
               
                </div>
                <div className={`backCarta ${type === 'nft' ? 'nft-back': null}`}>
                    <div className={`contenedor-imagen`}>
                        <img src={img} alt="" />
                    </div>
                    <div className="contenido-to">
                        <h1>{name}</h1>
                        <div className="radios">
                            <div className="caracteristicasFondo">
                                <div className="caract">
                                    <i class="fab fa-fort-awesome icono-cart"></i><span>{defense}</span>

                                </div>
                                <div className="caract">
                                    <i class="fab fa-gripfire icono-cart"></i><span>{attack}</span>
                                </div>
                            </div>
                            <div className="precio-carta">
                              {type === 'nft' ?'ETH '+price : 'ARS '+ price }  
                            </div>
                            { botones === true ? 
                            <div className="botones">
                                <button className="btn-cart btn-detalle"><DetalleDr name={name} attack={attack} defense={defense} img={img}/></button>
                                
                                <button className="btn-cart btn-comprar" onClick={() => enviar(name)}>Comprar</button>
                                {/* <button
                className="btn-gl btn-comprar"
                onClick={() => buyNft(nft)}
              >
                Buy{" "}
              </button> */}
                            </div> : null
                            }
                        </div>
                    </div>

                </div>
            </div>

        </div>





    )

}
