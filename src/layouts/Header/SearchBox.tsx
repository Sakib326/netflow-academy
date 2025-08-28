"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineX } from "react-icons/hi";

const SearchBox = ({
  isOpenSearch,
  setIsOpenSearch,
}: {
  isOpenSearch: boolean;
  setIsOpenSearch: (val: boolean) => void;
}) => {
  return (
    <AnimatePresence>
      {isOpenSearch && (
        <>
          <motion.div
            className="tw:fixed tw:inset-0 tw:overflow-hidden tw:bg-[#042a5c] tw:z-99999 tw:flex tw:flex-col tw:items-center tw:justify-center tw:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpenSearch(false)}
          />
          <motion.div
            className="tw:fixed tw:overflow-x-hidden tw:inset-0 tw:bg-[#042a5c] tw:z-99999 tw:flex tw:flex-col tw:items-center tw:justify-center  sm:tw:p-6"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Close button */}
            <button
              className="tw:absolute tw:top-10 tw:right-10 tw:p-2 tw:rounded tw:bg-gray-100"
              onClick={() => setIsOpenSearch(false)}
            >
              <HiOutlineX size={24} />
            </button>
            <form
              action=""
              className="tw:flex tw:items-center tw:md:max-w-xl tw:mx-auto"
            >
              {/* Search input */}
              <input
                type="text"
                placeholder="Search..."
                className=" tw:text-white tw:border tw:border-gray-600 tw:border-r-0 tw:px-2 tw:sm:px-4 tw:py-2 tw:rounded-l tw:text-lg tw:outline-none tw:shadow-sm focus:tw:ring-2 focus:tw:ring-[#063576] tw:transition"
              />

              {/* Search button */}
              <button
                type="submit"
                className="tw:bg-[#042a5c] tw:border tw:border-gray-600 tw:hover:bg-white tw:hover:text-gray-600 tw:text-white tw:font-semibold tw:px-4 tw:sm:px-6 tw:h-full tw:rounded-r tw:shadow hover:tw:bg-[#063576] tw:transition-colors"
              >
                Search
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchBox;
