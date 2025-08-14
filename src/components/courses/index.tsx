"use client";
import { PaginatedCourses } from "@/types/course";
import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breadcrumb from "../common/Breadcrumb";
import ScrollTop from "../common/ScrollTop";
import ScrollToTop from "../common/ScrollToTop";
import CoursesArea from "./CoursesArea";

export default function Courses(props: PaginatedCourses) {
  const { courses, ...pagination } = { courses: props.data, ...props };

  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Courses" subtitle="Courses" />
      <CoursesArea courses={courses} pagination={pagination} />
      <FooterOne />
      <ScrollToTop />
      <ScrollTop />
    </>
  );
}
