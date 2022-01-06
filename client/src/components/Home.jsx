import React  from 'react';
import Nav from './Nav';
import Slider from './Slider'
import Destacadas from './Destacadas';

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
        </div>
        
    )
}
