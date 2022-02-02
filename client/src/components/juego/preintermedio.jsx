import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import socket from "../Socket";
import { Link, useHistory } from 'react-router-dom';
import { getUserCard, subirmazo } from '../../redux/actions';
import CartaTienda from '../cartaTienda';
import CartaNft from '../cartaTienda';
import Swal from "sweetalert2";
import huevoRojo from "../../img/huevoRojo.png";




export default function Preintermedio() {
    const userLogeado = useSelector(state => state.userLogueado)
    const user = useSelector(state => state.userLogueado.email)
    const users = useSelector(state => state.users)
    const cardsDetail = useSelector(state => state.userCards)
    const history = useHistory()
    const dispatch = useDispatch()
    const resultado = users.find(e => e.email === user);


    const [mazo, setmazo] = useState([])
    const [cartas, setcartas] = useState([])



    const uId = resultado?.id

    function entrar() {
        if (mazo.length === 3) {

            socket.emit('buscar-rooms', userLogeado.nickName);
            dispatch(subirmazo(mazo))
            history.push('/Matchmaking')
        }
        else {
         
            Swal.fire({
                title: "<strong>Debes tener 3 cartas en el mazo para jugar</strong>",
                imageUrl: `${huevoRojo}`,
                width: 500,
                imageWidth: 300,
                imageHeight: 400,
              });
        }


    }
    useEffect(() => {


        setcartas(cardsDetail)

    }, [cardsDetail]);

    useEffect(() => {

        if (!user) {
            alert("No hay user")
        } else {
            dispatch(getUserCard(uId))

        }
    }, [dispatch, user, uId]);

    function agregarMazo(c) {
        console.log(mazo.indexOf(c))
        if (mazo.indexOf(c) === -1) {
            if (mazo.length < 3) {

                setcartas(cartas.filter(carta => carta !== c))
                setmazo([...mazo, c])
            }
            else {
                
                Swal.fire({
                    title: "<strong>Mazo lleno</strong>",
                    imageUrl: `${huevoRojo}`,
                    width: 500,
                    imageWidth: 300,
                    imageHeight: 400,
                  });
            }
        }
    }
    function quitarMazo(c) {

        setmazo(mazo.filter(mazo => mazo !== c))
        setcartas([...cartas, c])



    }


    console.log('array,array', mazo)
    return (
        <div>
            <h1>Arma tu mazo</h1>
            <h3>Cartas Disponibles</h3>


            <div className="grid-inventario" style={{ border: '1px solid #e92b2d', width: '150rem', justifyContent: 'center', minHeight: '60rem', whiteSpace: 'nowrap' }}>
                {
                    cartas.length ? cartas?.map((c, i) =>

                        <div style={{ cursor: 'pointer', marginLeft: '11rem' }} key={i} onClick={() => agregarMazo(c)}>
                            {c.createdNFT === false ?
                                <CartaTienda name={c.name} attack={c.attack} defense={c.defense} img={c.img} price={c.sellPrice} />
                                :
                                <CartaTienda name={c.name} attack={c.attack} defense={c.defense} img={c.img} price={c.sellPrice} type={'nft'} />
                            }
                        </div>


                    )
                        :
                        <h2 style={{ marginTop: '28rem', marginLeft: '30rem' }}>{'Debes tener por lo menos 3 cartas para jugar...'}</h2>
                }
            </div>
            <h1>Mazo</h1>
            <div className="grid-inventario" style={{ border: '1px solid #e92b2d', width: '150rem', display: 'flex', justifyContent: 'center', minHeight: '60rem' }}>
                {
                    mazo.length ? mazo.map((c, i) =>

                        <div style={{ cursor: 'pointer' }} key={i} onClick={() => quitarMazo(c)}>
                            {c.createdNFT === false ?
                                <CartaTienda name={c.name} attack={c.attack} defense={c.defense} img={c.img} price={c.sellPrice} />
                                :
                                <CartaTienda name={c.name} attack={c.attack} defense={c.defense} img={c.img} price={c.sellPrice} type={'nft'} />
                            }
                        </div>


                    )
                        :
                        <h2 style={{ marginTop: '28rem' }}>{'Debes seleccionar 3 cartas...'}</h2>
                }
            </div>


            <div style={{ display: 'flex' }}>
                <button style={{ marginTop: '5rem', marginBottom: '2rem' }} className="boton-partida btn-registrarse draw meet" onClick={() => entrar()}> Empezar Partida</button>
                <button style={{ marginTop: '5rem', marginBottom: '2rem' }} className="boton-partida btn-registrarse draw meet" onClick={() => history.push('/')}> Home</button>
            </div>

        </div>
    )

}