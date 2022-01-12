import React from "react";

export default function Prueba({ name, atack, defense, img, type, price}) {
    return (
        <div className="prueba">
            <div className="cards" >
                <div className="circle" ></div>
                <div className="content" >
                    <h2>{name}</h2>
                    <div className="detalles">
                        <div>
                            <div>
                                <h4>Atack:</h4>
                                <progress className="progress" max="150" value={atack}/>   
                            </div>
                            <div>
                                <h4>Defense:</h4>
                                <progress className="progress" max="150" value={defense}/>                            
                            </div>
                        </div>
                        <div className="detalles-sec">
                            <div>
                                <h4>Type:</h4>
                                <p>{type}</p>
                            </div>
                            <div>
                                <h4>Price:</h4>
                                <p className="precio">${price}</p>
                            </div>
                        </div>
                    </div>
                    
                        <a href="/tienda">

                            Ver en Tienda
                        </a>
                    
                </div>
                <img src={img} alt="NO tengo imagen" />
            </div>
        </div>

    )
}