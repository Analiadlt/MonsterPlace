import React from "react";
import {useDispatch } from 'react-redux';
import { cargarSaldo } from "../../redux/actions";


export default function GanadorJuego() {
let perdedor = localStorage.getItem('perdedor')
const infoRoom = JSON.parse(localStorage.getItem("info-room"));
const jugador = localStorage.getItem('numero_jugador');

const dispatch = useDispatch()
let enviarSaldo = ()=>{
    dispatch(cargarSaldo())
}

    return (
  
            <div  className="">
               
               {

               perdedor === 'false'?
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
            
            </div>




            
    )

}



