import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMoralis } from "react-moralis";
import { addMetamaskAccount } from "../../redux/actions";

export default function Perfil() {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.userLogueado);
  const { authenticate, authError, logout, user, isAuthenticated } =
    useMoralis();
  console.log(isAuthenticated);

  if (isAuthenticated === true) {
    dispatch(
      addMetamaskAccount({
        metamaskAccount: user.attributes.accounts[0],
        email: usuario.email,
      })
    );
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
        {isAuthenticated === false ?
          <div style={{ cursor: 'pointer' }} className="campo meta-conect" onClick={authenticate}>
            <i class="fas fa-wallet"></i> <h2 >Conectar Wallet</h2>
            {authError && (
              <p className="error">
                {authError.name}
                {authError.message}
              </p>
            )}
          </div>
          :
          <div style={{ cursor: 'pointer' }} className="campo meta-desconect" onClick={logout}>
            <i class="fas fa-wallet"></i> <h2 >Desconectar Wallet</h2>
          </div>
  }
      </div>
      
    </div>
  );
}


{/* <div style={{ cursor: 'pointer' }} className="campo meta" onClick={authenticate}>
<i class="fas fa-wallet"></i> <h2 >Conectar Wallet</h2>
{authError && (
  <p className="error">
    {authError.name}
    {authError.message}
  </p>
)}
</div> */}


{/* <div className="campo meta">
<i class="fas fa-wallet"></i>{" "}
<h2>
  Conexión de Wallet:{" "}
  {isAuthenticated === true ? "conectado" : "desconectado"}
</h2>
</div> */}