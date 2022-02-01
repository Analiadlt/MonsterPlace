import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {getCardId, deleteCard} from "../../redux/actions"
import NavCheto from "../NavCheto";
import CreateItem from "../NFT/CrearNFT";
import CrearCarta from "./CrearCrtas";
import { Link } from "react-router-dom";
// import ListadoPanel from "./ListadoPanel";


export default function DetallePanel (){
    const dispatch = useDispatch();
    const { id } = useParams();
    const [cid, setCid] = useState(id);
    const history = useHistory();
    const detail = useSelector((state) => state.getcardid);
    console.log( "ID carta desde Detalle: ", id, cid)
    const [navPanel, setNavpanel] =  useState('borrar')

    useEffect(() => {
        dispatch(getCardId(cid));
    }, [dispatch, cid]);

 

    console.log("Carta desde Detalle: ", detail)

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(deleteCard(cid));
        alert("Carta Eliminada");  
        setCid("")    
        history.push('/panel');
    
    }
    
  return (
    <div>
        <NavCheto />
        
        <div>
             <div className="nav-tienda">
                <h3 className={`${navPanel === 'home' ?  "activoTienda" : null}`} onClick={()=> setNavpanel('home')}>Home</h3>
                <h3 className={`${navPanel === 'home' ?  "activoTienda" : null}`} onClick={()=> setNavpanel('crearcartas')}>Crear Cartas</h3>
                <h3 className={`${navPanel === 'home' ?  "activoTienda" : null}`} onClick={()=> setNavpanel('crearnft')}>Crear Nft</h3>
                
    
            </div>
            <div>
                {navPanel === 'home'? <div></div>: null }
                {navPanel === 'crearcartas'? <CrearCarta/>: null }
                {navPanel === 'crearnft'? <CreateItem/>: null }
            </div>
            
        <div className="background-tienda">

        <div className="contenedor-tienda">

        <div className="titulo-tienda">
            <h2>Carta a Eliminar</h2>

      

   
        

            <div className="carta3d">
                 
                <div  className={`contenido3d girar`}>
                    <div className={`backCarta `}>  
                                
                    <div className={`contenedor-imagen`}>
                        <img src={detail.img} alt="" width="250px" height="250px" />
                    </div>
                    <div  className="contenido-to">

                        <h2 >{detail.name}</h2>
               
                        <div className="radios">
                            <div className="caracteristicasFondo">
                                <div className="caract">
                                    <i class="fab fa-fort-awesome icono-cart"></i><span>{detail.defense}</span>

                                </div>
                                <div className="caract">
                                    <i class="fab fa-gripfire icono-cart"></i><span>{detail.attack}</span>
                                </div>
                                
                            </div>
                            <div className="precio-carta">
                                    Ars$ {detail.sellPrice}
                                </div>
                        </div>
                        
                            <div className="botones">
                                <button className="btn-cart btn-detalle" onClick={e => {handleSubmit(e)}}>Delete</button>
                                <button className="btn-cart btn-comprar">
                                <Link  to={"/panel/"}>
                                        Cancel
                                </Link>
                                </button>
                            </div> 
                   

                    </div>



                    {/* <div className='botonn'>
                        <button className='boton-delete' 
                         onClick={e => {handleSubmit(e)}}>Delete</button>
                    </div>   
                    <div className='botonn'>
                        <Link className="Link" to={"/panel/"}>
                        <button className='boton-detalle'>Cancel</button>
                        </Link>
                    </div>    */}

                </div>
              </div>  
            </div>
            
        </div>        

    </div>
    </div>
    </div>
    </div>

  );
}