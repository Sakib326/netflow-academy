"use client";

import { SingleCourse } from "@/types/course";
import Breadcrumb from "../common/Breadcrumb";
import CourseDetailsArea from "./CourseDetailsArea";

interface CourseDetailsProps {
  course: SingleCourse;
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  return (
    <>
      <Breadcrumb title="Course Details" subtitle="Course Details" />
      <CourseDetailsArea course={course} />
    </>
  );
}
