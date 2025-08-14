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

            {courses.map((course) => (
              <div
                className="col-xl-4 col-md-6 col-12 wow fadeIn"
                key={course.id}
              >
                <div className="single-course">
                  <div className="course-img">
                    <img
                      src={
                        course.thumbnail ?? "/assets/img/courses/default.jpg"
                      }
                      alt={course.title}
                    />
                    <span className="cprice">৳{course.price}</span>
                  </div>

                  <div className="course_content">
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
                    <h2>
                      <Link href={`/courses/${course.slug ?? course.id}`}>
                        {course.title}
                      </Link>
                    </h2>

                    <div className="cmeta">
                      <div className="smeta">
                        <i className="bx bx-user"></i>
                        {course.total_students} Students
                      </div>
                      <div className="smeta">
                        <i className="bx bx-file"></i>
                        {course.total_lessons} Lessons
                      </div>
                      <div className="smeta">
                        <i className="bx bx-time-five"></i>
                        {course.duration ?? "N/A"}
                      </div>
                    </div>

                    <div className="course_btm">
                      <div className="cauthor">
                        <a href="#">
                          <img
                            src={
                              course.instructor.avatar ??
                              "/assets/img/review/default.jpg"
                            }
                            alt=""
                          />
                          <span>{course.instructor.name}</span>
                        </a>
                      </div>
                      <div className="ccategory">
                        <a href="#">{course.category.name}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="col-12 text-center">
              <div className="post_pagination">
                <ul>
                  {pagination.links.map((link, idx) => (
                    <li key={idx} className={link.active ? "active" : ""}>
                      {link.url ? (
                        <Link
                          href={link.url.replace(pagination.path, "/courses")}
                        >
                          <span
                            dangerouslySetInnerHTML={{ __html: link.label }}
                          />
                        </Link>
                      ) : (
                        <span
                          dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
