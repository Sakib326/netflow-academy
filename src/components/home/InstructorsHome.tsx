import type { Instructor } from "@/types/instructor";
import Link from "next/link";

type Props = {
  instructors?: Instructor[];
};

export default function InstructorsHome({ instructors }: Props) {
  return (
    <>
      <section className={`instructors section-padding`}>
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-md-8 wow fadeInUp">
              <div className="section-title">
                <span>Talented Instructors</span>
                <h2>Our Expert Instructors</h2>
              </div>
            </div>

            <div className="col-xl-4 col-md-4 align-self-center text-end title_btn wow fadeIn">
              <Link href="/instructors" className="bg_btn bt">
                View All
              </Link>
            </div>

            {instructors?.map((instructor) => (
              <div
                key={instructor.id}
                className="col-xl-3 col-md-6 col-12 wow fadeIn"
              >
                <div className="single-instructor">
                  <div className="inimage">
                    <img
                      src={instructor?.avatar || "/assets/img/instructor/1.png"}
                      alt={instructor?.name || "Instructor"}
                    />
                    <span className="sicon">
                      <a>
                        <i className="bx bx-plus"></i>
                      </a>
                    </span>
                    <div className="social-link">
                      <ul>
                        <li>
                          <a
                            href={`${
                              instructor?.social_links?.facebook || "#"
                            }`}
                            target="_blank"
                            className="fb_bg"
                          >
                            <i className="bx bxl-facebook"></i>
                          </a>
                        </li>

                        <li>
                          <a
                            href={`${instructor?.social_links?.twitter || "#"}`}
                            className="tw_bg"
                          >
                            <i className="bx bxl-twitter"></i>
                          </a>
                        </li>

                        <li>
                          <a
                            href={`${
                              instructor?.social_links?.linkedin || "#"
                            }`}
                            className="li_bg"
                          >
                            <i className="bx bxl-linkedin"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="inbottom">
                    <h3>
                      <Link href={`/instructors/${instructor?.id}`}>
                        {instructor?.name}
                      </Link>
                    </h3>
                    <span className="designation">
                      {instructor?.designation || "UI / UX Designer"}
                    </span>

                    <div className="inmeta">
                      <span className="float-start">
                        <i className="bx bx-user"></i>
                        <p>{instructor?.total_students} Students</p>
                      </span>

                      <span className="float-end">
                        <i className="bx bx-file-blank"></i>
                        <p>{instructor?.total_courses} Courses</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
