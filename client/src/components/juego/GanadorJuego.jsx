import {React,useState} from "react";
import {useDispatch,useSelector } from 'react-redux';
import { cargarSaldo,resultadoJuego } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import socket from "../Socket";


export default function GanadorJuego() {
let perdedor = localStorage.getItem('perdedor')
let turno = localStorage.getItem('turno')

const infoRoom = JSON.parse(localStorage.getItem("info-room"));
const jugador = localStorage.getItem('numero_jugador');
const userLogeado = useSelector(state => state.userLogueado)
const [saldo,setSado]= useState(true)
const [resul,setresul]= useState(true)

const history = useHistory()


let aux = {
    email: userLogeado.email,
    saldo_cryps:10
  }

const dispatch = useDispatch()

let resultadoganador =()=>{
    if(resul){

        dispatch(resultadoJuego({email: userLogeado.email,resultado:'ganador'}))
        setresul(false)
    }
    
}
let resultadoperdedor =()=>{
    if(resul){

        dispatch(resultadoJuego({email: userLogeado.email,resultado:'perdedor'}))
        setresul(false)
    }
    
}


let enviarSaldo = ()=>{
    if(saldo){
        dispatch(cargarSaldo(aux))
        resultadoganador()
        setSado(false)
    }
}
console.log('perdedor...', perdedor)

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
                   
                    <div style={{display:'flex', justifyContent:'space-between', margin :'0 50px'}}>
                    <h2>Ganador</h2><h2>Perdedor</h2>
                    {jugador === 'jugador1'?enviarSaldo():resultadoperdedor()}
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', margin :'0 50px'}}>
                    <h2 style={{position:'relative',top:'-30px',left:'15px'}}>{infoRoom?.jugador1}</h2>
                    <h2 style={{position:'relative',top:'-30px', right:'20px'}}>{infoRoom?.jugador2}</h2>
                    
                    </div>
               </div>
           
               :
               <div>
                   
               <div style={{display:'flex', justifyContent:'space-between', margin :'0 50px'}}>
               <h1>Ganador</h1><h1>Perdedor</h1>
               {jugador === 'jugador2'?enviarSaldo():resultadoperdedor() }
                </div>
                <div style={{display:'flex', justifyContent:'space-between', margin :'0 50px'}}>
               <h2 style={{position:'relative',top:'-30px',left:'15px'}}>{infoRoom?.jugador2}</h2>
               <h2 style={{position:'relative',top:'-30px', right:'20px'}}>{infoRoom?.jugador1}</h2>
               
                </div>


                </div>

                
            }
            <h1>Premio</h1>
            <i class="fas fa-coins" style={{color:'yellow',fontSize:'30px',marginLeft:'180px'}}>10 CrypsCoins</i>
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



