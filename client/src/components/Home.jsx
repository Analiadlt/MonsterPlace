import React  from 'react';
import Nav from './Nav';
import Slider from './Slider'

//Slider
export default function Home() {

    return (
        <div>
            <Nav/>
            <div className='slider-home' >
            <Slider/>
            </div>
        </div>
        
    )
}
