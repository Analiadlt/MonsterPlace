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
    useEffect(() => {
        socket.on('inicio-partida', (roomincompleto) => {
            dispatch(empezarPartida())
    
            localStorage.setItem('idroom', roomincompleto);
            console.log('desde intermedio ', roomincompleto)
        })
    }, [])

    return(
        <div>
            {!partida?
            <Spinner/>
            :
            <button onClick={()=>history.push('/chat')}> Empezar Partida</button>
            }
        </div>
    )
     
}