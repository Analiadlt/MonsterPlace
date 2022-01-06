import React from "react";
import { Link } from "react-router-dom";
import ListaUi from "./listaUi";
export default function Seccion2(){
    return (
        <div className="contenedor">
            <div className="seccion-grid">
                <div className="tabla-container">
                    <h1>Ranking:</h1>
                    <ListaUi/>
                </div>
                <div className="text-seccion">
                    <h1>Comenza YA!</h1>
                    <h2>Tu prueba</h2>
                    <h1>GRATIS!</h1>
                    <button className="btn-registrarse draw meet">Registrarme</button>
                </div>

            </div>

        </div>
    )
}