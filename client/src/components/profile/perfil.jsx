import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMoralis } from "react-moralis";
import { addMetamaskAccount } from '../../redux/actions';

export default function Perfil() {
const dispatch = useDispatch();
  const usuario = useSelector((state) => state.userLogueado);
  const { authenticate, authError, logout } = useMoralis();
  const { user } =useMoralis()
  console.log(user)
  console.log(authError)
  console.log(usuario.email)

  function handleChange(e) {
      authenticate()
      console.log(authenticate)
    if (!authError && authenticate === 'true') {
        console.log(user.attributes.accounts[0])
        dispatch(addMetamaskAccount({metamaskAccount:user.attributes.accounts[0], email: usuario.email}))
    }
}

  return (
    <div className="profile">
      <div className="cabeza-profile">
        <h1>Informacion del Perfil</h1>
        <div className="cryps">
          Saldo: <span>{usuario.saldo_cryps}</span>
          <i class="fas fa-coins"></i>
        </div>
      </div>
      <div className="grid-info">
        <div className="campo">
          <i class="fas fa-edit"> </i>Nombre Completo:{" "}
          <span>{`${usuario.firstName}  ${usuario.lastName}`}</span>
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
        <div className="campo meta" onClick={handleChange}>
          <i class="fas fa-wallet"></i> <h2>Conectar Wallet</h2>
          {authError && (
            <p className="error">
              {authError.name}
              {authError.message}
            </p>
            
          )}
           <button onClick={logout}>Sign Out</button>
        </div>
      </div>
    </div>
  );
}
