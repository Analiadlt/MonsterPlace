import React, {useState} from "react";

import NavCheto from "../NavCheto";
import CreateItem from "../NFT/CrearNFT";
import CrearCarta from "./CrearCrtas";
import ListadoPanel from "./ListadoPanel";
// import BorrarCarta from "./borrarCarta";



export default function Panel(){
    
    const [navPanel, setNavpanel] =  useState('home')
    return(
        <div>
            <NavCheto />
            <h1>Panel de control</h1>
            <div>
            
            <div className="nav-tienda">
                <h3 className={`${navPanel === 'home' ?  "activoTienda" : null}`} onClick={()=> setNavpanel('home')}>Home</h3>
                <h3 className={`${navPanel === 'home' ?  "activoTienda" : null}`} onClick={()=> setNavpanel('crearcartas')}>Crear Cartas</h3>
                <h3 className={`${navPanel === 'home' ?  "activoTienda" : null}`} onClick={()=> setNavpanel('crearnft')}>Crear Nft</h3>
                
    
            </div>
            <div>
                {navPanel === 'home'? <ListadoPanel/> : null }
                {navPanel === 'crearcartas'? <CrearCarta/>: null }
                {navPanel === 'crearnft'? <CreateItem/>: null }
            </div>
           

            

            </div>
        </div>
    )
}