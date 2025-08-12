import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breadcrumb from "../common/Breadcrumb";
import ScrollTop from "../common/ScrollTop";
import ScrollToTop from "../common/ScrollToTop";
import CourseDetailsArea from "./CourseDetailsArea";

 

export default function CourseDetails() {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Course Details" subtitle="Course Details" />
      <CourseDetailsArea />
      <FooterOne />
      <ScrollToTop />
      <ScrollTop />
    </>
  )
}


