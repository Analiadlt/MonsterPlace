import React from 'react';


import { Navigation, Pagination } from 'swiper';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
// Styles must use direct files imports
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import Prueba from './Prueba'
import { useSelector } from 'react-redux';

export default function App() {

    const carta = useSelector(state => state.dragonesbd)
    return (
        <div className="container">
            <Swiper
                modules={[Navigation, Pagination]}
                navigation={true}
                effect={"coverflow"}
                centeredSlides={true}
                slidesPerView={window.innerWidth < 768 ? 1 : "auto"}
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
                { carta.map( dragon=>
                <SwiperSlide>
                    <Prueba name={dragon.name} atack={dragon.attack} defense={dragon.defense} img={dragon.img} price={dragon.sellPrice} type={dragon.type} />
                </SwiperSlide>
                )
                }   
            </Swiper>



        </div>

    )
}






/*
import Prueba from './Prueba'
import { useSelector } from 'react-redux';

const carta = useSelector(state => state.dragonesbd)
const dragon = carta[5] */