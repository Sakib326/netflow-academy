"use client";
import { FaBookOpen, FaGraduationCap, FaTrophy } from "react-icons/fa";
import { useGetMyCoursesStatusCountQuery } from "@/redux/enrolledCourses/api";
import type { EnrolledCourseStatusCount } from "@/types/enrolledCourse";

const Dashboard = () => {
  const { data, isLoading } = useGetMyCoursesStatusCountQuery();

  // You can safely use the type here if you want to do more with the data
  const statusCount: EnrolledCourseStatusCount | undefined = data;

  return (
    <>
      <h4 className="tw:w-xl tw:mb-4">Dashboard</h4>
      <div className="tw:grid tw:grid-cols-3 tw:gap-6">
        <div className="tw:border tw:border-gray-200 tw:rounded tw:p-4 tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-2">
          <FaBookOpen className="tw:text-4xl tw:text-[#348f92]" />
          <span className="tw:text-3xl tw:font-bold">
            {isLoading ? "..." : statusCount?.active ?? 0}
          </span>
          <span className="tw:text-lg">Enrolled Courses</span>
        </div>

        <div className="tw:border tw:border-gray-200 tw:rounded tw:p-4 tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-2">
          <FaGraduationCap className="tw:text-4xl tw:text-[#f39c12]" />
          <span className="tw:text-3xl tw:font-bold">
            {isLoading ? "..." : statusCount?.completed ?? 0}
          </span>
          <span className="tw:text-lg">Completed Courses</span>
        </div>

        <div className="tw:border tw:border-gray-200 tw:rounded tw:p-4 tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-2">
          <FaTrophy className="tw:text-4xl tw:text-[#e74c3c]" />
          <span className="tw:text-3xl tw:font-bold">
            {isLoading ? "..." : statusCount?.pending ?? 0}
          </span>
          <span className="tw:text-lg">Pending Courses</span>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
