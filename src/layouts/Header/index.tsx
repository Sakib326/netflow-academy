"use client";

import { useState } from "react";
import NavMenu from "./NavMenu";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AnimatePresence, motion } from "motion/react";
import { MdDashboard, MdPerson, MdSettings, MdLogout } from "react-icons/md";
import { logout } from "@/redux/auth/authSlice";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [opneMenu, setOpneMenu] = useState(false);
  const { token, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };
  return (
    <header id="navigation" className="border-bottom">
      <div className="container-fluid">
        <div className="row">
          <div className="col-30 left-col align-self-center rk_style">
            <div className="site-logo">
              <Link href="/">
                <img src="/assets/img/logo.png" alt="Netflow Academy" />
              </Link>
            </div>
          </div>

          <div className="col-40 justify-content-center d-flex align-self-center">
            <nav id="main-menu">
              <NavMenu />
            </nav>
          </div>

          <div className="col-30 right-col tw:flex tw:gap-3 tw:items-center tw:justify-end">
            <div className="searchcart">
              <a
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setOpen(!open)}
                className="sicon search-btn"
              >
                <svg fill="none" viewBox="0 0 20 20">
                  <path
                    fill="#fff"
                    d="M7.536.044a8.418 8.418 0 00-5.1 2.434C1.476 3.44.826 4.487.413 5.745a8.018 8.018 0 000 5.08 7.977 7.977 0 002.03 3.27c1.906 1.896 4.503 2.756 7.182 2.377a8.529 8.529 0 003.846-1.579c.117-.09.223-.156.239-.152.015.008 1.198 1.164 2.628 2.57 1.628 1.603 2.655 2.584 2.749 2.627a.627.627 0 00.89-.47c.063-.327.281-.093-3.999-4.32l-1.335-1.322.226-.265c.976-1.13 1.62-2.56 1.867-4.123.094-.61.094-1.727 0-2.345-.277-1.793-1.062-3.333-2.37-4.634A8.463 8.463 0 007.536.044zm1.87 1.309c1.578.23 2.964.918 4.061 2.012 1.344 1.349 2.043 3.025 2.043 4.92 0 .7-.063 1.18-.227 1.786-.828 3.08-3.635 5.209-6.869 5.209-1.925 0-3.713-.73-5.049-2.067a6.958 6.958 0 01-1.84-3.17c-.288-1.082-.288-2.434 0-3.516A7.082 7.082 0 016.572 1.52c.89-.23 1.98-.297 2.835-.168z"
                  />
                </svg>
              </a>
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
              <Link href="/login" className="white-btn bt">
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className={`search_box ${open ? "active" : ""}`}>
        <div
          className="close-btn"
          onClick={() => setOpen(false)}
          style={{ display: open ? "block" : "none" }}
        >
          <i className="ti-close"></i>
        </div>

        <div
          className="search-data"
          style={{ display: open ? "block" : "none" }}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" required />
            <div className={`line ${open ? "active" : ""}`}></div>
            <label style={{ display: open ? "block" : "none" }}>
              Type to search..
            </label>
            <button type="submit">
              <span
                className="ti-search"
                style={{ display: open ? "block" : "none" }}
              ></span>
            </button>
          </form>
        </div>
      </div>

      <div
        id="sm_menu_ham"
        className={`${opneMenu ? "open" : ""}`}
        onClick={() => setOpneMenu(!opneMenu)}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <MobileMenu opneMenu={opneMenu} />
    </header>
  );
}
