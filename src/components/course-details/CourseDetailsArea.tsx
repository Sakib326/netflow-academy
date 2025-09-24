import { useEffect, useState } from "react";
import VideoPopup from "../../modals/VideoPopup";
import { SingleCourse } from "@/types/course";
import Link from "next/link";
import CourseCurriculum from "./components/CourseCurriculum";

interface CourseDetailsAreaProps {
  course: SingleCourse;
}

export default function CourseDetailsArea({ course }: CourseDetailsAreaProps) {
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/js/dist/tab");
    }
  }, []);

  // Null checks for all nested content
  const instructor = course?.instructor ?? {};
  const category = course?.category ?? {};
  const rating_distribution = course?.rating_distribution ?? [];
  const recent_reviews = course?.recent_reviews ?? [];

  return (
    <>
      {/* video modal start */}
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoUrl={course?.thumb_video_url ?? ""}
      />
      {/* video modal end */}

      <section className="courses-details section-padding">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 wow fadeIn">
              <div className="tw:relative tw:w-full tw:mb-6">
                {/* Always show the thumbnail image */}
                <img
                  src={course?.thumbnail ?? "/assets/img/courses/cdetails.jpg"}
                  alt={course?.title ?? "Course"}
                  className="tw:w-full tw:rounded-xl tw:object-cover tw:aspect-video"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/img/courses/cdetails.jpg";
                  }}
                />
              </div>

              <div className="scourse_meta">
                <div className="smeta">
                  <img
                    src={instructor.avatar ?? "/assets/img/instructor.jpg"}
                    alt="author"
                  />
                  <div className="smeta_text">
                    <span>Instructor:</span>
                    <p>
                      <a href="#">{instructor.name ?? "N/A"}</a>
                    </p>
                  </div>
                </div>

                <div className="smeta">
                  <span>Category:</span>
                  <p>{category.name ?? "N/A"}</p>
                </div>

                <div className="smeta">
                  <span>Last Update:</span>
                  <p>
                    {course?.updated_at
                      ? new Date(course.updated_at).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div className="smeta">
                  <span>Review:</span>
                  <p>
                    <a href="#">
                      <span className="rev_icons">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={
                              i < Math.round(course?.average_rating ?? 0)
                                ? "bx bxs-star"
                                : "bx bx-star"
                            }
                          ></i>
                        ))}
                      </span>
                      <span className="rev_content">
                        ({(course?.average_rating ?? 0).toFixed(2)})
                      </span>
                    </a>
                  </p>
                </div>
              </div>

              <h2 className="scourse-title">{course?.title ?? "N/A"}</h2>

              <nav className="cd_tab">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    className="nav-link active"
                    id="nav-overview-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-overview"
                    type="button"
                    role="tab"
                    aria-controls="nav-overview"
                    aria-selected="true"
                  >
                    Overview
                  </button>
                  {/* Only show Curriculum tab if not a bundle */}
                  {!course.is_bundle && (
                    <button
                      className="nav-link"
                      id="nav-curriculum-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-curriculum"
                      type="button"
                      role="tab"
                      aria-controls="nav-curriculum"
                      aria-selected="false"
                    >
                      Curriculum
                    </button>
                  )}
                  <button
                    className="nav-link"
                    id="nav-review-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-review"
                    type="button"
                    role="tab"
                    aria-controls="nav-review"
                    aria-selected="false"
                  >
                    Review
                  </button>
                  <button
                    className="nav-link"
                    id="nav-instructor-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-instructor"
                    type="button"
                    role="tab"
                    aria-controls="nav-disabled"
                    aria-selected="false"
                  >
                    Instructor
                  </button>
                </div>
              </nav>

              <div className="tab-content" id="nav-tabContent">
                {/* Overview Tab */}
                <div
                  className="tab-pane fade show active"
                  id="nav-overview"
                  role="tabpanel"
                  aria-labelledby="nav-overview-tab"
                  tabIndex={0}
                >
                  {course.description && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          course?.description ?? "No description available.",
                      }}
                    />
                  )}
                  {course?.what_you_will_learn && (
                    <div>
                      <h3>What you will learn</h3>
                      <ul>
                        {course.what_you_will_learn
                          .split("\n")
                          .map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                  {course?.requirements && (
                    <div>
                      <h3>Requirements</h3>
                      <ul>
                        {course.requirements.split("\n").map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {course.is_bundle &&
                    course.bundle_courses &&
                    course.bundle_courses.length > 0 && (
                      <div className="tw:mt-6">
                        <h3 className="tw:mb-4 tw:text-lg tw:font-semibold">
                          Included Courses
                        </h3>
                        <div className="tw:grid tw:grid-cols-1 md:tw:grid-cols-2 tw:gap-4">
                          {course.bundle_courses.map((bundle) => (
                            <div
                              key={bundle.id}
                              className="tw:flex tw:items-center tw:bg-gray-50 tw:p-3 tw:rounded tw:shadow-sm"
                            >
                              <div className="tw:flex-shrink-0">
                                <img
                                  src={
                                    bundle.thumbnail ??
                                    "/assets/img/courses/cdetails.jpg"
                                  }
                                  alt={bundle.title}
                                  className="tw:w-20 tw:h-20 tw:object-cover tw:rounded-md tw:border tw:border-gray-200"
                                  style={{
                                    minWidth: 80,
                                    minHeight: 80,
                                    maxWidth: 80,
                                    maxHeight: 80,
                                  }}
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      "/assets/img/courses/cdetails.jpg";
                                  }}
                                />
                              </div>
                              <div className="tw:ml-4 tw:flex-1">
                                <a
                                  href={`/courses/${bundle.slug}`}
                                  className="tw:font-semibold tw:text-blue-700 hover:tw:underline tw:block tw:text-base"
                                >
                                  {bundle.title}
                                </a>
                                <div className="tw:text-xs tw:text-gray-500 tw:mt-1">
                                  {bundle.price && (
                                    <>
                                      <span>৳{bundle.price}</span>
                                      {bundle.discounted_price && (
                                        <span className="tw:line-through tw:ml-2">
                                          ৳{bundle.discounted_price}
                                        </span>
                                      )}
                                    </>
                                  )}
                                </div>
                                <div className="tw:text-xs tw:text-gray-400 tw:mt-1">
                                  {typeof bundle.total_lessons === "number"
                                    ? `${bundle.total_lessons} Lessons`
                                    : ""}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>

                {/* Curriculum Tab (only if not bundle) */}
                {!course.is_bundle && (
                  <div
                    className="tab-pane fade"
                    id="nav-curriculum"
                    role="tabpanel"
                    aria-labelledby="nav-curriculum-tab"
                    tabIndex={0}
                  >
                    <div className="cd_curriculum">
                      <CourseCurriculum course={course} />
                    </div>
                  </div>
                )}

                {/* Review Tab */}
                <div
                  className="tab-pane fade"
                  id="nav-review"
                  role="tabpanel"
                  aria-labelledby="nav-review-tab"
                  tabIndex={0}
                >
                  <div className="cd_rating">
                    <h3>Student's Reviews</h3>
                    <div className="cd_rating_top">
                      <div className="cdr_rate_summary">
                        <h1>{(course?.average_rating ?? 0).toFixed(1)}</h1>
                        <span className="cdr_rating">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={
                                i < Math.round(course?.average_rating ?? 0)
                                  ? "bx bxs-star"
                                  : "bx bx-star"
                              }
                            ></i>
                          ))}
                        </span>
                        <p>Total {course?.total_reviews ?? 0} Rating</p>
                      </div>
                      <div className="cdr_rate_number">
                        <ul>
                          {rating_distribution.length > 0 ? (
                            rating_distribution.map((dist) => (
                              <li key={dist.rating}>
                                <span className="cdr_rate_star">
                                  {dist.rating}
                                </span>
                                <span className="cdr_rate_value">
                                  <span
                                    className="rating_width"
                                    style={{
                                      width: `${dist.percentage ?? 0}%`,
                                    }}
                                  ></span>
                                  <span className="cdr_rate_count">
                                    {dist.count ?? 0} Rating
                                  </span>
                                </span>
                              </li>
                            ))
                          ) : (
                            <li>No rating distribution available.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="rating_list">
                      {recent_reviews.length > 0 ? (
                        recent_reviews.map((review) => (
                          <div className="rating_item" key={review.id}>
                            <div className="rating_item_avatar">
                              <img
                                src={
                                  review.user?.avatar ??
                                  "/assets/img/review/default.jpg"
                                }
                                alt="avatar"
                              />
                              <div className="rava_conent">
                                <h3>{review.user?.name ?? "Anonymous"}</h3>
                                <span className="rating_item_ricon">
                                  {[...Array(5)].map((_, i) => (
                                    <i
                                      key={i}
                                      className={
                                        i < (review.rating ?? 0)
                                          ? "bx bxs-star"
                                          : "bx bx-star"
                                      }
                                    ></i>
                                  ))}
                                </span>
                              </div>
                            </div>
                            <div className="rating_item_content">
                              <p>{review.comment ?? ""}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No reviews yet.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Instructor Tab */}
                <div
                  className="tab-pane fade"
                  id="nav-instructor"
                  role="tabpanel"
                  aria-labelledby="nav-instructor-tab"
                  tabIndex={0}
                >
                  <div className="cd_instructor">
                    <div className="cdin_image">
                      <img
                        src={instructor.avatar ?? "/assets/img/instructor.jpg"}
                        alt=""
                      />
                      {/* Social links can be added here if available */}
                    </div>
                    <div className="cdin_content">
                      <h4>
                        <a href="#">{instructor.name ?? "N/A"}</a>
                      </h4>
                      <span>{instructor.bio ?? ""}</span>
                      <p>{instructor.bio ?? ""}</p>
                      <div className="cdin_meta">
                        <div className="cdin_meta_item">
                          <i className="bx bx-user"></i>{" "}
                          {instructor.total_students ?? 0} Students
                        </div>
                        <div className="cdin_meta_item">
                          <i className="bx bxs-folder-open"></i>{" "}
                          {instructor.total_courses ?? 0} Courses
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-xl-4 wow fadeIn">
              <div className="course-sidebar">
                <h3>Course Features</h3>
                <ul className="scourse_list">
                  <li>
                    <span className="cside-label">
                      <i className="fa-regular fa-file"></i> Lesson
                    </span>
                    <span className="cside-value">
                      {course?.total_lessons ?? 0}
                    </span>
                  </li>
                  <li>
                    <span className="cside-label">
                      <i className="fa-solid fa-graduation-cap"></i> Student’s
                    </span>
                    <span className="cside-value">
                      {course?.total_students ?? 0}
                    </span>
                  </li>

                  <li>
                    <span className="cside-label">
                      <i className="fa-solid fa-chart-line"></i> Skill Level
                    </span>
                    <span className="cside-value">Beginner to Advance</span>
                  </li>
                  <li>
                    <span className="cside-label">
                      <i className="fa-solid fa-language"></i> Language
                    </span>
                    <span className="cside-value">Bangla</span>
                  </li>
                </ul>
                <div className="cd_price">
                  {course.discounted_price ? (
                    <>
                      <span className="tw:line-through tw:text-gray-400 tw:mr-2">
                        ৳{course.price}
                      </span>
                      <span className="tw:text-red-500">
                        ৳{course.discounted_price}
                      </span>
                    </>
                  ) : (
                    <>৳{course.price ?? "N/A"}</>
                  )}
                </div>
                <div className="text-center">
                  <a href="#" className="bg_btn bt">
                    Buy Course
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Related courses section can be made dynamic if you have related courses data */}
        </div>
      </section>
    </>
  );
}
