import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCard } from "../redux/actions";


import socket from "./Socket";
import Nav from "./Nav";
import Chatear from "./chat/chatear";
import CartaFondo from './juego/FondoCarta';
import Spinner from "./juego/spinner";
import CartaGame from "./juego/interface";

export default function Chat() {

    const infoRoom = JSON.parse(localStorage.getItem("info-room"));
    const [mazo, setMazo] = useState(JSON.parse(localStorage.getItem("mazo")));
    const [mensaje, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);
    const dragones = useSelector(state => state.dragonesbd);
    

        // chat -------------------------------------------------------

        // const [mensajechat, setMensajechat] = useState("");
        // const [mensajeschat, setMensajeschat] = useState([]);
        // const [agarrarMensaje, setagarrarMensaje] = useState([]);
        // const [nombre, setNombre] = useState("");
        // const nick = useSelector(state => state.userLogueado.nickName)

    
      
        // useEffect(() => {
        //   setNombre(nick);
        // },[nick]);
        

        // console.log("NickName desde el chat: ", nombre);
        // const divRef = useRef(null);



        // ----------------------------------------------------------

    const [rondas,setRondas]= useState([])

    const idpartida = localStorage.getItem('idroom')

    const dispatch = useDispatch()

    const [turno, setTurno] = useState(localStorage.getItem('turno'))

    // const [ronda, setRonda] = useState(localStorage.getItem(false))
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
            let ban = false
            const  copia = mensajes
            if (resultado.mensaje.name === copia[0].mensaje.name) {
                let cartIz = document.getElementById(resultado.mensaje.name)
                let cartDe = document.getElementById(copia[1]?.mensaje.name)
                console.log('esta dda problemas', cartDe)
                cartIz.classList.add('izquierda')
                cartDe?.classList.toggle('invisible')
                ban = true;
                console.log('el trolo no se va', copia)
                cartDe?.classList.toggle('none')
                setMensajes(mensajes.filter(car => car.mensaje.name === mensajes[0]?.mensaje.name))


            } else if (ban === false){
                let cartIz = document.getElementById(resultado.mensaje.name)
                let cartDe = document.getElementById(copia[1]?.mensaje.name)
                cartIz.classList.toggle('invisible')
                cartDe?.classList.add('derecha')
                console.log('el trolo no se va', copia)
                cartIz.classList.add('none')
                setMensajes(mensajes.filter(car => car.mensaje.name === mensajes[1]?.mensaje.name))



            }


            setTimeout(() => {
                setRondas([...rondas, resultado])
                setResultado([])
                setMensajes([])
                setnumeroDeRonda(numeroDeRonda+1)
            }, 4000)

        })


    })



    useEffect(() => {
        if (mensajes.length === 2) {

            setTimeout(() => {
                let girar = document.querySelectorAll('#carta3d')
                girar.forEach(function (car) {
                    car.classList.toggle('girar');
                });
            }, 2000)


            setTimeout(() => {
                socket.emit('fin-ronda', mensajes, idpartida)
                
            }, 5000)

        }
    }, [mensajes])
    
    
    
    useEffect(() => {
        if (rondas.length === 3) {
            socket.emit('fin-partida', mensajes, idpartida)
            // setRonda(true)
        }
    }, [mensajes])



    useEffect(() => {

        socket.on('mensajes', mensaje => {
            setTimeout(() => {
                turno === 'true' ?
                    setTurno('false')
                    :
                    setTurno('true')
                if (mensajes.length < 2) {
                    setMensajes([...mensajes, mensaje])
                }
            }, 1000)

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
    
   
    function remover(carta) {
        let cart = document.getElementById(carta.name)
        cart.classList.add('invisible')

        setTimeout(() => {
            setMazo(mazo.filter(car => car.name !== carta.name))

        }, 2500)
        setTimeout(() => {

            if (enviarMensaje) {
                carta.jugador = infoRoom.jugador2
                setMensaje(carta)
            }
            else {
                carta.jugador = infoRoom.jugador1
                setMensaje(carta)
            }
        }, 1400)
    }



//-----------------------------------------------chat


// useEffect(() => {
//     socket.on("mensajeschat", nombre ,mensajechat => {
//         console.log("Este es el mensajeschat: ", nombre,mensajechat);
//       setMensajeschat([...mensajeschat, mensajechat]);   
//     });

  
//     return () => {
//       socket.off();
//     };

//   });

//   console.log("Este es el resultadoo: ", resultadoo);



  

//     useEffect(() => {
//       divRef.current.scrollIntoView({ behavior: "smooth" });
//     });

//     useEffect(() => {
//         if (mensajechat !== '') {
            
//             socket.emit("mensajechat", nombre, mensajechat);



//         }

//         setMensajechat('');


//     }, [mensajechat])

//     const submit = (e) => {
//         e.preventDefault();
        
//         setMensajechat(agarrarMensaje);
//         setagarrarMensaje('')
//       };





return (
    <div>
        <div className='caja-chat'>

        <h1 style={{display:'flex' , justifyContent:'center'}}>Ronda {numeroDeRonda}</h1>

            <div className='chat'>
                {resultadoo.length ? <h1>{'Partida Ganada por ' + resultadoo[0].mensaje.jugador}</h1> : null}
                
                <div className="grid-chat">
                    {
                        mensajes.map((dragon, i) => (
                            <div classList='carta-grid'>
                                <CartaFondo key={i} img={dragon.mensaje.img} name={dragon.mensaje.name} attack={dragon.mensaje.attack} defense={dragon.mensaje.defense} />
                            </div>
                        ))
                    }
                </div>
                
            </div>




            {turno !== 'true' ? <Spinner text={'Esperando al Rival'} />
                :
                <div>
                    
                <div style={{ display: 'flex', marginTop: '2rem', justifyContent: 'space-around' }}>
                    {mazo.map((carta, i) =>

                        <CartaGame attack={carta.attack} key={i} defense={carta.defense} state={carta.state} type={carta.type} name={carta.name} img={carta.img} funcion={remover} carta={carta} />
                    )}
                </div>
                </div>

            }





        </div>
    </div>
)
};
