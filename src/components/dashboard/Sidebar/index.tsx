"use client";

import {
  MdSpaceDashboard,
  MdPerson,
  MdLibraryBooks,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/auth/authSlice";
import { RiDiscussLine } from "react-icons/ri";

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const links = [
    { href: "/dashboard", label: "Dashboard", icon: <MdSpaceDashboard /> },
    { href: "/dashboard/my-profile", label: "My Profile", icon: <MdPerson /> },
    {
      href: "/dashboard/enrolled-courses",
      label: "Enrolled Courses",
      icon: <MdLibraryBooks />,
    },
    {
      href: "/dashboard/discussions",
      label: "Discussions",
      icon: <RiDiscussLine />,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <aside className="tw:py-6 tw:border-r tw:border-gray-200 tw:h-full tw:min-h-[60vh]">
      <ul className="tw:space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`tw:flex p-2 tw:gap-2 tw:items-center tw:text-lg tw:rounded-s-md
                ${
                  pathname === link.href
                    ? "tw:bg-[#359093] tw:text-white"
                    : "tw:hover:bg-[#359093] tw:hover:text-white"
                }`}
            >
              <span className="tw:text-2xl">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="tw:border-t tw:flex tw:flex-col tw:border-gray-200 tw:mt-4 tw:pt-4 tw:space-y-1">
        <li>
          <Link
            href="/dashboard/settings"
            className={`tw:flex p-2 tw:gap-2 tw:items-center tw:text-lg tw:rounded-s-md
              ${
                pathname === "/dashboard/settings"
                  ? "tw:bg-[#359093] tw:text-white"
                  : "tw:hover:bg-[#359093] tw:hover:text-white"
              }`}
          >
            <MdSettings className="tw:text-2xl" />
            <span>Settings</span>
          </Link>
        </li>
        <li className="tw:flex tw:flex-col">
          <button
            onClick={handleLogout}
            className="tw:flex w-full text-left p-2 tw:hover:bg-[#359093] tw:hover:text-white tw:gap-2 tw:items-center tw:text-lg tw:rounded-s-md"
          >
            <MdLogout className="tw:text-2xl" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
