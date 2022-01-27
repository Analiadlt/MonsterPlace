import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCard } from "../redux/actions";
import { useHistory } from "react-router-dom";

import socket from "./Socket";
import Nav from "./Nav";
import Chatear from "./chat/chatear";
import CartaFondo from './juego/FondoCarta';
import Spinner from "./juego/spinner";
import CartaGame from "./juego/interface";
import { empezarPartida,restarSaldo } from "../redux/actions";

export default function Chat() {
    const userLogeado = useSelector(state => state.userLogueado)
    const infoRoom = JSON.parse(localStorage.getItem("info-room"));
    const [mazo, setMazo] = useState(JSON.parse(localStorage.getItem("mazo")));
    const [mensaje, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);
    const dragones = useSelector(state => state.dragonesbd);
    const history = useHistory()

    const [rondas,setRondas]= useState([])

    const idpartida = localStorage.getItem('idroom')

    const dispatch = useDispatch()

    const [turno, setTurno] = useState(localStorage.getItem('turno'))

    // const [ronda, setRonda] = useState(localStorage.getItem(false))
    const [resultadoo, setResultado] = useState([])

    const[enviarMensaje,setenviarMensaje]= useState(true)
    const[numeroDeRonda,setnumeroDeRonda]= useState(1)
    const[listos,setListos]= useState(false)

    const[partida,setPartida]= useState(false)

    const[val,setVal]= useState(false)
    const[vida1,setvida1]= useState(100)
    const[vida2,setvida2]= useState(100)
    const[rondaganada1,setrondaganada1]= useState(0)
    const[rondaganada2,setrondaganada2]= useState(0)

    const[segundos,setsegundos]= useState(30)
    const[perdedor,setperdedor]= useState(false)
    //false jugador 2
    //true jugador 1

    localStorage.setItem('perdedor', perdedor);
    

    

 
  const reset = () => {
    setsegundos(30);
    
  }
    
  useEffect(()=>{
   let interval = null;

   if(segundos === 0){
    history.push('/ganador')
   }

   else if(listos){
    interval= setInterval(()=>{
        setsegundos((segundos)=> segundos-1 )
    },1000)
   }


   return ()=> clearInterval(interval)

  },[segundos,listos])

  useEffect(()=>{
      if(vida1===0){
        localStorage.setItem('perdedor', infoRoom.jugador1);
        history.push('/ganador')
      }
      if(vida2===0){
        localStorage.setItem('perdedor', infoRoom.jugador2);
        history.push('/ganador')
      }

  },[vida1,vida2])

  


    // controlo la cantidad de jugadores
    useEffect(() => {
        localStorage.removeItem("info-inicio")
        

        socket.on('resultado', resultado => {
            setResultado([...resultadoo, resultado])
            
            console.log('resultadoooo',resultado)
            //rondaganada
            if(resultado.mensaje.jugador === infoRoom.jugador1 ){
                setrondaganada1(rondaganada1+1)
            }
            if(resultado.mensaje.jugador === infoRoom.jugador2 ){
                setrondaganada2(rondaganada2+1)
            }


            //--------

            //restar vida--------
            
            if(resultado.mensaje.restarvida1){
                setvida1(vida1-(resultado.mensaje.restarvida1 / 2))
            }
            if(resultado.mensaje.restarvida2){
                setvida2(vida2-(resultado.mensaje.restarvida2 / 2))
            }
            

            //---------

            let ban = false
            const  copia = mensajes
            if (resultado.mensaje.name === copia[0].mensaje.name) {
                let cartIz = document.getElementById(resultado.mensaje.name)
                let cartDe = document.getElementById(copia[1]?.mensaje.name)
                
                cartIz.classList.add('izquierda')
                cartDe?.classList.toggle('invisible')
                ban = true;
                
                cartDe?.classList.toggle('none')
                setMensajes(mensajes.filter(car => car.mensaje.name === mensajes[0]?.mensaje.name))


            } else if (ban === false){
                let cartIz = document.getElementById(resultado.mensaje.name)
                let cartDe = document.getElementById(copia[1]?.mensaje.name)
                cartIz.classList.toggle('invisible')
                cartDe?.classList.add('derecha')
                
                cartIz.classList.add('none')
                setMensajes(mensajes.filter(car => car.mensaje.name === mensajes[1]?.mensaje.name))



            }


            setTimeout(() => {
                setRondas([...rondas, resultado])
                setResultado([])
                setMensajes([])
                setVal(false)
                setnumeroDeRonda(numeroDeRonda+1)
            }, 4000)

        })


    })

 




    useEffect(() => {
        if (mensajes.length === 2) {
            setVal(true)
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
        socket.on('jugadores-listos', ()=>{
            dispatch(empezarPartida(false))

            setListos(true)
        })
            
    })
    
    useEffect(() => {
        if (numeroDeRonda === 4) {
            setPartida(true)
            if(vida1>vida2){
                localStorage.setItem('perdedor', infoRoom.jugador2);
                history.push('/ganador')
            }
            if(vida2>vida1){
                localStorage.setItem('perdedor', infoRoom.jugador1);
                history.push('/ganador')
            }
            if(vida2===vida1){
                if(rondaganada1>rondaganada2){

                    localStorage.setItem('perdedor', infoRoom.jugador2);
                    history.push('/ganador')
                }
                if(rondaganada2>rondaganada1){
                    localStorage.setItem('perdedor', infoRoom.jugador1);
                    history.push('/ganador')
                }
            }
        }
    },[numeroDeRonda])
        
   




    useEffect(() => {

        socket.on('mensajes', (mensaje,enviarMensaje,perdedor) => {
            // false jugador1
            // true jugador2
            
            setperdedor(!perdedor)

            reset()
            setenviarMensaje(enviarMensaje)

            setTimeout(() => {
                turno === 'true' ?
                    setTurno('false')
                    :
                    setTurno('true')
                if (mensajes.length < 2) {
                    setMensajes([...mensajes, mensaje])
                }
            }, 500)

        })
        return () => { socket.off() }
    })

    

  
    useEffect(() => {
        if (mensaje !== '' && turno === 'true') {
            
            socket.emit('mensaje', mensaje, idpartida,enviarMensaje,perdedor )

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
            setenviarMensaje(!enviarMensaje)
           
                setMensaje(carta)
            }
            if (!enviarMensaje) {
                carta.jugador = infoRoom.jugador1
            setenviarMensaje(!enviarMensaje)

                setMensaje(carta)
            }
        }, 1400)
    }

 let aux = {
        email: userLogeado.email,
        saldo_cryps:6
    }

let restarCoins = ()=>{
    dispatch(restarSaldo(aux))
}
useEffect(() => {
  if(listos){
    restarCoins()
  }


}, [listos])





return (
    <div className="divTotal">
       
            
        {/* <div style={{display:'flex', justifyContent:'space-between', margin :'0 50px'}}>
            <h2>Jugador 1</h2>
            <h2>Jugador 2</h2>
        </div> */}
        

        <div className="divNombre" >
            <div className="divIzq">
            <h2 >{infoRoom.jugador1} </h2>
            <div className="barraVidaizq">
            <progress className="progress" max="100" value={vida1} />
            <span  >{vida1}</span>
            </div>

            </div>

            <div className="divteimer">
            <h1>{segundos}</h1>
            <p style={{display:'flex' , justifyContent:'center'}}>Ronda {numeroDeRonda}</p>
            
            </div>

            <div className="divDer">

            <h2>{infoRoom.jugador2}</h2>

            <div className="barraVidader">
            <span >{vida2}</span>
            <progress className="progress" max="100" value={vida2} />
            </div>

            </div>


        </div>
        

        {partida ? <h1>Partida Finalizada</h1> : 
        <div className='caja-chat'>


            <div className='chat'>
                {resultadoo.length ? <h1>{'Partida Ganada por ' + resultadoo[0].mensaje.jugador}</h1> : null}
                
                <div className="grid-chat">
                    {
                        mensajes.map((dragon, i) => (
                            <div classList='carta-grid'>
                                {dragon.createdNFT === true ?
                                    <CartaFondo  img={dragon.mensaje.img} name={dragon.mensaje.name} attack={dragon.mensaje.attack} defense={dragon.mensaje.defense} type={'nft'}/>
                                    :
                                    <CartaFondo img={dragon.mensaje.img} name={dragon.mensaje.name} attack={dragon.mensaje.attack} defense={dragon.mensaje.defense}/>
                                }
                                </div>
                        ))
                    }
                </div>
                
            </div>




            {turno !== 'true' || listos === false  || val ? <Spinner text={'Esperando al Rival'} />
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
        }
    </div>
)
};
