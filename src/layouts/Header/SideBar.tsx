"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineXMark } from "react-icons/hi2";

interface NavItem {
  id: number;
  label: string;
  href: string;
}

interface SideBarProps {
  openSidebar: boolean;
  setOpenSidebar: (val: boolean) => void;
  navItems: NavItem[];
}

const SideBar = ({ openSidebar, setOpenSidebar, navItems }: SideBarProps) => {
  return (
    <AnimatePresence>
      {openSidebar && (
        <>
          {/* Background overlay */}
          <motion.div
            className="tw:fixed tw:inset-0 tw:bg-black/50 tw:backdrop-blur-sm tw:z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenSidebar(false)}
          />

          {/* Sidebar container */}
          <motion.aside
            className="tw:fixed tw:top-0 tw:left-0 tw:h-full tw:w-72 tw:bg-gradient-to-b tw:from-white tw:to-gray-100 tw:shadow-2xl tw:z-[9999] tw:flex tw:flex-col tw:py-6 tw:px-5"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {/* Header */}
            <div className="tw:flex tw:items-center tw:justify-between tw:mb-6 tw:border-b tw:border-gray-200 tw:pb-3">
              <Link href="/" onClick={() => setOpenSidebar(false)}>
                <img
                  src="/assets/img/logo-edited.png"
                  alt="Netflow Academy"
                  className="tw:w-[120px] tw:h-auto"
                />
              </Link>
              <button
                onClick={() => setOpenSidebar(false)}
                className="tw:p-2 tw:rounded-full tw:bg-gray-100 tw:hover:bg-gray-200 tw:transition"
              >
                <HiOutlineXMark size={20} className="tw:text-gray-700" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="tw:flex-1 tw:flex tw:flex-col tw:gap-2">
              {navItems?.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ x: 6 }}
                  transition={{ type: "tween", duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="tw:block tw:px-3 tw:py-2 tw:rounded-lg tw:font-medium tw:text-gray-700 tw:hover:bg-[#063576]/10 tw:hover:text-[#063576] tw:transition-all"
                    onClick={() => setOpenSidebar(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <div className="tw:mt-auto tw:pt-4 tw:border-t tw:border-gray-200 tw:text-sm tw:text-gray-500 tw:text-center">
              <p>© {new Date().getFullYear()} Netflow Academy</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
