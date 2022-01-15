import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCard } from "../redux/actions";


import socket from "./Socket";
import Nav from "./Nav";



export default function Chat() {

    const infoRoom = JSON.parse(localStorage.getItem("info-room"));
    const [mazo, setMazo] = useState(JSON.parse(localStorage.getItem("mazo")));
    const [mensaje, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);
    const dragones = useSelector(state => state.dragonesbd)

    const [rondas,setRondas]= useState([])

    const idpartida = localStorage.getItem('idroom')

    const dispatch = useDispatch()

    const [turno, setTurno] = useState(localStorage.getItem('turno'))

    const [ronda, setRonda] = useState(localStorage.getItem(false))
    const [resultadoo, setResultado] = useState([])

    const[enviarMensaje,setenviarMensaje]= useState(true)


    // controlo la cantidad de jugadores
    useEffect(() => {
        socket.on('getCounter', cant => {
            console.log('cantidad de jugadores', cant)

        })
        socket.on('resultado', resultado => {
            setResultado([...resultadoo, resultado])
            setRondas([...rondas, resultado])
            
                setTimeout(() => {
                    setResultado([])
                    setMensajes([])
                }, 3000)

        })


    })

    //Obtengo el socket id
    /*     useEffect(() => {
            socket.on('Socketid',sid  => {
                console.log('Socket Id: ',sid)
    
            })
                
        }) */
    // obtengo el numero de jugador

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

    const divRef = useRef(null);

  
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
        </div>
    )
};
