"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AnimatePresence, motion } from "motion/react";
import { MdDashboard, MdPerson, MdSettings, MdLogout } from "react-icons/md";
import { logout } from "@/redux/auth/authSlice";
import { HiMiniBars3BottomLeft, HiOutlineXMark } from "react-icons/hi2";
import { RiSearchLine } from "react-icons/ri";
import SideBar from "./SideBar";
import SearchBox from "./SearchBox";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
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
      <header className="tw:h-[80px] tw:p-0 tw:flex tw:items-center tw:bg-white tw:border-0 tw:shadow">
        <div className="container tw:flex tw:justify-between">
          <div className="tw:p-0 tw:flex tw:items-center tw:gap-4 tw:md:gap-0">
            <button
              className="tw:md:hidden"
              onClick={() => setOpenSidebar(!openSidebar)}
            >
              <HiMiniBars3BottomLeft className="tw:text-2xl" />
            </button>
            <Link href="/">
              <img
                src="/assets/img/logo-edited.png"
                alt="Netflow Academy"
                className="w-[180px] sm:tw:max-w-[200px] tw:max-h-[60px]"
              />
            </Link>
          </div>

          <nav className="tw:hidden tw:md:flex tw:items-center">
            <ul className="tw:flex tw:gap-6 tw:font-semibold">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`tw:px-2 tw:py-1 tw:underline-offset-2 tw:hover:underline ${
                      pathname === item.href ? "tw:underline" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="right-col tw:flex tw:gap-3 tw:items-center tw:justify-end">
            <div className="searchcart">
              <button onClick={() => setIsOpenSearch(!open)}>
                <RiSearchLine className="tw:text-3xl tw:text-black" />
              </button>
            </div>
            {token ? (
              <div
                className="tw:relative tw:group"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <div className="tw:relative">
                  <button
                    className="tw:flex tw:gap-2 tw:items-center"
                    type="button"
                  >
                    {user?.avatar ? (
                      <img
                        src={user?.avatar_url}
                        alt="avatar"
                        className="tw:w-10 tw:h-10 tw:rounded-full tw:object-cover tw:object-center"
                      />
                    ) : (
                      <span className="tw:bg-slate-200 tw:rounded-full tw:w-9 tw:h-9 tw:flex tw:justify-center tw:items-center tw:font-semibold tw:text-lg">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </button>
                </div>

                {/* Dropdown */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="tw:absolute tw:right-0 tw:mt-1 tw:w-64 tw:bg-white tw:rounded tw:shadow-lg tw:py-2 tw:z-50"
                    >
                      <li className="tw:px-4 tw:py-2 tw:text-gray-700 tw:text-lg tw:border-b tw:border-gray-200">
                        {user?.name}
                      </li>

                      <li>
                        <Link
                          href="/dashboard"
                          className="tw:flex tw:items-center tw:gap-2 tw:px-4 tw:py-2 tw:text-gray-700 tw:hover:bg-gray-100"
                        >
                          <MdDashboard className="tw:text-lg" />
                          <span>Dashboard</span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/dashboard/my-profile"
                          className="tw:flex tw:items-center tw:gap-2 tw:px-4 tw:py-2 tw:text-gray-700 tw:hover:bg-gray-100"
                        >
                          <MdPerson className="tw:text-lg" />
                          <span>My Profile</span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/dashboard/settings"
                          className="tw:flex tw:items-center tw:gap-2 tw:px-4 tw:py-2 tw:text-gray-700 tw:hover:bg-gray-100"
                        >
                          <MdSettings className="tw:text-lg" />
                          <span>Account Setting</span>
                        </Link>
                      </li>

                      <li>
                        <button
                          className="tw:flex tw:items-center tw:gap-2 tw:w-full tw:text-left tw:px-4 tw:py-2 tw:text-gray-700 tw:hover:bg-gray-100"
                          onClick={handleLogout}
                        >
                          <MdLogout />
                          <span>Logout</span>
                        </button>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="tw:px-4 tw:text-sm tw:font-semibold tw:bg-[#042a5c] tw:hover:bg-[#084089] tw:transition-all tw:duration-100  tw:text-white tw:rounded tw:py-2"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>
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
