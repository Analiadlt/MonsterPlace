import React from "react";



export default function SliderContent({dragon}) {

    return(
        <div>
            <section className='slider'>   
                <div className='info-slider'>
                    <h1 id='nombre-slider'>
                        {dragon.name}
                    </h1>
                    <h3 id="tipo-slider" >
                        {dragon.type}
                    </h3>
                    <button>Ver en la tienda</button>
                </div>
                <div >
                    <img id='slider-img'classname="dragon-slider" src= {dragon.img} alt="dragon" />
                </div>
           
        </section>
        </div>
    )
}