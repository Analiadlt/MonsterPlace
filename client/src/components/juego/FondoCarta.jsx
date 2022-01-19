import React from "react";
import dragon from '../../img/recurso1.png'
import SpinnerT from "./SpinnerTurno";
export default function CartaFondo({img,name,attack,defense,efect}) {

    return (
  
            <div id={name}  className="carta3d">
                <div id='carta3d' className={`contenido3d ${efect}`}>
                    <div className="frontCarta logo-carta">
                        
                    </div>
                    <div className="backCarta">
                        <img src={img} alt="" />
                        <h1>{name}</h1>
                        <div className="caracteristicasFondo">
                            <div className="caract">
                                <h3>Ataque:</h3><span>{attack}</span>

                            </div>
                            <div className="caract">
                                <h3>Defensa:</h3><span>{defense}</span>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>




            
    )

}




{/* <button className="botongirar" onClick={
    ()=>{
        let carta = document.getElementById('carta3d')
        carta.classList.toggle('girar')
    }
}> girar</button> */}