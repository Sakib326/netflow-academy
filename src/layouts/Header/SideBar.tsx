import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { HiOutlineXMark } from "react-icons/hi2";

const SideBar = ({ openSidebar, setOpenSidebar, navItems }: any) => {
  return (
    <AnimatePresence>
      {openSidebar && (
        <>
          <motion.div
            className="tw:fixed tw:inset-0 tw:bg-black tw:bg-opacity-50 tw:z-1000"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenSidebar(false)}
          />

          {/* Sidebar */}
          <motion.div
            className="tw:fixed tw:top-0 tw:left-0 tw:w-64 tw:h-full tw:bg-white tw:shadow-xl tw:flex tw:flex-col tw:gap-4 tw:z-1000"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { x: "-100%" },
              visible: { x: 0 },
            }}
            transition={{ type: "tween" }}
          >
            <div className="tw:border-b tw:py-2 tw:border-gray-200 tw:flex tw:justify-between tw:items-center">
              <Link href="/">
                <img
                  src="/assets/img/logo-edited.png"
                  alt="Netflow Academy"
                  className="w-[100px] tw:max-h-[60px]"
                />
              </Link>
              <button
                className="tw:self-center tw:p-2 tw:mr-3 tw:rounded tw:bg-gray-100"
                onClick={() => setOpenSidebar(false)}
              >
                <HiOutlineXMark size={18} />
              </button>
            </div>

            <div className="tw:px-3 tw:flex tw:flex-col">
              {navItems?.map((item: any) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="tw:font-semibold tw:text-gray-800 tw:py-2 tw:px-1 tw:hover:text-[#063576] tw:hover:underline tw:underline-offset-2 tw:transition-colors"
                  onClick={() => setOpenSidebar(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default SideBar;
