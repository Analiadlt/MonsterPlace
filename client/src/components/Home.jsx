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
            <Nav/>
            <div className='slider-home' >
            <Slider/>
            </div>
            <div>
                <Destacadas/>
            </div>
            <div className='ranking'>
                <Seccion2/>
            </div>
        </div>
        
    )
}
