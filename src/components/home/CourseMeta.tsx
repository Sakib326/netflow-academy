"use client";
import { useGetModulesByCourseSlugQuery } from "@/redux/lesson/lessonApi";
import { Module } from "@/types/moduleLessons";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CourseMeta = ({ slug }: any) => {
  const { data, isLoading, isError } = useGetModulesByCourseSlugQuery(slug);

  const modules: Module[] = data?.modules ?? [];

  // Calculate totals
  const getTotalLessons = () => {
    return modules.reduce(
      (total, module) =>
        total +
        (module?.lessons?.filter(
          (lesson) =>
            lesson.lesson_type !== "assignment" && lesson.lesson_type !== "quiz"
        )?.length || 0),
      0
    );
  };

  const getTotalAssignments = () =>
    modules.reduce(
      (total, module) =>
        total +
        (module.lessons?.filter((lesson) => lesson.lesson_type === "assignment")
          .length || 0),
      0
    );

  const getTotalQuizzes = () =>
    modules.reduce(
      (total, module) =>
        total +
        (module.lessons?.filter((lesson) => lesson.lesson_type === "quiz")
          .length || 0),
      0
    );

  return (
    <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-1 tw:text-sm tw:text-gray-600">
      <span>{getTotalLessons()} Lessons</span>
      <span>•</span>
      <span>{getTotalAssignments()} Assignments</span>
      {/* <span>{getTotalQuizzes()} Quiz</span> */}
      {getTotalQuizzes() > 0 && (
        <>
          <span>•</span>
          <span>{getTotalQuizzes()} Quizzes</span>
        </>
      )}
    </div>
  );
};

export default CourseMeta;
