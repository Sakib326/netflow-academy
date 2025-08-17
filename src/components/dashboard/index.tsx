import { FaBookOpen, FaGraduationCap, FaTrophy } from "react-icons/fa";

const Dashboard = () => {
  return (
    <>
      <h4 className="tw:w-xl tw:mb-4">Dashboard</h4>
      <div className="tw:grid tw:grid-cols-3 tw:gap-6">
        <div className="tw:border tw:border-gray-200 tw:rounded tw:p-4 tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-2">
          <FaBookOpen className="tw:text-4xl tw:text-[#348f92]" />
          <span className="tw:text-3xl tw:font-bold">0</span>
          <span className="tw:text-lg">Enrolled Courses</span>
        </div>

        <div className="tw:border tw:border-gray-200 tw:rounded tw:p-4 tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-2">
          <FaGraduationCap className="tw:text-4xl tw:text-[#f39c12]" />
          <span className="tw:text-3xl tw:font-bold">0</span>
          <span className="tw:text-lg">Completed Courses</span>
        </div>

        <div className="tw:border tw:border-gray-200 tw:rounded tw:p-4 tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-2">
          <FaTrophy className="tw:text-4xl tw:text-[#e74c3c]" />
          <span className="tw:text-3xl tw:font-bold">0</span>
          <span className="tw:text-lg">Achievements</span>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
