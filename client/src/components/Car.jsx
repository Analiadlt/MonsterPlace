import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.scss"; 
import "swiper/modules/navigation/navigation.scss"; 
import "swiper/modules/pagination/pagination.scss";
import Prueba from "./Prueba";
import { useSelector } from "react-redux";

export default function App() {
  const carta = useSelector((state) => state.dragones);

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
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {carta.map((dragon) => (
          <SwiperSlide>
            <Prueba
              name={dragon.name}
              atack={dragon.atack}
              defense={dragon.defense}
              img={dragon.img}
              price={dragon.price}
              type={dragon.type}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

