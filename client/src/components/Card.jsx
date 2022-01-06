import React from "react";



export default function Card({ name, atack, defense, img , price }) {

    return (
        <div>
            <div className='card' >
                <div className="fondo">
                    <img src={img} alt="" className="card_img" />
                </div>
                <div className="card-contenido">
                    <h3 className="card-nombre" >{name}</h3>
                    <div className="card-grid">
                        <div className="caracteristicas">
                            <div className="carac">
                                <h3>Ataque:</h3><span>{atack}</span>

                            </div>
                            <div className="carac">
                                <h3>Defensa:</h3><span>{defense}</span>
                            </div>
                        </div>
                        <div className="precio">
                            <h3>Precio:</h3>
                            <span>Ars: ${price}</span>

                        </div>
                    </div>
                    <div className="btn-card">
                        <button className="btn-gl btn-ver-detalle">Ver Detalle</button>
                        <button className="btn-gl btn-comprar">Comprar</button>
                    </div>

                </div>

            </div>
        </div>
    )
}