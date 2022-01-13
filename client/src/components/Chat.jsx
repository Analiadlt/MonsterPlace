import React, {useState , useEffect , useRef } from "react";
import { useSelector,useDispatch } from "react-redux";

import { getCard } from "../redux/actions";


import socket from "./Socket";
import Nav from "./Nav";



export default function Chat() {
    const [mensaje, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);
    const dragones = useSelector(state => state.dragonesbd)

    const dispatch = useDispatch()

    let nombre=socket.id

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


    return (
        <div>
			<Nav />

        <div className='caja-chat'>
            <div className='chat'>
                {
                    

                    mensajes.map((dragon,i)=>(
                        <div key={i} style={{display:'flex', justifyContent:'center'}}>
                        <div style={{ border:'1px solid #ffff', width:'200px',height:'300px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    
                    <img  src={dragon?.mensaje.img} style={{width:'100px',height:'100px',display:'block', margin:' 0 auto'}}/>
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

            <img className="cartita" src={dragones[0]?.img} onClick={()=>setMensaje(dragones[0])}/>
            <img className="cartita" src={dragones[1]?.img} onClick={()=>setMensaje(dragones[1])}/>
            <img className="cartita" src={dragones[2]?.img} onClick={()=>setMensaje(dragones[2])}/>

            </div>
           


           
        </div>
        </div>
    )
};
