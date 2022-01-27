import React, { useEffect, useState } from "react";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Card from '../components/Card'
import { useSelector, useDispatch } from "react-redux";
import { getOrder, sellOrder, pagar } from "../redux/actions";
import { Link, useHistory } from "react-router-dom";
import NavCheto from './NavCheto';
import CartaTienda from "./cartaTienda";
import Swal from "sweetalert2";
import huevoBlanco from "../img/huevoBlanco.png";



export default function Compra() {
    const history = useHistory();
    const loading = useSelector(state => state.loading)
    const dragones = useSelector(state => state.carrito)
    const dispatch = useDispatch()
    const carrito = useSelector(state => state.carrito)
    const email = useSelector(state => state.userLogueado.email)
    const cards = useSelector(state => state.carrito)
    
    // const id = useSelector(state => state.carrito.id)
    let allCards = []

    function sumarCarrito(carrito) {
        let total = 0;
        for (let i = 0; i < carrito.length; i++) {
            total += Math.round(carrito[i].sellPrice);
        }
        return Math.round(total);
    }

    function cargarCards(cards) {
        let array = []
      for (let i = 0; i < cards.length; i++) {
          array.push(cards[i].id)
          
  
      }
      return array
      
    }

    const [state, setState] = useState({
        email: email,
        allCards: cargarCards(cards),
     })

    //  useEffect(() => {
    //     dispatch(sellOrder(state))
    // }, [dispatch, state])

    // const orderDetail = useSelector((state) => state.order.id);

    // console.log("Odren de Compra ID ", orderDetail)




     const onSubmit = (e) => {
        e.preventDefault()
        if (state.email && state.allCards.length > 0) {
            console.log("Email y Cards desde Compras: ", state.email, state.allCards)
            dispatch(sellOrder(state)) 
            
            

            Swal.fire({
                imageUrl: `${huevoBlanco}`,
                title: "Procesando Orden..",
                width: 500,
                confirmButtonText: "Continuar",
                imageWidth: 300,
                imageHeight: 400,
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                },
              });
        
              setTimeout(() => {
                history.push("/DetalleCompra")
              }, 3000);

        }
        else {
            console.log('ERROR')
        }
    }

    console.log("Todas las cartas desde compra: ", state.allCards)

    return (
        <div>
            <NavCheto />
            <div className="background-tienda">
                <div className="contenedor-tienda">

                    <div className="titulo-tienda">
                        <h1>Detalle</h1>

                    </div>
                    {loading.loading ? <h1>Cargando...</h1> :
                        <div className="contenedor-tajetas">
                            <div className="grid-tienda">
                                {
                                    dragones.map(dragon =>
                                        <div className="cart-tienda">
                                        <CartaTienda name={dragon.name} atack={dragon.attack} defense={dragon.defense} img={dragon.img} price={dragon.sellPrice} />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    }

                    <div className="seccion-compra">
                        <h1>Total:</h1>
                        <h3>$  {sumarCarrito(carrito)}</h3>
                    </div>
                    <div>

                        <button className='boton-detalle' onClick={onSubmit}>Realizar Compra</button>

                    </div>
                </div>
            </div>


        </div>

    )
}
