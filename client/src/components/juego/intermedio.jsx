import React,{useEffect} from "react";
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
    const infoRoom = JSON.parse(localStorage.getItem("info-room"));
    localStorage.setItem('turno', false);
    useEffect(() => {
        socket.on('inicio-partida', (roomincompleto, room) => {
            dispatch(empezarPartida())
            localStorage.setItem("info-room", JSON.stringify(room));
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

    }, [])

    return(
        <div>
            {!partida?
            <Spinner/>
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
            <button className="boton-partida btn-registrarse draw meet" onClick={()=>history.push('/chat')}> Empezar Partida</button>
            </div>
            }
        </div>
    )
     
}