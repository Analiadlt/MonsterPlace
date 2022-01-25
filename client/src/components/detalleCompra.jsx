import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPagar} from '../redux/actions'
import BotonPagar from './BotonPagar'
// import { useParams } from 'react-router-dom'

import NavCheto from './NavCheto';

export default function DetalleCompra() {
    // const id = useParams()
    const dispatch = useDispatch()
    const orderId = useSelector((state) => state.order.id);
    // const newOrderId = orderId.Then(() => dispatch(getPagar(orderId)))
    console.log("Orden ID desde ordenCompra: ", orderId)
    const carrito = useSelector(state => state.carrito)
    const userData = useSelector(state => state.userLogueado)

    console.log("Pais de User Logeado desde detalleCompra: ", userData.country)

    console.log("Carrito desde detalle compra: ", carrito)


    function sumarCarrito(carrito) {
        let total = 0;
        for (let i = 0; i < carrito.length; i++) {
            total += Math.round(carrito[i].sellPrice);
        }
        return Math.round(total);
    }
// Generar ID de mercadopago

    useEffect(() => {
        
        if (orderId) {

        dispatch(getPagar(orderId));
        
        
      }
    //   else {
    //     alert("No hay orden")
    //   }
    }, [orderId]);
    
     

    const mId = useSelector((state) => state.getpago)
    const pais = useSelector((state) => state.userLogueado.country)
   console.log("ID para Mercadopago:", mId);
    

    return (
        <div>
        <NavCheto />
        <div className="background-tienda">
            <div>

                <div>
                    <div style={{alignItems: 'center'}}>
                      <h2>{userData.nickName}</h2>  
                    </div>
                    <div>
                    <h3>Confirma tu Orden de Compra</h3>
                    </div>
                </div>
                <div style={{ alignItems: 'left' }}>
                {
                carrito?.map(c => 
                   
                   <div >
                       <h3>{c.name}  : $ {c.sellPrice}</h3>
                   </div>
                    
                )
                }
                </div>


                <div className="seccion-compra">
                    <h1>Total:</h1>
                    <h3>$  {sumarCarrito(carrito)}</h3>
                </div>
                <div>
                    { !mId.id
                        ? <p>Aguarde un momento....</p> 
                        : <BotonPagar data={mId} pais={pais} />
                    }
                </div>

            </div>
        </div>


    </div>
    )
 
  
}