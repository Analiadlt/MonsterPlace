import { useEffect, useState } from 'react'
import BotonPagar from  './BotonPagar.jsx'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import dotenv from "dotenv";
dotenv.config();


export function Pagar() {
  const [datos, setDatos] = useState("")

//1° debería invocarse a axios.post(`${process.env.REACT_APP_API}/order`+{email, cardIds})
//2° Con el orderId creado en el post, invocar al axios.get(`${process.env.REACT_APP_API}/mercadopago/${orderId}`)

  // useEffect(()=>{
  //   axios
  //   .get(`${process.env.REACT_APP_API}/mercadopago/`+11) //el 11, en realidad debería ser el orderId creado en el PostOrder
  //   .then((data)=>{
  //     setDatos(data.data)
  //     console.info('Contenido de data:', data)
  //   })
  //   .catch(err => console.error(err)) 
  // },[])


  return (
    <div>
      { !datos
        ? <p>Aguarde un momento....</p> 
        : <BotonPagar data={datos}/>
      }
    </div>
  );
}

export default Pagar;
