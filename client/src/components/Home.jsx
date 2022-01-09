import React from 'react';
import Nav from './Nav';
import Slider from './Slider'
import Destacadas from './Destacadas';
import Seccion2 from './Seccion2';
import ListaUi from './listaUi';
//Slider
export default function Home() {

    return (
        <div >

            
                
         
            <div className='section'>
                <Nav />
                <div className='contenedor-cheto'>
                    <div className='slider-home' >

                        <Slider />
                    </div>
                </div>
            </div>
            <div className='contenedor-cheto'>
                <div className='section'>
                    <Destacadas />
                </div>
                <div className='ranking section'>
                    
                        <Seccion2 />
                    
                </div>
            </div>
        </div>

    )
}
