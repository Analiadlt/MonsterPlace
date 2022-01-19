import { useEffect, useState } from 'react'
import BotonPagar from  './BotonPagar.jsx'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Pagar(carrito) {
  const [datos, setDatos] = useState("")
  //const {carrito}=useParams();
  console.log('PROBANDO............', {carrito})

  useEffect(()=>{
    axios
    .get("http://localhost:3001/mercadopago", carrito)
    .then((data)=>{
      setDatos(data.data)
      console.info('Contenido de data:', data)
    })
    .catch(err => console.error(err)) 
  },[])

  //Mercado Pago requiere que se le envíen los datos como Array de objetos
  // const carrito = [
  //   {title: "plover", quantity: 1, price: 100},
  //   {title: "warlockk", quantity: 1, price: 500}
  // ]
  
  return (
    <div>
      { !datos
        ? <p>Aguarde un momento....</p> 
        : <BotonPagar carrito={carrito} data={datos}/>
      }
    </div>
  );
}

export default Pagar;
