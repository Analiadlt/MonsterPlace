import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserCard } from '../../redux/actions';
import CartaTienda from '../cartaTienda';




export default function Inventario() {

  const dispatch = useDispatch();
  const { id } = useParams();
  const [cId,] = useState(id);
  const cardsDetail = useSelector(state => state.userCards)
  const user = useSelector(state => state.userLogueado.email)
  const users = useSelector(state => state.users)
//   console.log("Datos de los Usuarios desde Inventario: ", users)
//   console.log("User Email Logeado desde Inventario ", user)


const resultado = users.find( e=> e.email === user );

// console.log ("Encontrado desde inventario", resultado.id)


const uId = resultado?.id

// console.log("Id del usuario: " , uId.id)

  
  
  
  useEffect(() => { 
      
      if(!user){
          alert("No hay user")
      } else {
      dispatch(getUserCard(uId))
      }
  }, [dispatch, user, uId]);

//   console.log("Cartas desde inventario", cardsDetail)


    // const mazo1 = [{
    //     name: "warlockk",
    //     attack: 1,
    //     defense: 2,
    //     img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso1.png?alt=media&token=52c53a37-57b4-483e-bd88-d62fc81e7d93",
    //     state: "activa",
    //     type: "legendary",
    //     sellCount: 1,
    //     sellPrice: 200
    //   },
      
    //   {
    //     name: "plover",
    //     attack: 2,
    //     defense: 3,
    //     img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso11.png?alt=media&token=1bf33928-cede-47c1-b12e-f5655c1ae074",
    //     state: "activa",
    //     type: "legendary",
    //     sellCount: 1,
    //     sellPrice: 500
    //   },
      
    //   {
    //     name: "gigadude",
    //     attack: 3,
    //     defense: 4,
    //     img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso12.png?alt=media&token=bc22754b-000d-4e78-995a-5180cfcd54de",
    //     state: "activa",
    //     type: "legendary",
    //     sellCount: 1,
    //     sellPrice: 300
      
    //   },
      
      
    //     {
    //       name: "octopi",
    //       attack: 4,
    //       defense: 5,
    //       img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso13.png?alt=media&token=2cfce067-415f-4b42-b8bf-0ce667c628a6",
    //       state: "activa",
    //       type: "legendary",
    //       sellCount: 1,
    //       sellPrice: 400
    //     },
      
    //     {
    //       name: "ouster",
    //       attack: 5,
    //       defense: 6,
    //       img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso3.png?alt=media&token=edfd5c70-c7c6-4c03-8925-67d66cde53fa",
    //       state: "activa",
    //       type: "legendary",
    //       sellCount: 1,
    //       sellPrice: 350
    //     },
      
    //     {
    //       name: "oxonomy",
    //       attack: 6,
    //       defense: 7,
    //       img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso4.png?alt=media&token=fca777ad-267b-4a36-9d60-713ec7f832e0",
    //       state: "activa",
    //       type: "epic",
    //       sellCount: 1,
    //       sellPrice: 500
    //     }
    //   ]

    return(
        <div className="grid-inventario">
{
                cardsDetail?.map(c => 
                    c.createdNFT === false ?
                   <CartaTienda
                             
                   name={c.name} attack={c.attack} defense={c.defense} img={c.img} price={c.sellPrice}

                    />
                    :
                    <CartaTienda
                             
                    name={c.name} attack={c.attack} defense={c.defense} img={c.img} price={c.sellPrice} type={'nft'} 
 
                     />

            )
                }
    </div>
    )




}