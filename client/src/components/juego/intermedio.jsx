import React,{useEffect, useState} from "react";
import {useSelector,useDispatch} from 'react-redux'
import Card from "../Card";
import socket from "../Socket";
import { Link, useHistory } from 'react-router-dom';
import { empezarPartida } from "../../redux/actions";
import Spinner from "./spinner";
export default function Intermedio(){
    
    const history = useHistory()
    const partida = useSelector(state=>state.partida)
    const dispatch = useDispatch()
    let infoRoom = JSON.parse(localStorage.getItem("info-inicio"));
    localStorage.setItem('turno', false);
    useEffect(() => {
        socket.on('inicio-partida', (roomincompleto, room) => {
            localStorage.setItem("info-room", JSON.stringify(room));
            localStorage.setItem("info-inicio", JSON.stringify(room));
            dispatch(empezarPartida())
            localStorage.setItem('idroom', roomincompleto);
            console.log('desde intermedio ', room)

        })
        socket.on('turno', turno =>{
            localStorage.setItem('turno', turno);
            console.log('llego el turno', turno )
        })
        socket.on('mazo-juego', mazo =>{
            localStorage.setItem("mazo", JSON.stringify(mazo));
            
        })
        
    })
    function cancelar(){
        socket.emit('cancelar-busqueda', localStorage.getItem('idroom'))
        history.push('/')
    }
    function entrar(){
        history.push('/chat')
        socket.emit('usuario-dentro', localStorage.getItem('idroom'))
    }
    

    console.log('infoRoom',infoRoom)
   

    return(
        <div>
            {!partida && !infoRoom?
            <div>
                <button onClick={()=> cancelar()}>cancelar</button>
                <Spinner text={'Buscando Partida'}/>
            </div>
            :
            <div className="contenedor-cheto">
                <h1>Detalles de la Partida</h1>
                <div className="grid-intermedio">
                    <div className="jugador">
                        <h1>Jugador 1</h1>
                        <h2>{infoRoom.jugador1}</h2>
                    </div>
                    <div className="jugador">
                        <h1>Jugador 2</h1>
                        <h2>{infoRoom.jugador2}</h2>
                    </div>

                </div>
            <button className="boton-partida btn-registrarse draw meet" onClick={()=>entrar()}> Empezar Partida</button>
            </div>
            }
        </div>
    )
     
}