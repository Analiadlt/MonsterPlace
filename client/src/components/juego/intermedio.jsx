import React,{useEffect, useState} from "react";
import {useSelector,useDispatch} from 'react-redux'
import Card from "../Card";
import socket from "../Socket";
import { Link, useHistory } from 'react-router-dom';
import { empezarPartida } from "../../redux/actions";
import Spinner from "./spinner";
import { restarSaldo } from "../../redux/actions";
import CartaFondo from "./FondoCarta";

export default function Intermedio(){
    const userLogeado = useSelector(state => state.userLogueado)
    
    const history = useHistory()
    const partida = useSelector(state=>state.partida)
    const mazo = useSelector(state=>state.mazo)

    const dispatch = useDispatch()
    let infoRoom = JSON.parse(localStorage.getItem("info-inicio"));
    localStorage.setItem("mazo", JSON.stringify(mazo));
    localStorage.setItem('turno', false);
    useEffect(() => {
        socket.on('inicio-partida', (roomincompleto, room) => {
            localStorage.setItem("info-room", JSON.stringify(room));
            localStorage.setItem("info-inicio", JSON.stringify(room));
            dispatch(empezarPartida(true))
            localStorage.setItem('idroom', roomincompleto);

        })
        socket.on('turno', turno =>{
            localStorage.setItem('turno', turno);
        
        })
        // socket.on('mazo-juego', mazo =>{
        //     localStorage.setItem("mazo", JSON.stringify(mazo));
            
        // })
        socket.on('room', (room,jugador) =>{
            localStorage.setItem('idroom', room);
            localStorage.setItem('numero_jugador',jugador);

            
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

   

    return(
        <div>
            {!partida && !infoRoom?
            <div>
                <button onClick={()=> cancelar()} className="boton-cancelar">Cancelar Busqueda</button>
                <div className="spinner-intermedio">
                <Spinner text={'Buscando Partida'}/>
                </div>
            </div>
            :
            <div>
            <div className="contenedor-cheto" style={{ border: '1px solid #e92b2d',marginTop:'5rem',marginBottom:'3rem'}}>
                <h1 className='detalle_partida' >Detalles de la Partida</h1>
                
                <div className="grid-intermedio">
                    <div className="jugador" style={{marginBottom:'4rem'}}>
                        <h1 style={{fontSize:'50px'}}>Jugador 1</h1>
                        <h2>{infoRoom.jugador1}</h2>
                        <h3>CrypsCoins a descontar: 6</h3>
                        


                    </div>
                    <div className="detalle" style={{marginTop:'5rem'}} >
                        <h2>Tiempo por ronda: 30s</h2>
                        <h2>CrypsCoins para el ganador: 10</h2>

                        
                    </div>
                    <div className="jugador" style={{marginBottom:'4rem'}}>
                        <h1 style={{fontSize:'50px'}}>Jugador 2</h1>
                        <h2>{infoRoom.jugador2}</h2>
                        <h3>CrypsCoins a descontar: 6</h3>
                       


                    </div>

                </div>
            </div>
            <button className="boton-partida btn-registrarse draw meet" onClick={()=>entrar()}> Empezar Partida</button>
            </div>
            }
        </div>
    )
     
}