import React from "react";

export default function GanadorJuego() {
let perdedor = localStorage.getItem('perdedor')
const infoRoom = JSON.parse(localStorage.getItem("info-room"));

    return (
  
            <div  className="">
               
               {

               perdedor === 'false'?
               <div>
               <h1>{infoRoom.jugador2} esta en un cumpleaños</h1>
                <h2>Gano {infoRoom.jugador1}</h2>
                </div>
               :
               <div>
               <h1>{infoRoom.jugador1} esta en un cumpleaños</h1>
                <h2>Gano {infoRoom.jugador2}</h2>
                </div>
               }
            
            </div>




            
    )

}



