import React from "react";
import { useSelector } from 'react-redux'
import espadas from '../../img/espadas.svg'
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import logo from '../../img/logo.png'

export default function CartaGame({attack, defense, state, type, name, img, funcion, carta, key}) {
    const cartas = useSelector(state => state.dragonesbd)
    const muestra = cartas[0]
    return (
        <div id={name} style={{transition:'1.3s'}}>
            <div class="game">
                <div class="rank">{attack}</div>
                <div class="front">
                    <img class="thumbnail" src={img} alt='' />
                    <h3 class="name">{name}</h3>
                        {/*                     <div class="stats">
                        <p class="viewers">{type}</p>
                        <div class="streamers">
                            <p>{state}</p>
                        </div>
                    </div> */}
                </div>

                <div class="back ">
                    <div class="streaming-info">
                        <p class="game-stat" style={{textTransform:"uppercase"}}>{type}</p>
                        <p class="game-stat" style={{textTransform:"uppercase"}}>{state}</p>
                    </div>
                    <button class="btn" onClick={()=>funcion(carta)}>Elegir Carta</button>
                    <div class="streamers">
                        <div class="streamer"> 
                            <div class="icon" style={{color:'white'}}><img src={espadas} style={{color:'white'}} alt="" /></div>
                            <p class="name">Attack</p>
                            <p class="number">{attack}</p>
                        </div>

                        <div class="streamer">
                            <div class="icon"><HealthAndSafetyOutlinedIcon fontSize="large"/></div>
                            <p class="name">Defense</p>
                            <p class="number">{defense}</p>
                        </div>


                    </div>
                    
                </div>
                <div class="background"></div>
            </div>
            

 
            





        </div>




    )

}



