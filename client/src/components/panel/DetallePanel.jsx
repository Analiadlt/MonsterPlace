import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {getCardId, deleteCard} from "../../redux/actions"
import NavCheto from "../NavCheto";
import CreateItem from "../NFT/CrearNFT";
import CrearCarta from "./CrearCrtas";
import { Link } from "react-router-dom";


export default function DetallePanel (){
    const dispatch = useDispatch();
    const { id } = useParams();
    const [cid, setCid] = useState(id);
    const history = useHistory();
    const detail = useSelector((state) => state.getcardid);
    console.log( "ID carta desde Detalle: ", id, cid)
    const [navPanel, setNavpanel] =  useState('home')

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
        
        <div  >
             <div className="nav-tienda">
                <h3 className={`${navPanel === 'home' ?  "activoTienda" : null}`} onClick={()=> setNavpanel('home')}>Home</h3>
                <h3 className={`${navPanel === 'home' ?  "activoTienda" : null}`} onClick={()=> setNavpanel('crearcartas')}>Crear Cartas</h3>
                <h3 className={`${navPanel === 'home' ?  "activoTienda" : null}`} onClick={()=> setNavpanel('crearnft')}>Crear Nft</h3>
                
    
            </div>
            <div>
                {navPanel === 'home'? <h1>Listado Cartas</h1> : null }
                {navPanel === 'crearcartas'? <CrearCarta/>: null }
                {navPanel === 'crearnft'? <CreateItem/>: null }
            </div>

            <div >
                <div className="usuario-box">
                <div>
                    <h1>Detalle Carta</h1>
                    <h2 className="card-nombre">{detail.name}</h2>
                 </div>
              <div className="card-contenido">
                    <div className="card_img">
                        <img src={detail.img} alt="" width="250px" height="250px" />
                    </div>
                    <div >
                    <div >
                        <h4 >defense = {detail.defense}</h4>
                     
                    </div>

                    <div >
                        <h4 >attack = {detail.attack}</h4>
                       
                    </div>
                    </div>

                    <div className='botonn'>
                        <button className='boton-delete' 
                         onClick={e => {handleSubmit(e)}}>Delete</button>
                    </div>   
                    <div className='botonn'>
                        <Link className="Link" to={"/panel/"}>
                        <button className='boton-detalle'>Cancel</button>
                        </Link>
                    </div>             

              </div>
              </div>
            
          </div>        

        </div>
    </div>
  );
}
