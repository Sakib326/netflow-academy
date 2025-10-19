"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  FaBookOpen,
  FaPlayCircle,
  FaClock,
  FaFile,
  FaCheckCircle,
  FaBars,
} from "react-icons/fa";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { useGetModulesByCourseSlugQuery } from "@/redux/lesson/lessonApi";
import type { Module, Lesson } from "@/types/moduleLessons";
import { useGetExamsByCourseAndBatchQuery } from "@/redux/exam/examApi";
import Exam from "./Exam";
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import { closeLessionSidebar } from "@/redux/theme/themeSlice";

const LessonSidebar = () => {
  const router = useRouter();
  const params = useParams();
  const currentLessonSlug = params.lesson as string;
  const { isLessionSidebarOpen } = useSelector((state: any) => state.theme);
  const dispatch = useDispatch();
  const courseSlug = params.slug as string;

  const { data, isLoading, isError } =
    useGetModulesByCourseSlugQuery(courseSlug);
  const modules: Module[] = data?.modules ?? [];
  const [openSections, setOpenSections] = useState<number[]>([]);

  const examSlug = {
    course_id: 2,
    batch_id: 1,
  };
  const {
    data: examData,
    isLoading: examsLoading,
    isError: examsError,
  } = useGetExamsByCourseAndBatchQuery(examSlug);
  const exams = examData?.exams ?? [];

  // useEffect(() => {
  //   const handleResize = () => {
  //     dispatch(setLessionSidebarForScreen(window.innerWidth));
  //   };
  //   window.addEventListener("resize", handleResize);
  //   handleResize();
  //   return () => window.removeEventListener("resize", handleResize);
  // }, [dispatch]);

  // Auto-expand section containing current lesson and validate lesson slug
  useEffect(() => {
    if (modules.length > 0 && currentLessonSlug) {
      // Find which module contains the current lesson
      const currentModuleIndex = modules.findIndex((module) =>
        module.lessons?.some((lesson) => lesson.slug === currentLessonSlug)
      );

      if (currentModuleIndex !== -1) {
        // Current lesson exists - expand its module
        const currentModule = modules[currentModuleIndex];
        setOpenSections((prev) =>
          prev.includes(currentModule.id) ? prev : [...prev, currentModule.id]
        );
      } else {
        // Current lesson doesn't exist - redirect to first lesson
        const firstModule = modules[0];
        const firstLesson = firstModule?.lessons?.[0];

        if (firstLesson) {
          router.replace(`/courses/${courseSlug}/lessons/${firstLesson.slug}`);
        }
      }
    }
  }, [modules, currentLessonSlug, router]);

  const toggleSection = (id: number) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSectionToggle = (e: React.MouseEvent, id: number) => {
    // Prevent event bubbling to avoid conflicts
    e.stopPropagation();
    toggleSection(id);
  };

  const getLessonIcon = (lessonType: string) => {
    switch (lessonType) {
      case "video":
        return <FaPlayCircle className="tw:text-blue-500 tw:text-sm" />;
      case "quiz":
        return <FaCheckCircle className="tw:text-orange-500 tw:text-sm" />;
      case "reading":
        return <FaFile className="tw:text-purple-500 tw:text-sm" />;
      default:
        return <FaClock className="tw:text-gray-400 tw:text-sm" />;
    }
  };

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

  if (isLoading) {
    return (
      <aside className="tw:w-full tw:bg-white tw:shadow-lg tw:rounded-lg tw:min-h-[85vh] tw:flex tw:items-center tw:justify-center">
        <div className="tw:flex tw:flex-col tw:items-center tw:gap-3">
          <div className="tw:w-8 tw:h-8 tw:border-4 tw:border-blue-200 tw:border-t-blue-600 tw:rounded-full tw:animate-spin"></div>
          <span className="tw:text-gray-500 tw:font-medium">
            Loading course content...
          </span>
        </div>
      </aside>
    );
  }

  if (isError || !modules.length) {
    return (
      <aside className="tw:w-full tw:bg-white tw:shadow-lg tw:rounded-lg tw:min-h-[85vh] tw:flex tw:items-center tw:justify-center">
        <div className="tw:text-center tw:p-6">
          <div className="tw:w-16 tw:h-16 tw:bg-red-100 tw:rounded-full tw:flex tw:items-center tw:justify-center tw:mx-auto tw:mb-4">
            <FaBookOpen className="tw:text-red-500 tw:text-2xl" />
          </div>
          <h3 className="tw:text-lg tw:font-semibold tw:text-gray-800 tw:mb-2">
            No Content Available
          </h3>
          <p className="tw:text-gray-500">
            Course modules will appear here once they're added.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <>
      <aside
        className={`
          tw:fixed tw:lg:hidden tw:z-50 tw:top-0 tw:left-0 tw:h-full tw:lg:h-auto 
          tw:w-[320px] tw:lg:w-full tw:bg-white tw:shadow-lg tw:transition-transform tw:duration-300 tw:overflow-y-auto
          ${isLessionSidebarOpen ? "tw:translate-x-0" : "tw:-translate-x-full"}
        `}
      >
        <div className="tw:bg-gradient-to-r tw:from-blue-600 tw:to-indigo-600 tw:px-6 py-2  tw:text-white">
          <h2 className="tw:text-lg tw:font-bold tw:flex tw:justify-between tw:items-center tw:gap-3 tw:mb-0 tw:text-white">
            <span>Course Content</span>
            <button
              onClick={() => dispatch(closeLessionSidebar())}
              className="tw:xs:hidden"
            >
              {/* hamberger maneu */}
              <MdClose className="tw:text-2xl tw:text-white" />
            </button>
          </h2>
          <div className="tw:flex tw:flex-col tw:sm:flex-row tw:flex-wrap tw:sm:items-center tw:gap-1 tw:text-sm tw:text-blue-100">
            <span>{modules?.length} Modules</span>
            <span className="tw:hidden tw:sm:inline-block">•</span>
            <span>{getTotalLessons()} Lessons</span>
            <span className="tw:hidden tw:sm:inline-block">•</span>
            <span>{getTotalAssignments()} Assignments</span>
            <span className="tw:hidden tw:sm:inline-block">•</span>
            <span>{getTotalQuizzes()} Quizzes</span>
          </div>
        </div>

        {/* Content */}
        <div className="tw:p-2">
          <ul className="tw:space-y-2">
            {modules.map((section, index) => {
              const isOpen = openSections.includes(section.id);
              return (
                <li
                  key={section.id}
                  className="tw:rounded-lg tw:overflow-hidden tw:border tw:border-gray-200"
                >
                  {/* Section Header */}
                  <button
                    onClick={(e) => handleSectionToggle(e, section.id)}
                    className={`
                    tw:w-full tw:flex tw:items-center tw:justify-between tw:p-4 tw:text-left tw:font-semibold
                    tw:transition-all tw:duration-200 tw:group
                    ${
                      isOpen
                        ? "tw:bg-blue-50 tw:text-blue-800 tw:border-b tw:border-blue-200"
                        : "tw:bg-gray-50 tw:hover:bg-gray-100 tw:text-gray-700 tw:hover:text-gray-900"
                    }
                  `}
                  >
                    <div className="tw:flex tw:items-center tw:gap-3">
                      <div
                        className={`
                      tw:flex tw:items-center tw:justify-center tw:w-8 tw:h-8 tw:rounded-full tw:text-sm tw:font-bold
                      ${
                        isOpen
                          ? "tw:bg-blue-200 tw:text-blue-800"
                          : "tw:bg-gray-200 tw:text-gray-600"
                      }
                    `}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="tw:text-base tw:font-semibold">
                          {section.title}
                        </div>
                        <div className="tw:text-xs tw:text-gray-500 tw:mt-1 tw:flex tw:items-center tw:gap-2">
                          {section.lessons &&
                            section.lessons.filter(
                              (lesson) =>
                                lesson.lesson_type !== "assignment" &&
                                lesson.lesson_type !== "quiz"
                            ).length > 0 && (
                              <span>
                                {section.lessons
                                  ? section.lessons.filter(
                                      (l) =>
                                        l.lesson_type !== "assignment" &&
                                        l.lesson_type !== "quiz"
                                    ).length
                                  : 0}{" "}
                                Lessons{" "}
                              </span>
                            )}

                          {section.lessons &&
                            section.lessons.filter(
                              (lesson) => lesson.lesson_type === "assignment"
                            ).length > 0 && (
                              <span>
                                {section.lessons
                                  ? section.lessons.filter(
                                      (l) => l.lesson_type === "assignment"
                                    ).length
                                  : 0}{" "}
                                Assignments{" "}
                              </span>
                            )}

                          {section.lessons &&
                            section.lessons.filter(
                              (lesson) => lesson.lesson_type === "quiz"
                            ).length > 0 && (
                              <span>
                                {section.lessons
                                  ? section.lessons.filter(
                                      (l) => l.lesson_type === "quiz"
                                    ).length
                                  : 0}{" "}
                                Quizzes
                              </span>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="tw:flex tw:items-center tw:gap-2">
                      <div
                        className={`
                      tw:w-8 tw:h-1 tw:rounded-full tw:bg-gray-200
                    `}
                      ></div>
                      {isOpen ? (
                        <FiChevronDown className="tw:text-lg tw:transition-transform tw:duration-200" />
                      ) : (
                        <FiChevronRight className="tw:text-lg tw:transition-transform tw:duration-200" />
                      )}
                    </div>
                  </button>
                  <div
                    className={`
                    tw:transition-all tw:duration-300 tw:ease-in-out tw:overflow-hidden
                    ${
                      isOpen
                        ? "tw:max-h-none tw:opacity-100" // Increased from tw:max-h-96
                        : "tw:max-h-0 tw:opacity-0"
                    }
                  `}
                  >
                    {section.lessons && (
                      <ul className="tw:bg-white tw:divide-y tw:divide-gray-100">
                        {section.lessons.map(
                          (lesson: Lesson, lessonIndex: number) => {
                            const isCurrentLesson =
                              lesson.slug === currentLessonSlug;

                            return (
                              <li key={lesson.id}>
                                <Link
                                  href={`/courses/${courseSlug}/lessons/${lesson.slug}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  className={`
                                tw:flex tw:items-center tw:gap-3 tw:p-4 tw:pl-6 tw:text-sm
                                tw:transition-all tw:duration-200 tw:group 
                                ${
                                  isCurrentLesson
                                    ? "tw:bg-blue-100 tw:text-blue-800 tw:border-r-4 tw:border-blue-600"
                                    : "tw:hover:bg-blue-50 tw:hover:text-blue-700"
                                }
                              `}
                                >
                                  <div className="tw:flex-shrink-0">
                                    {getLessonIcon(lesson.lesson_type)}
                                  </div>

                                  <div className="tw:flex-1 tw:min-w-0">
                                    <div
                                      className={`
                                  tw:font-medium tw:truncate
                                  ${
                                    isCurrentLesson
                                      ? "tw:text-blue-800"
                                      : "tw:text-gray-700 group-tw:hover:text-blue-700"
                                  }
                                `}
                                    >
                                      {lesson.title}
                                    </div>
                                    {lesson.duration && (
                                      <div className="tw:text-xs tw:text-gray-500 tw:mt-1">
                                        {lesson.duration} min
                                      </div>
                                    )}
                                  </div>
                                </Link>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <Exam />
      </aside>

      {/* <aside
        className={`
          tw:hidden tw:lg:static tw:z-50 tw:top-0 tw:left-0 tw:h-full tw:lg:h-auto 
          tw:lg:w-full tw:bg-white tw:shadow-lg tw:transition-transform tw:duration-300 tw:overflow-y-auto
        `}
      > */}
      <aside className="tw:lg:w-full tw:hidden tw:lg:block tw:bg-white tw:shadow-lg tw:max-h-[85vh] tw:overflow-y-auto">
        <div className="tw:bg-gradient-to-r tw:from-blue-600 tw:to-indigo-600 tw:px-6 py-2  tw:text-white">
          <h2 className="tw:text-lg tw:font-bold tw:flex tw:items-center tw:gap-3 tw:mb-0 tw:text-white">
            Course Content
          </h2>
          <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-1 tw:text-sm tw:text-blue-100">
            <span>{modules?.length} Modules</span>
            <span>•</span>
            <span>{getTotalLessons()} Lessons</span>
            <span>•</span>
            <span>{getTotalAssignments()} Assignments</span>
            <span>•</span>
            <span>{getTotalQuizzes()} Quizzes</span>
          </div>
        </div>

        {/* Content */}
        <div className="tw:p-2">
          <ul className="tw:space-y-2">
            {modules.map((section, index) => {
              const isOpen = openSections.includes(section.id);
              return (
                <li
                  key={section.id}
                  className="tw:rounded-lg tw:overflow-hidden tw:border tw:border-gray-200"
                >
                  {/* Section Header */}
                  <button
                    onClick={(e) => handleSectionToggle(e, section.id)}
                    className={`
                    tw:w-full tw:flex tw:items-center tw:justify-between tw:p-4 tw:text-left tw:font-semibold
                    tw:transition-all tw:duration-200 tw:group
                    ${
                      isOpen
                        ? "tw:bg-blue-50 tw:text-blue-800 tw:border-b tw:border-blue-200"
                        : "tw:bg-gray-50 tw:hover:bg-gray-100 tw:text-gray-700 tw:hover:text-gray-900"
                    }
                  `}
                  >
                    <div className="tw:flex tw:items-center tw:gap-3">
                      <div
                        className={`
                      tw:flex tw:items-center tw:justify-center tw:w-8 tw:h-8 tw:rounded-full tw:text-sm tw:font-bold
                      ${
                        isOpen
                          ? "tw:bg-blue-200 tw:text-blue-800"
                          : "tw:bg-gray-200 tw:text-gray-600"
                      }
                    `}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="tw:text-base tw:font-semibold">
                          {section.title}
                        </div>
                        <div className="tw:text-xs tw:text-gray-500 tw:mt-1 tw:flex tw:items-center tw:gap-2">
                          {section.lessons &&
                            section.lessons.filter(
                              (lesson) =>
                                lesson.lesson_type !== "assignment" &&
                                lesson.lesson_type !== "quiz"
                            ).length > 0 && (
                              <span>
                                {section.lessons
                                  ? section.lessons.filter(
                                      (l) =>
                                        l.lesson_type !== "assignment" &&
                                        l.lesson_type !== "quiz"
                                    ).length
                                  : 0}{" "}
                                Lessons{" "}
                              </span>
                            )}

                          {section.lessons &&
                            section.lessons.filter(
                              (lesson) => lesson.lesson_type === "assignment"
                            ).length > 0 && (
                              <span>
                                {section.lessons
                                  ? section.lessons.filter(
                                      (l) => l.lesson_type === "assignment"
                                    ).length
                                  : 0}{" "}
                                Assignments{" "}
                              </span>
                            )}

                          {section.lessons &&
                            section.lessons.filter(
                              (lesson) => lesson.lesson_type === "quiz"
                            ).length > 0 && (
                              <span>
                                {section.lessons
                                  ? section.lessons.filter(
                                      (l) => l.lesson_type === "quiz"
                                    ).length
                                  : 0}{" "}
                                Quizzes
                              </span>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="tw:flex tw:items-center tw:gap-2">
                      <div
                        className={`
                      tw:w-8 tw:h-1 tw:rounded-full tw:bg-gray-200
                    `}
                      ></div>
                      {isOpen ? (
                        <FiChevronDown className="tw:text-lg tw:transition-transform tw:duration-200" />
                      ) : (
                        <FiChevronRight className="tw:text-lg tw:transition-transform tw:duration-200" />
                      )}
                    </div>
                  </button>
                  <div
                    className={`
                    tw:transition-all tw:duration-300 tw:ease-in-out tw:overflow-hidden
                    ${
                      isOpen
                        ? "tw:max-h-none tw:opacity-100" // Increased from tw:max-h-96
                        : "tw:max-h-0 tw:opacity-0"
                    }
                  `}
                  >
                    {section.lessons && (
                      <ul className="tw:bg-white tw:divide-y tw:divide-gray-100">
                        {section.lessons.map(
                          (lesson: Lesson, lessonIndex: number) => {
                            const isCurrentLesson =
                              lesson.slug === currentLessonSlug;

                            return (
                              <li key={lesson.id}>
                                <Link
                                  href={`/courses/${courseSlug}/lessons/${lesson.slug}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  className={`
                                tw:flex tw:items-center tw:gap-3 tw:p-4 tw:pl-6 tw:text-sm
                                tw:transition-all tw:duration-200 tw:group 
                                ${
                                  isCurrentLesson
                                    ? "tw:bg-blue-100 tw:text-blue-800 tw:border-r-4 tw:border-blue-600"
                                    : "tw:hover:bg-blue-50 tw:hover:text-blue-700"
                                }
                              `}
                                >
                                  <div className="tw:flex-shrink-0">
                                    {getLessonIcon(lesson.lesson_type)}
                                  </div>

                                  <div className="tw:flex-1 tw:min-w-0">
                                    <div
                                      className={`
                                  tw:font-medium tw:truncate
                                  ${
                                    isCurrentLesson
                                      ? "tw:text-blue-800"
                                      : "tw:text-gray-700 group-tw:hover:text-blue-700"
                                  }
                                `}
                                    >
                                      {lesson.title}
                                    </div>
                                    {lesson.duration && (
                                      <div className="tw:text-xs tw:text-gray-500 tw:mt-1">
                                        {lesson.duration} min
                                      </div>
                                    )}
                                  </div>
                                </Link>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <Exam />
      </aside>
    </>
  );
};

export default LessonSidebar;
