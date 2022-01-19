import React from "react";
import Card from '../Card'




export default function Mazo() {
    const mazo1 = [{
        name: "warlockk",
        attack: 1,
        defense: 2,
        img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso1.png?alt=media&token=52c53a37-57b4-483e-bd88-d62fc81e7d93",
        state: "activa",
        type: "legendary",
        sellCount: 1,
        sellPrice: 200
    },
    
    {
        name: "plover",
        attack: 2,
        defense: 3,
        img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso11.png?alt=media&token=1bf33928-cede-47c1-b12e-f5655c1ae074",
        state: "activa",
        type: "legendary",
        sellCount: 1,
        sellPrice: 500
    },
    
    {
        name: "gigadude",
        attack: 3,
        defense: 4,
        img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso12.png?alt=media&token=bc22754b-000d-4e78-995a-5180cfcd54de",
        state: "activa",
        type: "legendary",
        sellCount: 1,
        sellPrice: 300
    
    }]

    return(
        <div className="grid-inventario">
        {
            mazo1.map(dragon =>
                <Card name={dragon.name} atack={dragon.attack} defense={dragon.defense} img={dragon.img} price={dragon.sellPrice} type={dragon.type} />
            )
        }
    </div>
    )




}