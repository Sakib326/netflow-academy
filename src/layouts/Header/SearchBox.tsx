"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineX, HiOutlineSearch } from "react-icons/hi";

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
          {/* Dimmed backdrop */}
          <motion.div
            className="tw:fixed tw:inset-0 tw:bg-black/50 tw:backdrop-blur-sm tw:z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpenSearch(false)}
          />

          {/* Search overlay */}
          <motion.div
            className="tw:fixed tw:inset-0 tw:flex tw:items-center tw:justify-center tw:z-[9999]"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.4 }}
          >
            <div className="tw:relative tw:w-[90%] tw:sm:w-[600px] tw:bg-white/80 tw:backdrop-blur-xl tw:rounded-2xl tw:shadow-2xl tw:p-6 tw:flex tw:flex-col tw:items-center tw:gap-6 tw:border tw:border-white/40">
              {/* Close Button */}
              <button
                className="tw:absolute tw:top-4 tw:right-4 tw:text-gray-500 tw:hover:text-gray-800 tw:transition"
                onClick={() => setIsOpenSearch(false)}
              >
                <HiOutlineX size={26} />
              </button>

              {/* Title */}
              <h2 className="tw:text-2xl tw:font-semibold tw:text-gray-800 tw:text-center">
                What are you looking for?
              </h2>

              {/* Search Form */}
              <form
                className="tw:flex tw:w-full tw:items-center tw:bg-white tw:rounded-full tw:shadow-sm tw:border tw:border-gray-200 focus-within:tw:ring-2 focus-within:tw:ring-blue-500 tw:transition"
                onSubmit={(e) => e.preventDefault()}
              >
                <HiOutlineSearch className="tw:ml-4 tw:text-gray-500 tw:text-xl" />
                <input
                  type="text"
                  placeholder="Search courses, topics, or tutors..."
                  className="tw:flex-1 tw:py-3 tw:px-3 tw:text-gray-700 tw:placeholder-gray-400 tw:outline-none tw:bg-transparent"
                  autoFocus
                />
                <button
                  type="submit"
                  className="tw:bg-indigo-600 tw:text-white tw:font-medium tw:px-6 tw:py-2 tw:rounded-full tw:mr-2 tw:hover:bg-blue-700 tw:transition"
                >
                  Search
                </button>
              </form>

              {/* Optional: Quick links / Suggestions */}
              <div className="tw:w-full tw:text-sm tw:text-gray-500 tw:text-center">
                Popular:{" "}
                <span className="tw:text-blue-600 tw:cursor-pointer tw:hover:underline">
                  Web Development
                </span>
                ,{" "}
                <span className="tw:text-blue-600 tw:cursor-pointer tw:hover:underline">
                  Digital Marketing
                </span>
                ,{" "}
                <span className="tw:text-blue-600 tw:cursor-pointer tw:hover:underline">
                  Data Science
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchBox;
