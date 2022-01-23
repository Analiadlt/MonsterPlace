import React from "react";
import { useSelector } from "react-redux";


export default function Perfil() {
    const usuario = useSelector(state => state.userLogueado)
    return (
        <div className="profile">
            <div className="cabeza-profile">
                <h1>Informacion del Perfil</h1>
                <div className="cryps">
                    Saldo: <span>{usuario.saldo_cryps}</span><i class="fas fa-coins"></i>
                </div>
            </div>
            <div className="grid-info">
                <div className="campo">
                    <i class="fas fa-edit"> </i>Nombre Completo: <span>{`${usuario.firstName}  ${usuario.lastName}`}</span>
                </div>
                <div className="campo">
                    <i class="fas fa-envelope"></i>Email: <span>{usuario.email}</span>
                </div>
                <div className="campo">
                    <i class="fas fa-edit"></i> Nick: <span>{usuario.nickName}</span>
                </div>
                <div className="campo contrase">
                    <i class="fas fa-edit"></i> Modificar Contraseña
                </div>

            </div>
        </div>
    )
}