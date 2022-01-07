import React  from 'react';
import Nav from './Nav';
import Slider from './Slider'
import Destacadas from './Destacadas';
import Seccion2 from './Seccion2';
import ListaUi from './listaUi';
//Slider
export default function Home() {

    return (
        <div>
            <div className='section'>
            <Nav/>
            <div className='slider-home' >
            
            <Slider/>
            </div>
            </div>
            <div className='section'>
                <Destacadas/>
            </div>
            <div className='ranking'>
                <div className='section'>
                    <Seccion2/>
                </div>
            </div>
        </div>
        
    )
}
