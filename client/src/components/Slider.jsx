import slider1 from '../img/sol1.png'
import slider2 from '../img/crypto.png'
import slider3 from '../img/huevos.png'
import React from 'react';


import { Autoplay, Navigation, Pagination } from 'swiper';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
// Styles must use direct files imports
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import Prueba from './Prueba'
import { useSelector } from 'react-redux';

export default function Slider() {

    const carta = useSelector(state => state.dragones)

    return (
        <div className="container-slider">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={false}
                effect={"coverflow"}
                autoplay={{
                    "delay": 4500,
                    "disableOnInteraction": false
                  }}
                centeredSlides={true}
                slidesPerView={window.innerWidth < 300 ? 1 : "auto"}
                loop={true}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true
                }}
                pagination={{
                    clickable: true
                }}
                className="mySwiper"
            >
                <SwiperSlide >
                    <img className='container-slider' src={slider1} alt="" />
                </SwiperSlide>
                <SwiperSlide >
                    <img className='container-slider' src={slider2} alt="" />
                </SwiperSlide>
                <SwiperSlide >
                    <img className='container-slider' src={slider3} alt="" />
                </SwiperSlide>
                </Swiper>



        </div>

    )
}

