import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Nav from '../Nav';
import Chatear from "./chatear";




function ChatApp() {
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);
  const nick = useSelector(state => state.userLogueado.nickName)

  useEffect(() => {
    setNombre(nick);
  },[nick]);

  console.log("Nombre desde index: ", nombre);

  const registrar = (e) => {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
  };

  return (
    <div className="App">
      <Nav />
      {!registrado && (
        <form onSubmit={registrar}>
          <label htmlFor="">Introduzca su nombre</label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <button>Ir al chat</button>
        </form>
      )}

      {registrado && <Chatear nombre={nombre} />}
    </div>
  );

}

export default ChatApp;