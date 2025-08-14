"use client";

import { Course, SingleCourse } from "@/types/course";
import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breadcrumb from "../common/Breadcrumb";
import ScrollTop from "../common/ScrollTop";
import ScrollToTop from "../common/ScrollToTop";
import CourseDetailsArea from "./CourseDetailsArea";

interface CourseDetailsProps {
  course: SingleCourse;
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Course Details" subtitle="Course Details" />
      <CourseDetailsArea course={course} />
      <FooterOne />
      <ScrollToTop />
      <ScrollTop />
    </>
  );
}
