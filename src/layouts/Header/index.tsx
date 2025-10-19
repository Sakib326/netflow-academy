"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AnimatePresence, motion } from "motion/react";
import { MdDashboard, MdPerson, MdSettings, MdLogout } from "react-icons/md";
import { HiMiniBars3BottomLeft, HiOutlineXMark } from "react-icons/hi2";
import { RiSearchLine } from "react-icons/ri";
import { logout } from "@/redux/auth/authSlice";
import SideBar from "./SideBar";
import SearchBox from "./SearchBox";

export default function Header() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { token, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  const navItems = [
    { id: 1, href: "/", label: "Home" },
    { id: 2, href: "/courses", label: "Courses" },
    { id: 3, href: "/about", label: "About" },
  ];

  return (
    <>
      <header className="tw:h-[70px] tw:flex tw:items-center tw:shadow-md tw:bg-white tw:border-b tw:border-gray-100 tw:sticky tw:top-0 tw:z-50">
        <div className="container tw:flex tw:justify-between tw:items-center tw:px-4">
          {/* Logo + Mobile Menu */}
          <div className="tw:flex tw:items-center tw:gap-4">
            <button
              className="tw:md:hidden"
              onClick={() => setOpenSidebar(!openSidebar)}
            >
              <HiMiniBars3BottomLeft className="tw:text-2xl tw:text-gray-700" />
            </button>

            <Link href="/" className="tw:flex tw:items-center tw:gap-2">
              <img
                src="/assets/img/logo-edited.png"
                alt="Netflow Academy"
                className="tw:w-[160px] tw:sm:w-[180px] tw:h-auto"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="tw:hidden tw:md:flex tw:gap-6 tw:font-semibold">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`tw:text-gray-700 tw:relative tw:transition-all tw:duration-200 tw:hover:text-indigo-700 ${
                  pathname === item.href ? "tw:text-indigo-700" : ""
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="tw:absolute tw:-bottom-1 tw:left-0 tw:w-full tw:h-[2px] tw:bg-indigo-700 tw:rounded"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="tw:flex tw:items-center tw:gap-3">
            {/* Search */}
            <button
              onClick={() => setIsOpenSearch(!isOpenSearch)}
              className="tw:p-2 tw:rounded-full tw:hover:bg-indigo-100 tw:transition"
            >
              <RiSearchLine className="tw:text-2xl tw:text-indigo-700" />
            </button>

            {/* Auth / Profile */}
            {token ? (
              <div
                className="tw:relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="tw:flex tw:items-center tw:gap-2 tw:p-1 tw:rounded-full tw:transition">
                  {user?.avatar ? (
                    <img
                      src={user?.avatar_url}
                      alt="avatar"
                      className="tw:w-10 tw:h-10 tw:rounded-full tw:object-cover"
                    />
                  ) : (
                    <span className="tw:bg-blue-100 tw:text-indigo-800 tw:w-10 tw:h-10 tw:flex tw:items-center tw:justify-center tw:rounded-full tw:font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="tw:absolute tw:right-0 tw:mt-3 tw:w-56 tw:bg-white tw:shadow-lg tw:rounded-xl tw:py-2 tw:border tw:border-gray-100"
                    >
                      <li className="tw:px-4 tw:py-2 tw:text-gray-800 tw:font-semibold tw:border-b tw:border-gray-200">
                        {user?.name}
                      </li>

                      <li>
                        <Link
                          href="/dashboard"
                          className="tw:flex tw:items-center tw:gap-2 tw:px-4 tw:py-2 tw:text-gray-700 tw:hover:bg-gray-50"
                        >
                          <MdDashboard /> Dashboard
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/dashboard/my-profile"
                          className="tw:flex tw:items-center tw:gap-2 tw:px-4 tw:py-2 tw:text-gray-700 tw:hover:bg-gray-50"
                        >
                          <MdPerson /> My Profile
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/dashboard/settings"
                          className="tw:flex tw:items-center tw:gap-2 tw:px-4 tw:py-2 tw:text-gray-700 tw:hover:bg-gray-50"
                        >
                          <MdSettings /> Settings
                        </Link>
                      </li>

                      <li>
                        <button
                          onClick={handleLogout}
                          className="tw:flex tw:items-center tw:gap-2 tw:w-full tw:text-left tw:px-4 tw:py-2 tw:text-gray-700 tw:hover:bg-gray-50"
                        >
                          <MdLogout /> Logout
                        </button>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="tw:flex tw:items-center tw:gap-3">
                <Link
                  href="/login"
                  className="tw:px-4 tw:py-2 tw:text-sm tw:font-semibold tw:border tw:border-indigo-600 tw:text-indigo-600 tw:rounded-full tw:hover:bg-indigo-100 tw:transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="tw:px-4 tw:py-2 tw:text-sm tw:font-semibold tw:bg-indigo-600 tw:text-white tw:rounded-full tw:hover:bg-indigo-700 tw:transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Search & Sidebar */}
      <SearchBox
        isOpenSearch={isOpenSearch}
        setIsOpenSearch={setIsOpenSearch}
      />
      <SideBar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        navItems={navItems}
      />
    </>
  );
}
