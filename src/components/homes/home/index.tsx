import { Course, Instructor } from "@/types/course";
import FooterOne from "../../../layouts/footers/FooterOne";
import HeaderOne from "../../../layouts/headers/HeaderOne";
import ScrollToTop from "../../common/ScrollToTop";
import ScrollTop from "../../common/ScrollTop";
import AboutHomeOne from "./AboutHomeOne";
import BrandHomeOne from "./BrandHomeOne";
import CounterHomeOne from "./CounterHomeOne";
import CourseCategoryHomeOne from "./CourseCategoryHomeOne";
import CoursesHomeOne from "./CoursesHomeOne";
import FeatureHomeOne from "./FeatureHomeOne";
import HeroHomeOne from "./HeroHomeOne";
import InstructorsHomeOne from "./InstructorsHomeOne";
import ReviewHomeOne from "./ReviewHomeOne";
import VideoHomeOne from "./VideoHomeOne";
import WorkingProcessHomeOne from "./WorkingProcessHomeOne";
import { CourseCategory } from "@/types/courseCategory";
import { Review } from "@/types/review";

interface HomeOneProps {
  courses: Course[];
  categories: CourseCategory[];
  instructors: Instructor[];
  reviews: Review[];
}

export default function HomeOne({
  courses,
  categories,
  instructors,
  reviews,
}: HomeOneProps) {
  console.log({
    courses,
    categories,
    instructors,
    reviews,
  });

  return (
    <>
      <HeaderOne />
      <HeroHomeOne />
      <FeatureHomeOne />
      <AboutHomeOne />
      <CounterHomeOne />
      <CoursesHomeOne />
      <CourseCategoryHomeOne />
      <WorkingProcessHomeOne />
      <InstructorsHomeOne />
      <VideoHomeOne />
      <ReviewHomeOne />
      <BrandHomeOne />
      <FooterOne />
      <ScrollToTop />
      <ScrollTop />
    </>
  );
}
