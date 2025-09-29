"use client";

import {
  MdSpaceDashboard,
  MdPerson,
  MdLibraryBooks,
  MdSettings,
  MdLogout,
  MdCardTravel,
  MdQuestionAnswer,
} from "react-icons/md";
import { RiDiscussLine } from "react-icons/ri";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/auth/authSlice";

const BottomBar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const links = [
    { href: "/dashboard", icon: <MdSpaceDashboard />, label: "Dashboard" },
    { href: "/dashboard/my-profile", icon: <MdPerson />, label: "Profile" },
    {
      href: "/dashboard/orders",
      icon: <MdCardTravel />,
      label: "Orders",
    },
    {
      href: "/dashboard/live-support",
      icon: <MdQuestionAnswer />,
      label: "Live Support",
    },
    {
      href: "/dashboard/enrolled-courses",
      icon: <MdLibraryBooks />,
      label: "Courses",
    },
    {
      href: "/dashboard/discussions",
      icon: <RiDiscussLine />,
      label: "Discussions",
    },
    { href: "/dashboard/settings", icon: <MdSettings />, label: "Settings" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <nav className="tw:fixed tw:bottom-0 tw:left-0 tw:right-0 tw:bg-white tw:border-t tw:border-gray-200 tw:h-16 tw:flex tw:justify-around tw:items-center tw:md:hidden tw:z-50">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`tw:flex tw:flex-col tw:items-center tw-justify-center tw-text-sm ${
            pathname === link.href
              ? "tw-text-[#359093]"
              : "tw:text-gray-500 tw:hover:text-[#359093]"
          }`}
        >
          <span className="tw-text-2xl">{link.icon}</span>
          {/* <span>{link.label}</span> */}
        </Link>
      ))}

      {/* Optional Logout button */}
    </nav>
  );
};

export default BottomBar;
