import React,{useEffect, useState} from "react";
import {useSelector,useDispatch} from 'react-redux'
import Card from "../Card";
import socket from "../Socket";
import { Link, useHistory } from 'react-router-dom';
import { empezarPartida } from "../../redux/actions";
import Spinner from "./spinner";
import { restarSaldo } from "../../redux/actions";

export default function Preintermedio(){
    const userLogeado = useSelector(state => state.userLogueado)
    
    const history = useHistory()
    const partida = useSelector(state=>state.partida)
    const dispatch = useDispatch()
  
 
   
    function entrar(){
        socket.emit('buscar-rooms', userLogeado.nickName);
        history.push('/Matchmaking')
      

    }

    return(

        <div>
            
            <button className="boton-partida btn-registrarse draw meet" onClick={()=>entrar()}> Empezar Partida</button>
           
        </div>
    )
     
}