"use client";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HeroHome = () => {
  return (
    <div className="container">
      <Swiper
        slidesPerView={1}
        // spaceBetween={30}
        loop={true}
        pagination={{ el: ".owl-dots", clickable: true }}
        modules={[Autoplay]}
        navigation={{ nextEl: ".owl-next", prevEl: ".owl-prev" }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        centeredSlides={true}
        className="owl-stage-outer"
      >
        <SwiperSlide className="owl-item">
          <Image
            src="/assets/img/hero/hero-1.jpg"
            alt="review"
            width={1320}
            height={600}
            className="img-fluid"
          />
        </SwiperSlide>
        <SwiperSlide className="owl-item">
          <Image
            src="/assets/img/hero/hero-2.jpg"
            alt="review"
            width={1320}
            height={600}
            className="img-fluid"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default HeroHome;
