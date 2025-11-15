"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+ App Router
// import { useNavigate } from "react-router-dom"; // For React Router
import { useGetMyCoursesQuery } from "@/redux/enrolledCourses/api";
import type { EnrolledCourse } from "@/types/enrolledCourse";

const EnrolledCourse = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetMyCoursesQuery(page);
  const router = useRouter(); // For Next.js
  // const navigate = useNavigate(); // For React Router

  const formatNextClass = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCourseClick = (
    courseSlug: string,
    courseId?: number,
    batchId?: number
  ) => {
    localStorage.setItem("selectedCourseSlug", courseSlug);
    localStorage.setItem("selectedCourseId", String(courseId));
    localStorage.setItem("selectedBatchId", String(batchId));
    // For Next.js App Router
    router.push(`/courses/${courseSlug}/lessons/start-now`);

    // For React Router (uncomment if using React Router)
    // navigate(`/courses/${courseSlug}/lesson/start-now`);

    // For plain navigation (uncomment if not using a router library)
    // window.location.href = `/courses/${courseSlug}/lesson/start-now`;
  };

  return (
    <div className="tw:max-w-4xl">
      <div className="tw:flex tw:items-center tw:justify-between tw:mb-6">
        <h4 className="tw:text-xl tw:py-3 tw:font-bold tw:text-gray-900">
          My Courses
        </h4>
        {data && (
          <span className="tw:text-sm tw:text-gray-500">
            {data.data.length} course{data.data.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {isLoading || isFetching ? (
        <div className="tw:flex tw:items-center tw:justify-center tw:py-12">
          <div className="tw:animate-spin tw:rounded-full tw:h-8 tw:w-8 tw:border-b-2 tw:border-blue-600"></div>
        </div>
      ) : !data || data.data.length === 0 ? (
        <div className="tw:text-center tw:py-12 tw:bg-gray-50 tw:rounded-lg">
          <div className="tw:text-gray-400 tw:mb-2">📚</div>
          <p className="tw:text-gray-600 tw:font-medium">
            No enrolled courses yet
          </p>
          <p className="tw:text-sm tw:text-gray-500">
            Start your learning journey today!
          </p>
        </div>
      ) : (
        <div className="tw:space-y-3">
          {data.data.map((enrolled: EnrolledCourse) => (
            <div
              key={enrolled.enrollment_id}
              className="tw:bg-white tw:rounded-lg tw:border tw:border-gray-200 tw:p-4 tw:hover:shadow-md tw:transition-shadow tw:duration-200 tw:cursor-pointer"
              onClick={() =>
                handleCourseClick(
                  enrolled.course.slug,
                  enrolled.course.id,
                  enrolled.batch.id
                )
              }
            >
              <div className="tw:flex tw:gap-4">
                {/* Compact Thumbnail */}
                <div className="tw:shrink-0">
                  <img
                    src={enrolled.course.thumbnail}
                    alt={enrolled.course.title}
                    className="tw:w-16 tw:h-16 tw:object-cover tw:rounded-lg tw:border tw:border-gray-100"
                  />
                </div>

                {/* Course Content */}
                <div className="tw:flex-1 tw:min-w-0">
                  {/* Header Row */}
                  <div className="tw:flex tw:items-start tw:justify-between tw:gap-3 tw:mb-2">
                    <h5 className="tw:font-semibold tw:text-gray-900 tw:truncate tw:flex-1">
                      {enrolled.course.title}
                    </h5>
                    <span
                      className={`tw:px-2 tw:py-1 tw:rounded-full tw:text-xs tw:font-medium tw:shrink-0 ${
                        enrolled.enrollment_status === "active"
                          ? "tw:bg-green-100 tw:text-green-700"
                          : "tw:bg-gray-100 tw:text-gray-600"
                      }`}
                    >
                      {enrolled.enrollment_status}
                    </span>
                  </div>

                  {/* Batch and Zoom */}
                  <div className="tw:flex tw:items-center tw:gap-4 tw:mb-2 tw:text-sm">
                    <span className="tw:text-gray-600">
                      <span className="tw:font-medium tw:text-gray-800">
                        {enrolled.batch.name}
                      </span>
                    </span>
                    {enrolled.batch.zoom_link && (
                      <a
                        href={enrolled.batch.zoom_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tw:inline-flex tw:items-center tw:gap-1 tw:text-blue-600 tw:hover:text-blue-700 tw:text-2xl tw:font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        🔗 Join live Class
                      </a>
                    )}
                  </div>

                  {/* Class Routine Info */}
                  {enrolled.batch.class_routine && (
                    <div className="tw:mt-2 tw:pt-2 tw:border-t tw:border-gray-100">
                      {/* Schedule Days */}
                      <div className="tw:mb-2">
                        <div className="tw:text-xs tw:font-medium tw:text-gray-500 tw:mb-1">
                          Schedule:
                        </div>
                        <div className="tw:flex tw:flex-wrap tw:gap-2">
                          {enrolled.batch.class_routine.days
                            .filter((day) => day && day.day)
                            .map((day, idx) => (
                              <span
                                key={idx}
                                className="tw:inline-flex tw:items-center tw:gap-1 tw:text-xs tw:bg-blue-50 tw:text-blue-700 tw:px-2 tw:py-1 tw:rounded"
                              >
                                📅 {day.day}
                                {day.start_time &&
                                  day.end_time &&
                                  ` • ${day.start_time} - ${day.end_time}`}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* Today's Class Status */}
                      {enrolled.batch.class_routine.is_class_today &&
                        enrolled.batch.class_routine.today_class_time && (
                          <div className="tw:text-xs tw:inline-flex tw:items-center tw:gap-1 tw:bg-green-50 tw:text-green-700 tw:px-2 tw:py-1 tw:rounded">
                            ✅ Class today at{" "}
                            {
                              enrolled.batch.class_routine.today_class_time
                                .start_time
                            }{" "}
                            -{" "}
                            {
                              enrolled.batch.class_routine.today_class_time
                                .end_time
                            }
                          </div>
                        )}

                      {enrolled.batch.class_routine.is_off_today && (
                        <div className="tw:text-xs tw:inline-flex tw:items-center tw:gap-1 tw:bg-yellow-50 tw:text-yellow-700 tw:px-2 tw:py-1 tw:rounded">
                          🔴 Off today
                        </div>
                      )}

                      {/* Off Dates */}
                      {enrolled.batch.class_routine.off_dates.length > 0 && (
                        <div className="tw:mt-2 tw:text-xs tw:text-gray-500">
                          <span className="tw:font-medium">Off dates:</span>{" "}
                          {enrolled.batch.class_routine.off_dates
                            .map((offDate) => offDate.date)
                            .join(", ")}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Compact Pagination */}
          {data.last_page > 1 && (
            <div className="tw:flex tw:items-center tw:justify-center tw:gap-2 tw:mt-6 tw:pt-4">
              <button
                className="tw:p-2 tw:rounded-md tw:border tw:border-gray-300 tw:bg-white tw:text-gray-700 tw:hover:bg-gray-50 disabled:tw:opacity-50 disabled:tw:cursor-not-allowed tw:transition-colors"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ←
              </button>

              <div className="tw:flex tw:items-center tw:gap-1">
                {Array.from({ length: Math.min(5, data.last_page) }, (_, i) => {
                  let pageNum;
                  if (data.last_page <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= data.last_page - 2) {
                    pageNum = data.last_page - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      className={`tw:w-8 tw:h-8 tw:rounded-md tw:text-sm tw:font-medium tw:transition-colors ${
                        pageNum === page
                          ? "tw:bg-blue-600 tw:text-white"
                          : "tw:text-gray-700 tw:hover:bg-gray-100"
                      }`}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                className="tw:p-2 tw:rounded-md tw:border tw:border-gray-300 tw:bg-white tw:text-gray-700 tw:hover:bg-gray-50 disabled:tw:opacity-50 disabled:tw:cursor-not-allowed tw:transition-colors"
                onClick={() => setPage((p) => Math.min(data.last_page, p + 1))}
                disabled={page === data.last_page}
              >
                →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourse;
