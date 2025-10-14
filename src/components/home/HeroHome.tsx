"use client";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HeroHome = () => {
  return (
    <>
      <div className="tw:max-w-full tw:overflow-hidden">
        <Swiper
          slidesPerView={1}
          loop={true}
          pagination={{ el: ".owl-dots", clickable: true }}
          modules={[Autoplay]}
          navigation={{ nextEl: ".owl-next", prevEl: ".owl-prev" }}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          centeredSlides={true}
        >
          <SwiperSlide className="owl-item">
            <div className="tw:w-full tw:aspect-[16/5] tw:relative">
              <Image
                src="/assets/img/hero/hero-1.jpg"
                alt="Hero slide 1"
                fill
                priority
                className="tw:object-contain tw:object-center"
                sizes="100vw"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="owl-item">
            <div className="tw:w-full tw:aspect-[16/5] tw:relative">
              <Image
                src="/assets/img/hero/hero-2.jpeg"
                alt="Hero slide 2"
                fill
                className="tw:object-contain tw:object-center"
                sizes="100vw"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="owl-item">
            <div className="tw:w-full tw:aspect-[16/5] tw:relative">
              <Image
                src="/assets/img/hero/hero-3.jpeg"
                alt="Hero slide 2"
                fill
                className="tw:object-contain tw:object-center"
                sizes="100vw"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default HeroHome;
