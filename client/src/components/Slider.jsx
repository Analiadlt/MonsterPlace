import React from 'react';
import { useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import SliderContent from './SliderContent';

// exporto el slider

export default function Slider(){
    const dragon = useSelector(state => state.dragones)
	return ( 
            <Carousel autoPlay={true} autoFocus={true} transitionTime={2000} interval={5000} infiniteLoop={true} className='slider-cont'>
                <div className='seccion-slider'>  
                    <SliderContent dragon={dragon[0]}/>
                </div>
                <div className='seccion-slider'>
                    <SliderContent dragon={dragon[1]}/>
                </div>
                <div className='seccion-slider'>
                    <SliderContent dragon={dragon[2]}/>
                </div>
            </Carousel>
		
	)
}
