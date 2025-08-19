"use client";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HeroHome = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{ el: ".owl-dots", clickable: true }}
        modules={[Autoplay]}
        navigation={{ nextEl: ".owl-next", prevEl: ".owl-prev" }}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        centeredSlides={true}
        className="owl-stage-outer "
      >
        <SwiperSlide className="owl-item">
          <Image
            src="/assets/img/hero/hero-1.jpg"
            alt="review"
            width={1320}
            height={600}
            className="tw:w-full tw:h-[700px] tw:object-fill tw:object-center"
          />
        </SwiperSlide>
        <SwiperSlide className="owl-item">
          <Image
            src="/assets/img/hero/hero-2.jpg"
            alt="review"
            width={1320}
            height={600}
            className="tw:w-full tw:h-[700px] tw:object-fill tw:object-center"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default HeroHome;
