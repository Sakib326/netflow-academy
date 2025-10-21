"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaCheckCircle, FaClock, FaPlayCircle } from "react-icons/fa";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
// import data from "@/data/exams.json";
import { useGetExamsByCourseAndBatchQuery } from "@/redux/exam/examApi";

const Exam = () => {
  const [openSections, setOpenSections] = useState<number[]>([]);
  const pathname = usePathname(); // current URL path

  const courseId = Number(localStorage.getItem("selectedCourseId"));
  const batchId = Number(localStorage.getItem("selectedBatchId"));

  const { data } = useGetExamsByCourseAndBatchQuery({
    course_id: courseId,
    batch_id: batchId,
  });

  return (
    <div className="tw:px-2 tw:mb-4">
      <div className="tw:rounded-lg tw:border tw:border-gray-200">
        <button
          onClick={() =>
            setOpenSections((prev) =>
              prev.includes(-1) ? prev.filter((s) => s !== -1) : [...prev, -1]
            )
          }
          className={`tw:w-full tw:flex tw:items-center tw:justify-between tw:p-4 tw:text-left tw:font-semibold
        tw:transition-all tw:duration-200
        ${
          openSections.includes(-1)
            ? "tw:bg-green-50 tw:text-green-800 tw:border-b tw:border-green-200"
            : "tw:bg-gray-50 tw:hover:bg-gray-100 tw:text-gray-700 tw:hover:text-gray-900"
        }`}
        >
          <div className="tw:flex tw:items-center tw:gap-3">
            <div
              className={`tw:flex tw:items-center tw:justify-center tw:w-8 tw:h-8 tw:rounded-full tw:text-sm tw:font-bold ${
                openSections.includes(-1)
                  ? "tw:bg-green-200 tw:text-green-800"
                  : "tw:bg-gray-200 tw:text-gray-600"
              }`}
            >
              E
            </div>
            <div>
              <div className="tw:text-base tw:font-semibold">Course Exams</div>
              <div className="tw:text-xs tw:text-gray-500 tw:mt-1">
                {data?.exams.length || 0} exams
              </div>
            </div>
          </div>
          {openSections.includes(-1) ? (
            <FiChevronDown className="tw:text-lg" />
          ) : (
            <FiChevronRight className="tw:text-lg" />
          )}
        </button>

        <div
          className={`tw:transition-all tw:duration-300 tw:ease-in-out tw:overflow-hidden ${
            openSections.includes(-1)
              ? "tw:max-h-[1000px] tw:opacity-100"
              : "tw:max-h-0 tw:opacity-0"
          }`}
        >
          <ul className="tw:bg-white tw:divide-y tw:divide-gray-100">
            {data?.exams?.length ? (
              data?.exams?.map((exam: any) => {
                const isActive = pathname.includes(`/exams/${exam?.id}`);
                return (
                  <li key={exam?.id}>
                    <Link
                      href={
                        exam?.has_attempted
                          ? `/courses/digital-marketing-mavericks-pro/exams/${exam?.id}/result`
                          : `/courses/digital-marketing-mavericks-pro/exams/${exam?.id}`
                      }
                      className={`tw:flex tw:items-center tw:gap-3 tw:p-4 tw:pl-6 tw:text-sm
                        tw:hover:bg-green-50 tw:hover:text-green-700 tw:transition-all
                        ${isActive ? "tw:bg-green-100 tw:text-green-800" : ""}`}
                    >
                      {/* Conditional icon */}
                      {exam?.has_attempted ? (
                        <FaCheckCircle className="tw:text-green-500 tw:text-base" />
                      ) : exam?.is_attended ? (
                        <FaPlayCircle className="tw:text-yellow-500 tw:text-base" />
                      ) : (
                        <FaClock className="tw:text-gray-400 tw:text-base" />
                      )}

                      <div className="tw:flex-1 tw:min-w-0">
                        <div className="tw:font-medium tw:truncate">
                          {exam?.title}
                        </div>
                        <div className="tw:text-xs tw:text-gray-500 tw:mt-1">
                          {exam?.total_time} min
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="tw:text-gray-500 tw:text-sm tw:p-4">
                No exams available.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Exam;
