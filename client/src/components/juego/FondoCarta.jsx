import React from "react";

import SpinnerT from "./SpinnerTurno";
export default function CartaFondo({ img, name, attack, defense, efect, price, type }) {

    return (

        <div id={name} className="carta3d cart-juego">
            <div id='carta3d' className={`contenido3d ${efect}`} style={{height:'450px'}}>
                <div className={`frontCarta logo-carta ${type === 'nft' ? 'nft-front': null}`} style={{height:'450px'}}>
 
                </div>
                <div className={`backCarta ${type === 'nft' ? 'nft-back': null}`} style={{height:'450px'}}>
                    <div className="contenedor-imagen">
                        <img src={img} alt="" />
                    </div>
                    <div className="contenido-to">
                        <h1>{name}</h1>
                        <div className="radios">
                            <div className="caracteristicasFondo">
                                <div className="caract">
                                    <i class="fab fa-fort-awesome icono-cart"></i><span>{defense}</span>

                                </div>
                                <div className="caract">
                                    <i class="fab fa-gripfire icono-cart"></i><span>{attack}</span>
                                </div>
                            </div>

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