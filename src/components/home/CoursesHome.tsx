"use client";
import Link from "next/link";
import type { Course } from "@/types/course";
import CourseMeta from "./CourseMeta";

type Props = {
  courses: Course[];
};
export default function CoursesHome({ courses }: Props) {
  return (
    <section className="courses">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title tw:text-center tw:mb-10">
              <span>Our Courses List</span>
              <h2>Most Popular Courses</h2>
            </div>
          </div>
        </div>

        <div className="row">
          {courses?.map((course) => (
            <div key={course?.id} className="col-lg-4 col-md-6 col-sm-12">
              <div className="single-course">
                <div className="course-img tw:relative">
                  <img
                    src={`${course?.thumbnail}`}
                    alt={course?.title || "course image"}
                  />
                  {/* Price Overlay */}
                  <span className="cprice tw:bg-gradient-to-r tw:from-blue-600 tw:to-blue-800 tw:text-white tw:font-bold tw:shadow-lg">
                    {course?.discounted_price ? (
                      <span className="tw:flex tw:items-center tw:gap-2">
                        <span className="tw:line-through tw:opacity-70 tw:text-sm">
                          ৳{course?.price}
                        </span>
                        <span className="tw:text-yellow-300 tw:text-lg">
                          ৳{course?.discounted_price}
                        </span>
                      </span>
                    ) : (
                      <span className="tw:text-lg">৳{course?.price}</span>
                    )}
                  </span>
                  {/* Bundle Badge */}
                  {course?.is_bundle && (
                    <span className="tw:absolute tw:top-2 tw:right-2 tw:bg-yellow-400 tw:text-black tw:text-xs tw:font-bold tw:px-2 tw:py-1 tw:rounded">
                      Bundle
                    </span>
                  )}
                </div>

                <div className="course_content">
                  <div className="crating">
                    <a href="#">
                      {new Array(Math.floor(course?.average_rating || 0))
                        .fill(0)
                        .map((_, i) => (
                          <i key={i} className="bx bxs-star"></i>
                        ))}
                      <span>({course?.total_reviews || 0})</span>
                    </a>
                  </div>
                  <h2>
                    <Link href={`/courses/${course?.slug}`}>
                      {course?.title}
                    </Link>
                  </h2>

                  {/* Grouped courses for bundles */}
                  {course?.is_bundle &&
                    course?.group_courses &&
                    course?.group_courses?.length > 0 && (
                      <div className="tw:mt-2 tw:mb-2 tw:text-xs tw:bg-gray-100 tw:p-2 tw:rounded">
                        <strong>Includes:</strong>
                        <ul className="tw:list-disc tw:ml-4">
                          {course.group_courses.map((gc) => (
                            <li key={gc.id}>
                              <Link
                                href={`/courses/${gc.slug}`}
                                className="tw:underline"
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
                      <CourseMeta slug={course?.slug} />
                    </div>
                    <div className="ccategory">
                      <Link href={`/courses/${course?.category?.slug}`}>
                        {course?.category?.name}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!courses || courses.length === 0) && (
          <div className="row">
            <div className="col-12 tw:text-center tw:py-16">
              <div className="tw:text-gray-400 tw:text-6xl tw:mb-4">📚</div>
              <h3 className="tw:text-xl tw:font-semibold tw:text-gray-600 tw:mb-2">
                No courses available
              </h3>
              <p className="tw:text-gray-500">
                Check back soon for new courses!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
