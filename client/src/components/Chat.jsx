import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCard } from "../redux/actions";


import socket from "./Socket";
import Nav from "./Nav";
import Chatear from "./chat/chatear";



export default function Chat() {

    const infoRoom = JSON.parse(localStorage.getItem("info-room"));
    const [mazo, setMazo] = useState(JSON.parse(localStorage.getItem("mazo")));
    const [mensaje, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);
    const dragones = useSelector(state => state.dragonesbd);
    

        // chat -------------------------------------------------------
        const [mensajechat, setMensajechat] = useState("");
        const [mensajeschat, setMensajeschat] = useState([]);
        const [agarrarMensaje, setagarrarMensaje] = useState([]);
        const [nombre, setNombre] = useState("");
        const nick = useSelector(state => state.userLogueado.nickName)
        
    
      
        useEffect(() => {
          setNombre(nick);
        },[nick]);
        
        console.log("NickName desde el chat: ", nombre);
        const divRef = useRef(null);


        // ----------------------------------------------------------

    const [rondas,setRondas]= useState([])

    const idpartida = localStorage.getItem('idroom')

    const dispatch = useDispatch()

    const [turno, setTurno] = useState(localStorage.getItem('turno'))

    const [ronda, setRonda] = useState(localStorage.getItem(false))
    const [resultadoo, setResultado] = useState([])

    const[enviarMensaje,setenviarMensaje]= useState(true)
    const[numeroDeRonda,setnumeroDeRonda]= useState(1)
    
    


    


    // controlo la cantidad de jugadores
    useEffect(() => {
        localStorage.removeItem("info-inicio")
        socket.on('getCounter', cant => {
            console.log('cantidad de jugadores', cant)

        })
        socket.on('resultado', resultado => {
            setResultado([...resultadoo, resultado])
            setRondas([...rondas, resultado])
            
                setTimeout(() => {
                    setResultado([])
                    setMensajes([])
                    setnumeroDeRonda(numeroDeRonda+1)
                }, 3000)

        })


    })



    useEffect(() => {
        if (mensajes.length === 2) {
            socket.emit('fin-ronda', mensajes, idpartida)
            setRonda(true)
        }
    }, [mensajes])
    
    
    
    useEffect(() => {
        if (rondas.length === 3) {
            socket.emit('fin-partida', mensajes, idpartida)
            setRonda(true)
        }
    }, [mensajes])





    useEffect(() => {


        dispatch(getCard())

    }, [])

    useEffect(() => {

        socket.on('mensajes', mensaje => {

            turno === 'true' ?
                setTurno('false')
                :
                setTurno('true')
            if (mensajes.length < 2) {
                setMensajes([...mensajes, mensaje])
            }
        })
        return () => { socket.off() }
    })

    

  
    useEffect(() => {
        if (mensaje !== '' && turno === 'true') {
            
            socket.emit('mensaje', mensaje, idpartida)

            setenviarMensaje(!enviarMensaje)
          
            


        }

        setMensaje('')


    }, [mensaje])
    console.log('esto es mensaje', mensaje)
   
    function remover(carta) {
        
        setMazo(mazo.filter(car => car.name !== carta.name))

        if(enviarMensaje){
            carta.jugador = infoRoom.jugador2
        setMensaje(carta)
        }
        else{
            carta.jugador = infoRoom.jugador1
        setMensaje(carta)
        }
    }

    console.log('infoRoom',infoRoom)
    console.log('infoRoom.jugardor1',infoRoom.jugador1)


//-----------------------------------------------chat

useEffect(() => {
    socket.on("mensajeschat", nombre ,mensajechat => {
        console.log("Este es el mensajeschat: ", nombre,mensajechat);
    //   setMensajeschat([...mensajeschat, mensajechat]);   
    });

  
    return () => {
      socket.off();
    };

  });

  console.log("Este es el mensajeschat: ", mensajeschat);


  

    useEffect(() => {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    });

    useEffect(() => {
        if (mensajechat !== '') {
            
            socket.emit("mensajechat", nombre, mensajechat);



        }

        setMensajechat('');


    }, [mensajechat])

    const submit = (e) => {
        e.preventDefault();
        
        setMensajechat(agarrarMensaje);
        setagarrarMensaje('')
      };




    return (
        <div>
            <Nav />
            <div className='caja-chat'>
                    
                {resultadoo.length ?
                    <div>
                        {console.log(mazo)}
                        <h1>{'Partida Ganada por '+resultadoo[0].mensaje.jugador}</h1>
                        <h2>Carta </h2>
                        <h3>{resultadoo[0].mensaje.name}</h3>
                        <img alt="carta" src={resultadoo[0]?.mensaje.img} style={{ width: '100px', height: '100px', display: 'block', margin: ' 0 auto' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                            <p>Ataque:</p><span>{resultadoo[0]?.mensaje.attack}</span>
                            <p>Defensa:</p><span>{resultadoo[0]?.mensaje.defense}</span>

                        </div>
                    </div>
                    :
                    <div>
                        <h1>Ronda {numeroDeRonda}</h1>
                    <div className='chat'>
                        {

                            
                            mensajes.map((dragon, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ border: '1px solid #ffff', width: '200px', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                                        <img alt="carta" src={dragon?.mensaje.img} style={{ width: '100px', height: '100px', display: 'block', margin: ' 0 auto' }} />
                                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                                            <p>Ataque:</p><span>{dragon?.mensaje.attack}</span>
                                            <p>Defensa:</p><span>{dragon?.mensaje.defense}</span>

                                        </div>
                                    </div>
                                </div>
                            ))

                        }
                        <div ref={divRef}></div>
                        {console.log('este es tu mazo ', mazo)}
                    </div>
                    </div>

                }


                {turno !== 'true' ? <h1>Turno del rival</h1>
                    :
                    <div style={{ display: 'flex', marginTop: '2rem', justifyContent: 'center' }}>
                        {mazo.map( (carta ,i) =>
                        <img className="cartita" key={i} alt="carta" src={carta.img} onClick={() => remover(carta) }/>
                        )}
                    </div>

                }
        
            </div>

            {/* <div >
            <Chatear nombre={nombre} idpartida={idpartida} />
            
            </div> */}
            
            {/* <div>
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
            value={agarrarMensaje}
            onChange={(e) => setagarrarMensaje(e.target.value)}
          ></textarea>
          <button>Enviar</button>
        </form>
      </div> */}
        </div>
    )
};
