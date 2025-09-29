import { Course, PaginationLink } from "@/types/course";
import Link from "next/link";

interface CoursesAreaProps {
  courses: Course[];
  pagination: {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export default function CoursesArea({ courses, pagination }: CoursesAreaProps) {
  return (
    <>
      <section className="courses section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="ccount_result">
                Showing {pagination.from} - {pagination.to} <span>Courses</span>{" "}
                of {pagination.total} result
              </p>
            </div>

            <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:lg:grid-cols-3 tw:gap-8">
              {courses.map((course) => (
                <div className="wow fadeIn tw:h-full" key={course.id}>
                  <div className="single-course tw:flex tw:flex-col tw:h-full">
                    {/* Image */}
                    <div className="course-img">
                      <img
                        src={
                          course.thumbnail ?? "/assets/img/courses/default.jpg"
                        }
                        alt={course.title}
                        className="tw:aspect-video"
                      />
                      <span className="cprice">৳{course.price}</span>
                    </div>

                    {/* Content */}
                    <div className="course_content tw:p-6 tw:flex tw:flex-col tw:flex-grow">
                      <div className="crating">
                        <span>
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={
                                i < Math.round(course.average_rating)
                                  ? "bx bxs-star"
                                  : "bx bx-star"
                              }
                            ></i>
                          ))}
                          <span>({course.total_reviews})</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="tw:text-lg tw:mb-2 tw:flex-grow">
                        <Link href={`/courses/${course.slug ?? course.id}`}>
                          {course.title}
                        </Link>
                      </h2>

                      {/* Meta */}
                      <div className="cmeta">
                        <div className="ccategory">
                          <a href="#">{course.category.name}</a>
                        </div>
                        <div className="smeta">
                          <i className="bx bx-file"></i>
                          {course.total_lessons} Lessons
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
