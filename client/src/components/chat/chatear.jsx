import React, {useEffect, useRef, useState } from "react";
import socket from "../Socket";




const Chatear = ({nombre,idpartida, socketid}) => {
    const [mensajechat, setMensajechat] = useState("");
    const [mensajeschat, setMensajeschat] = useState([]);

  
  let arrUsers =[]

    useEffect(() => {
      socket.emit("conectado", nombre, socket.id);
    }, [nombre]);



  
    useEffect(() => {
      socket.on("mensajeschat", (mensajechat) => {
        setMensajeschat([...mensajeschat, mensajechat]);
        console.log("Este es el mensajeschat: ", mensajeschat);
      });

    
      return () => {
        socket.off();
      };

    }, [mensajeschat]);
        console.log("Mensajes en el chat: ", mensajeschat);
  
    const divRef = useRef(null);
    useEffect(() => {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    });
  
    const submit = (e) => {
      e.preventDefault();
      socket.emit("mensajechat", nombre, mensajechat, idpartida);
      setMensajechat("");
    };
  
    return (
      <div>
        <div style={{ display: 'block', margin: '20px', marginTop: '20px', width: '55%' }}>
          
          {mensajeschat.map((e, i) => (
            <div key={i}>
              <div style={{color: "yellow"}}>{e.nombre}</div>
              <div style={{color: "white"}}>{e.mensajechat}</div>
            </div>
          ))}
          <div ref={divRef}></div>
        </div>
        <form onSubmit={submit}>
          <label htmlFor="">Escriba su mensaje</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="2"
            value={mensajechat}
            onChange={(e) => setMensajechat(e.target.value)}
          ></textarea>
          <button>Enviar</button>
        </form>
      </div>
    );
  };
  
  export default Chatear;
  