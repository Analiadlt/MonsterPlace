import React,{useEffect} from "react";
import {useSelector,useDispatch} from 'react-redux'
import Card from "../Card";
import socket from "../Socket";
import { Link, useHistory } from 'react-router-dom';
import { empezarPartida } from "../../redux/actions";
export default function Intermedio(){
    const history = useHistory()
    const partida = useSelector(state=>state.partida)
    const dispatch = useDispatch()
    useEffect(() => {
        socket.on('inicio-partida', roomincompleto => {
            dispatch(empezarPartida())
            console.log('empezo la partida')
        })
    }, [])

    return(
        <div>
            {!partida?
            <h1>Buscando Partida...</h1>
            :
            <button onClick={()=>history.push('/chat')}> Empezar Partida</button>
            }
        </div>
    )
     
}