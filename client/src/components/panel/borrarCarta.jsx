import React, { useState } from "react";
import { useDispatch} from "react-redux";
import {  useHistory } from "react-router-dom";
import {deleteCard} from "../../redux/actions"

export default function BorrarCarta() {
    const dispatch = useDispatch();
    const [id, setId] = useState("")  
    const history = useHistory();
   
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(deleteCard(id));
        alert("CARTA ELIMINADA");
        setId("");
        history.push('/Panel');
    }
    
    function handleChange(e) {
        setId(
             e.target.value
        );
    }

      return (
        <div className="contenedor-cheto container-log">
            <div className="login-box">
            <h2>Borrar Carta</h2>
            <h4>Ingresar ID de la carta</h4>
            <form onSubmit={handleSubmit}>
            <input 
                  type="text"
                  id="id"
                  name="id"
                  
                  value={id}
                  onChange={e => {handleChange(e)}}
                />
                <button type="submit">Borrar</button>
            </form>
            </div>
        </div>
        );
}