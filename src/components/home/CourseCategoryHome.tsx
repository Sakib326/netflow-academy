import type { CourseCategory } from "@/types/courseCategory";
import Link from "next/link";
import {
  FaCode,
  FaPaintBrush,
  FaChartLine,
  FaGlobe,
  FaLaptopCode,
  FaCamera,
  FaPenNib,
  FaBrain,
} from "react-icons/fa";

type Props = {
  categories: CourseCategory[];
};

const icons = [
  FaCode,
  FaPaintBrush,
  FaChartLine,
  FaGlobe,
  FaLaptopCode,
  FaCamera,
  FaPenNib,
  FaBrain,
];

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

            <div className="tw:grid tw:justify-center tw:grid-cols-1 tw:md:grid-cols-2 tw:lg:grid-cols-4 tw:gap-6">
              {categories?.map((category, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <div key={category?.id} className="">
                    <div className="single-category tw:h-full">
                      <div className="icon">
                        <Icon className="tw:text-xl" />
                      </div>

                      <h3>
                        <Link href={`/courses/${category?.slug}`}>
                          {category?.name}
                        </Link>
                      </h3>
                      <span>{category?.courses_count} Courses</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
