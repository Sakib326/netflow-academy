"use client";
import { PaginatedCourses } from "@/types/course";
import Breadcrumb from "../common/Breadcrumb";
import CoursesArea from "./CoursesArea";

export default function Courses(props: PaginatedCourses) {
  const { courses, ...pagination } = { courses: props.data, ...props };

  return (
    <>
      <Breadcrumb title="Courses" subtitle="Courses" />
      <CoursesArea courses={courses} pagination={pagination} />
    </>
  );
}
