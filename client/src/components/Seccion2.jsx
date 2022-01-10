import React from "react";
import { Link } from "react-router-dom";
import ListaUi from "./listaUi";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';export default function Seccion2(){
    return (
        <div className="contenedor-seccion">
            <div className="seccion-grid">
                <div className="tabla-container">
                    <h1>Ranking:</h1>
                    <ListaUi/>
                </div>
                <div className="text-seccion">
                    <h1>Comenza YA!<span className="logo"><LocalFireDepartmentIcon fontSize="2rem"/></span></h1>
                    <h2>Tu prueba</h2>
                    <h1>GRATIS!</h1>
                    <Link to={'/Registro'}>
                        <button  className="btn-registrarse draw meet">Registrarme</button>
                    </Link>
                </div>

            </div>

        </div>
    )
}