import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPagar } from '../redux/actions'
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
    }, [dispatch,orderId]);



    const mId = useSelector((state) => state.getpago)
    const pais = useSelector((state) => state.userLogueado.country)
    console.log("ID para Mercadopago:", mId);


    return (
        <div>
            <NavCheto />
            <div className="background-tienda">
                <div className='contenedor-detalle'>

                    <div>
                        <h2 className='orden-titulo'>Confirmacion de Orden</h2>
                        
                        <div className='datos-user'>
                            <h1 className='titulo-articulos'>Datos del comprador:</h1>
                            <h2>Usuario: <span>{userData.firstName} {userData.lastName}</span></h2>
                            <h2>Email: <span>{userData.email}</span></h2>
                        </div>

                    </div>
                    <div className='contenedor-articulos'>
                        <h1 className='titulo-articulos'>Articulos de la orden:</h1>
                        <ul>
                            {
                                carrito?.map(c =>

                                    <li className='articulos'>
                                        <h3>{c.name}  : <span>$ {c.sellPrice}</span></h3>
                                    </li>

                                )
                            }
                        </ul>
                    </div>
                    <div className='fondo-detalle'>
                        <div className="seccion-compra">

                            <h1>Tipo de pago:</h1>
                            <h3>MercadoPago</h3>
                        </div>
                        <div className="seccion-compra">

                            <h1>Acreditacion:</h1>
                            <h3>Inmediata</h3>
                        </div>
                        <div className="seccion-compra">

                            <h1>Total:</h1>
                            <h3>$  {sumarCarrito(carrito)}</h3>
                        </div>
                        <div>
                            {!mId.id
                                ? <p>Aguarde un momento....</p>
                                : <BotonPagar data={mId} pais={pais} />
                            }
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )


}