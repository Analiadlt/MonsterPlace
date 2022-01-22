import {React,useState} from "react";
import {useDispatch,useSelector } from 'react-redux';
import { cargarSaldo } from "../../redux/actions";


export default function GanadorJuego() {
let perdedor = localStorage.getItem('perdedor')
const infoRoom = JSON.parse(localStorage.getItem("info-room"));
const jugador = localStorage.getItem('numero_jugador');
const userLogeado = useSelector(state => state.userLogueado)
const [saldo,setSado]= useState(true)


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



