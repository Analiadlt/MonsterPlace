import {React,useState} from "react";
import {useDispatch,useSelector } from 'react-redux';
import { cargarSaldo } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import socket from "../Socket";


export default function GanadorJuego() {
let perdedor = localStorage.getItem('perdedor')
const infoRoom = JSON.parse(localStorage.getItem("info-room"));
const jugador = localStorage.getItem('numero_jugador');
const userLogeado = useSelector(state => state.userLogueado)
const [saldo,setSado]= useState(true)
const history = useHistory()


let aux = {
    email: userLogeado.email,
    saldo_cryps:10
  }

const dispatch = useDispatch()

let enviarSaldo = ()=>{
    if(saldo){
        dispatch(cargarSaldo(aux))
        setSado(false)
    }
}

let reset = ()=>{
    localStorage.clear();
    socket.emit('buscar-rooms', userLogeado.nickName);
    history.push('/Matchmaking')

}


    return (
  
            <div  className="contenedor-cheto container-log">
               
                <div className="login-box">
               {

               perdedor === 'false'|| perdedor === infoRoom.jugador2 ?
               <div>
               <h1>{infoRoom?.jugador2} esta en un cumpleaños</h1>
                <h2>Gano {infoRoom?.jugador1}</h2>
                {
                    jugador === 'jugador1'?enviarSaldo():null
                    

                }
                </div>
               :
               <div>
               <h1>{infoRoom?.jugador1} esta en un cumpleaños</h1>
                <h2>Gano {infoRoom?.jugador2}</h2>
                {
                    jugador === 'jugador2'? enviarSaldo() :null
                    

                }
                </div>
            }
            <div style={{ display: 'flex',justifyContent:'space-around',alignItems:'center',flexDirection:'row' }}>
            <div>
								<Link to='#'><div className='boton_ganador' onClick={reset} >
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Jugar</div>
								</Link>
							</div>
							<div>
								<Link to='/'><div className='boton_ganador' >Home</div>
								</Link>
							</div>
						</div>
            </div>
               
            
            </div>




            
    )

}



