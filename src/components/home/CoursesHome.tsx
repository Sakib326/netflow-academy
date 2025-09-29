"use client";
import Link from "next/link";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Course } from "@/types/course";

type Props = {
  courses: Course[];
};
export default function CoursesHome({ courses }: Props) {
  return (
    <>
      <section className="courses">
        <div className="container">
          <div className="row">
            <div className="col-12 wow fadeInUp">
              <div className="section-title">
                <span>Our Courses List</span>
                <h2>Most Popular Courses</h2>
              </div>
            </div>

            <div className="col-12 wow fadeIn">
              <div className="courses-slider owl-carousel owl-loaded owl-drag">
                <Swiper
                  slidesPerView={3}
                  spaceBetween={30}
                  loop={true}
                  pagination={{ clickable: true }}
                  modules={[Autoplay, Navigation]}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  navigation={{ nextEl: ".owl-next", prevEl: ".owl-prev" }}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1200: {
                      slidesPerView: 3,
                    },
                  }}
                  className="courses-slider owl-carousel owl-loaded owl-drag"
                >
                  {courses?.map((course) => (
                    <SwiperSlide
                      key={course?.id}
                      className="single-course tw:shadow"
                    >
                      <div className="course-img tw:rounded-b-0 tw:relative">
                        <img
                          src={`${course?.thumbnail}`}
                          alt="course image"
                          className="tw:rounded-b-0"
                        />
                        {/* Discounted price display */}
                        <span className="cprice">
                          {course?.discounted_price ? (
                            <>
                              <span className="tw:line-through tw:text-gray-400 tw:mr-2">
                                ৳{course?.price}
                              </span>
                              <span className="tw:text-red-500">
                                ৳{course?.discounted_price}
                              </span>
                            </>
                          ) : (
                            <>৳{course?.price}</>
                          )}
                        </span>
                        {/* Bundle badge */}
                        {course?.is_bundle && (
                          <span className="tw:absolute tw:top-2 tw:left-2 tw:bg-yellow-400 tw:text-xs tw:px-2 tw:py-1 tw:rounded">
                            Bundle
                          </span>
                        )}
                      </div>

                      <div className="course_content tw:p-4">
                        <div className="crating">
                          <a href="#">
                            {new Array(course?.average_rating || 0)
                              .fill(0)
                              .map((_, i) => (
                                <i key={i} className="bx bxs-star"></i>
                              ))}
                            <span>({course?.total_reviews})</span>
                          </a>
                        </div>
                        <h2 className="tw:text-md">
                          <Link
                            href={`/courses/${course?.slug}`}
                            className="tw:text-md"
                          >
                            {course?.title}
                          </Link>
                        </h2>

                        {/* Grouped courses for bundles */}
                        {course?.is_bundle &&
                          course?.group_courses &&
                          course?.group_courses?.length > 0 && (
                            <div className="tw-mt-2 tw-mb-2 tw-text-xs tw-bg-gray-100 tw-p-2 tw-rounded">
                              <strong>Includes:</strong>
                              <ul className="tw-list-disc tw-ml-4">
                                {course.group_courses.map((gc) => (
                                  <li key={gc.id}>
                                    <Link
                                      href={`/courses/${gc.slug}`}
                                      className="tw-underline"
                                    >
                                      {gc.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        <div className="cmeta">
                          <div className="smeta">
                            <i className="bx bx-file"></i>
                            {course?.total_lessons} Lessons
                          </div>
                          <div className="ccategory">
                            <Link href={`/courses/${course?.category?.slug}`}>
                              {course?.category?.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="owl-nav">
                  <button
                    type="button"
                    role="presentation"
                    className="owl-prev"
                  >
                    <i className="bx bx-chevrons-left"></i>
                  </button>
                  <button
                    type="button"
                    role="presentation"
                    className="owl-next"
                  >
                    <i className="bx bx-chevrons-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
