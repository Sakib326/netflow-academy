import { MdSpaceDashboard } from "react-icons/md";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="tw:py-8 tw:border-r tw:border-gray-200">
      <ul className="">
        <li>
          <Link
            href="/dashboard"
            className="tw:flex p-2 tw:hover:bg-[#359093] tw:hover:text-white tw:gap-2 tw:items-center tw:text-lg"
          >
            <MdSpaceDashboard className="tw:text-2xl" /> <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/my-profile">My Profile</Link>
        </li>
        <li>
          <Link href="/dashboard/enrolled-courses">Enrolled Courses</Link>
        </li>
      </ul>

      <ul className="tw:border-t tw:border-gray-200">
        <li>
          <Link href="/dashboard/settings">Settings</Link>
        </li>
        <li>
          <button>Logout</button>
        </li>
      </ul>
    </aside>
  );
};
export default Sidebar;
