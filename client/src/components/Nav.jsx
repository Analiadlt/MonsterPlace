import React from "react";
import { Link } from "react-router-dom";
import {  useDispatch, useSelector } from 'react-redux';
import { cambiarFondo } from "../redux/actions";
export default function Nav() {
    const modo = useSelector(state => state.modo)
    const dispatch =  useDispatch();
    

    return (
        
        <div>
            
            <div className="navContainer contenedor">
                <div className="logo">
                    <Link to='/home' className="titulo">
                        <h1 className="titulo"><span className="span"></span>CryptoGame</h1>
                    </Link>
                </div>

        
                <div>
                    <Link to='/home' className="link-nav">
                        <span>Home</span>
                    </Link>
                    <Link to='/Create' className="link-nav">
                        <span >Tienda</span>
                    </Link>
                    <button onClick={()=>{
                        const color = document.getElementById('body')

                        if(modo === 'claro'){ 
                        color.style.background = '#1E1E1E'
                        dispatch(cambiarFondo())
                    }else if (modo === 'oscuro'){
                        color.style.background = '#2669A6'
                        dispatch(cambiarFondo())
                    }
                    }}  >
                        Cambiar
                    </button>
                </div>

            </div>
       

        </div>
   
    );
};
