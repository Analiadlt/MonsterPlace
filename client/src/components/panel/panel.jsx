import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import NavCheto from "../NavCheto";
import CreateItem from "../NFT/CrearNFT";
import CrearCarta from "./CrearCrtas";
// import BorrarCarta from "./borrarCarta";
import { getCard } from "../../redux/actions";
import CartaPanel from "./cartaPanel";
import { Link } from "react-router-dom";


export default function Panel(){
    const loading = useSelector(state => state.loading)
    const bichos = useSelector(state => state.dragonesbd)
    // const bichos = useSelector(state => state.cardsorden)
    const dragones = bichos.filter(bi => bi.createdNFT === false)
    const dispatch = useDispatch()
    const [orden, setOrden] = useState('ASC');

    useEffect(() => {
        // if (!bichos.length && !loading.loading) {
        dispatch(getCard(orden))
        //    }
    }, [dispatch, orden])

    //ordenamiento
    function changeOrder(e) {
        e.preventDefault();
        setOrden(e.target.value);
    };
    const [navPanel, setNavpanel] =  useState('home')
    return(
        <div>
            <NavCheto />
            <h1>Panel de control</h1>
            <div>
            
            <div className="nav-tienda">
                <h3 className={`${navPanel === 'home' ?  "activoTienda" : null}`} onClick={()=> setNavpanel('home')}>Home</h3>
                <h3 className={`${navPanel === 'home' ?  "activoTienda" : null}`} onClick={()=> setNavpanel('crearcartas')}>Crear Cartas</h3>
                <h3 className={`${navPanel === 'home' ?  "activoTienda" : null}`} onClick={()=> setNavpanel('crearnft')}>Crear Nft</h3>
                
    
            </div>
            <div>
                {navPanel === 'home'? <h1>Listado Cartas</h1> : null }
                {navPanel === 'crearcartas'? <CrearCarta/>: null }
                {navPanel === 'crearnft'? <CreateItem/>: null }
            </div>
            <div className="contenedor-filtros">
                            <h5>Ordenar por</h5>
                            <select onChange={(e) => changeOrder(e)} className="filtros">
                                <option value='ASC'>Menor Precio</option>
                                <option value='DESC'>Mayor Precio</option>
                                <option value='A_ASC'>Menor Ataque</option>
                                <option value='A_DESC'>Mayor Ataque</option>
                                <option value='D_ASC'>Menor Defensa</option>
                                <option value='D_DESC'>Mayor Defensa</option>
                            </select>
            </div>

            {loading.loading ? <h1>Cargando...</h1> :
                        <div className="contenedor-tajetas">

                            <div className="grid-tienda">
                                {
                                    dragones.map(dragon => (
                                        
                                        <div className="cart-tienda">
                                            <Link className="Link" to={"/panel/" + dragon.id}>
                                            <CartaPanel name={dragon.name} attack={dragon.attack} defense={dragon.defense} img={dragon.img} price={dragon.sellPrice} botones={true} />
                                            </Link>
                                        </div>

                                    )
                                    )
                                }
                            </div>
                        </div>

                    }

            </div>
        </div>
    )
}