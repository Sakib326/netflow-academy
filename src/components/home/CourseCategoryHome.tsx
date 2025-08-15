import type { CourseCategory } from "@/types/courseCategory";
import Image from "next/image";
import Link from "next/link";

type Props = {
  categories: CourseCategory[];
};

export default function CourseCategoryHome({ categories }: Props) {
  return (
    <>
      <section className="course-category section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12 wow fadeInUp">
              <div className="section-title text-center">
                <span>Browse Categories</span>
                <h2>Explore Our Courses</h2>
              </div>
            </div>

            {categories?.map((category) => (
              <div
                key={category?.id}
                className="col-xl-3 col-lg-4 col-md-6 col-12 wow fadeIn"
              >
                <div className="single-category">
                  <div className="icon">
                    <img
                      src={`${
                        category?.icon ||
                        "/assets/img/category/digital-marketing.png"
                      }`}
                      alt="icon"
                    />
                  </div>

                  <h3>
                    <Link href={`/courses/${category?.slug}`}>
                      {category?.name}
                    </Link>
                  </h3>
                  <span>{category?.courses_count} Courses</span>
                </div>
              </div>
            ))}

            {/* <div className="col-xl-3 col-lg-4 col-md-6 col-12 wow fadeIn">
              <div className="single-category">
                <div className="icon">
                  
                </div>

                <h3>
                  <a href="#">UI / UX Design</a>
                </h3>
                <span>87 Courses</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
