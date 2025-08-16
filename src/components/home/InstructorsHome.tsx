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
              {/* <Link href="/instructors" className="bg_btn bt">
                View All
              </Link> */}
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
                      className="tw:rounded"
                    />
                  </div>

                  <div className="inbottom tw:pb-4">
                    <h3>{instructor?.name}</h3>
                    <span className="designation">
                      {instructor?.designation || "UI / UX Designer"}
                    </span>
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
