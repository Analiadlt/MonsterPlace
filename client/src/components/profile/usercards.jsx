import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavCheto from '../NavCheto';
import { app } from "../../firebase/firebase";
import { getUserCard } from '../../redux/actions';
import CartaTienda from '../cartaTienda';


export default function UserCards() {

    
    const dispatch = useDispatch();
    const { id } = useParams();
    const [cId,] = useState(id);
    const cardsDetail = useSelector(state => state.userCards)
    const user = useSelector(state => state.userLogueado)
    console.log("user: ", user)

    
    
    
    useEffect(() => { 
        
        if(!user){
            alert("No hay user")
        } else {
        dispatch(getUserCard(cId))
        }
    }, [dispatch, user, cId]);

 

    console.log("Cartas desde usercards: ", cardsDetail)

    return (
        <div>
            <NavCheto />
            <div className="container">
              
                <p>{cardsDetail[0]?.name}</p>
                {
                cardsDetail?.map(c => 
                   
                   <CartaTienda
                             
                   name={c.name} attack={c.attack} defense={c.defense} img={c.img} price={c.sellPrice} type={c.type} 

                    />
            )
                }
                  

             </div>
        </div>
    )
  
}