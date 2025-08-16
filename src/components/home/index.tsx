import type { Course } from "@/types/course";
import type { Instructor } from "@/types/instructor";
import type { CourseCategory } from "@/types/courseCategory";
import type { Review } from "@/types/review";
import AboutHome from "./AboutHome";
import BrandHome from "./BrandHome";
import CounterHome from "./CounterHome";
import CourseCategoryHome from "./CourseCategoryHome";
import CoursesHome from "./CoursesHome";
import FeatureHome from "./FeatureHome";
import HeroHome from "./HeroHome";
import Instructors from "./InstructorsHome";
import ReviewHome from "./ReviewHome";
import VideoHome from "./VideoHome";
import WorkingProcessHome from "./WorkingProcessHome";

type Props = {
  courses: Course[];
  categories: CourseCategory[];
  instructors: Instructor[];
  reviews: Review[];
};

const Home = ({ courses, categories, instructors, reviews }: Props) => {
  return (
    <>
      <HeroHome />
      <FeatureHome />
      <AboutHome />
      <CounterHome />
      <CoursesHome courses={courses} />
      <CourseCategoryHome categories={categories} />
      <WorkingProcessHome />
      <Instructors instructors={instructors} />
      <VideoHome />
      <ReviewHome reviews={reviews} />
      <BrandHome />
    </>
  );
};
export default Home;
