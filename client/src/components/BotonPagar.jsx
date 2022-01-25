import { useEffect} from 'react'

export default function BotonPagar({ data, pais}){
  console.log("Data desde BotonPagar: ", data, pais)
 useEffect(()=>{
  const script = document.createElement('script'); //Crea un elemento html script
  
  const attr_data_preference = document.createAttribute('data-preference-id') //Crea un nodo atribute
  attr_data_preference.value = data.id  //Le asigna como valor el id que devuelve MP
  console.log("ID de MercadoPago: ", attr_data_preference.value)

  //Agrega atributos al elemento script
  if(pais === "colombia"){
  script.src="https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js"; 
  }else{
   script.src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";  
  }
  console.log(script.src)
  // script.src="https://sdk.mercadopago.com/js/v2";  
  script.setAttributeNode(attr_data_preference)  
  
  //Agrega el script como nodo hijo del elemento form
  document.getElementById('boton').appendChild(script)
  return () =>{
    //Elimina el script como nodo hijo del elemento form
    document.getElementById('boton').removeChild(script);
  }
 },[data])
    return(
        <div id='boton'>

        </div>
    )
}