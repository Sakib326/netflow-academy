"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BrandHome() {
  const partners = [
    { src: "assets/img/partners/youtube.png", link: "https://youtube.com" },
    { src: "assets/img/partners/linkedin.png", link: "https://linkedin.com" },
    { src: "assets/img/partners/fiverr.png", link: "https://fiverr.com" },
    {
      src: "assets/img/partners/freelancer.png",
      link: "https://freelancer.com",
    },
    { src: "assets/img/partners/upwork.png", link: "https://upwork.com" },
    { src: "assets/img/partners/facebook.png", link: "https://facebook.com" },
  ];

  // Duplicate for looping effect
  const slides = partners.concat(partners);

  return (
    <section className="container tw:pt-12 wow fadeIn mb-5 tw:bg-gray-50">
      <div className="row tw:bg-white">
        <Swiper
          slidesPerView={4}
          spaceBetween={40}
          loop={true}
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          className="mx-auto partners owl-carousel tw:flex tw:items-center"
        >
          {slides.map((partner, index) => (
            <SwiperSlide key={index} className="client-item">
              <a
                href={partner.link}
                target="_blank"
                className="tw:w-12"
                rel="noopener noreferrer"
              >
                <img
                  src={partner.src}
                  className="tw:w-64 tw:h-20 tw:object-center tw:object-contain"
                  alt={`partner ${index + 1}`}
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
