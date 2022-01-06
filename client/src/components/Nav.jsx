import React from "react";
import { Link } from "react-router-dom";
import {  useDispatch, useSelector } from 'react-redux';
import { cambiarFondo } from "../redux/actions";
import ProfileHome from "./ProfileHome"
export default function Nav() {
    const modo = useSelector(state => state.modo)
    const dispatch =  useDispatch();
    



    return (
        
        <div>
            
            <div className="navContainer">
                <div >
                    <Link to='/'>
                        <h1 className="titulo">CryptoGame</h1>
                    </Link>
                </div>
                <div>
                    <Link to='/home' >
                        <span>Home</span>
                    </Link>
                    <Link to='/Create' >
                        <span >Tienda</span>
                    </Link>
                        {/*                     <button onClick={()=>{
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
                    </button> */}
                
                    
                    
                </div>
                <ProfileHome/>

            </div>
       

        </div>
   
    );
};
