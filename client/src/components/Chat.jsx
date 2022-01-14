import React, {useState , useEffect , useRef } from "react";
import { useSelector, useDispatch} from "react-redux";

import { getCard } from "../redux/actions";


import socket from "./Socket";
import Nav from "./Nav";



export default function Chat() {
    const [mensaje, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);
    const dragones = useSelector(state => state.dragonesbd)


    const dispatch = useDispatch()

    let nombre=socket.id
    // controlo la cantidad de jugadores
    useEffect(() => {
        socket.on('getCounter',cant  => {
            console.log('cantidad de jugadores',cant)
   /*          if (cant > 2){
                socket.emit('message', 'cantidad de jugadores superada');
                
                // alert('cantidad de jugadores superada')
            }  return ()=> {socket.off()}      */
        })
            
    })

    //Obtengo el socket id
    useEffect(() => {
        socket.on('Socketid',sid  => {
            console.log('Socket Id: ',sid)

        })
            
    })
    // obtengo el numero de jugador
    useEffect(() => {
        socket.on('player-number', pIndex  => {
            console.log('Jugador Numero: ',pIndex)

        })
            
    })



    console.log('mensajes',mensajes)
   // useEffect(() => {
        
    //     socket.emit('conectado',nombre)

    // }, [nombre])

    useEffect(() => {
        
        
        dispatch(getCard())

    }, [])

    useEffect(() => {
        
        socket.on('mensajes',mensaje =>{
            setMensajes([...mensajes,mensaje])
        })

        return ()=> {socket.off()}
    })
    
    const divRef = useRef(null);

    useEffect(() => {
         divRef.current.scrollIntoView({dehavior:'smooth'})
        })

        
        useEffect(() => {
            if(mensaje !== ''){
                
                socket.emit('mensaje',nombre, mensaje)
               
            }

            setMensaje('')


        },[mensaje])
        console.log('esto es mensaje',mensaje)
    // const submit = (e) => {
    //     e.preventDefault();
    //     socket.emit('mensaje',nombre, mensaje)

    //     setMensaje('')

    // }
    function handleSubmit(e) {
        e.preventDefault();
    }
    // handleSubmit = (e) => {
    //     socket.emit('buscar-rooms', e)
    // }


         
       



    return (
        <div>
			<Nav />

        <div className='caja-chat'>
            <div className='chat'>
                {
                    

                    mensajes.map((dragon,i)=>(
                        <div key={i} style={{display:'flex', justifyContent:'center'}}>
                        <div style={{ border:'1px solid #ffff', width:'200px',height:'300px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    
                    <img  alt = "carta" src={dragon?.mensaje.img} style={{width:'100px',height:'100px',display:'block', margin:' 0 auto'}}/>
                        <div style={{display:'flex', flexDirection:'column', textAlign:'center'}}>
                        <p>Ataque:</p><span>{dragon?.mensaje.attack}</span>
                        <p>Defensa:</p><span>{dragon?.mensaje.defense}</span>
                    
                        </div>
                </div>
                </div>
                    ))
                    
             }
             <div ref={divRef}></div>
           </div> 
            
          
           <div style={{display:'flex',marginTop:'2rem', justifyContent:'center'}}>

            <img className="cartita" alt = "carta" src={dragones[0]?.img} onClick={()=>setMensaje(dragones[0])}/>
            <img className="cartita" alt = "carta" src={dragones[1]?.img} onClick={()=>setMensaje(dragones[1])}/>
            <img className="cartita" alt = "carta" src={dragones[2]?.img} onClick={()=>setMensaje(dragones[2])}/>
            </div>
           


           
        </div>
        </div>
    )
};
