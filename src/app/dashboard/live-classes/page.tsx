"use client";
import React from "react";
import { motion } from "framer-motion";

export default function LiveClassesPage() {
  return (
    <div className="tw:min-h-screen tw:bg-gradient-to-br tw:from-blue-50 tw:via-indigo-50 tw:to-purple-50 tw:flex tw:items-center tw:justify-center tw:p-4">
      {/* Animated Background Elements */}
      <div className="tw:absolute tw:inset-0 tw:overflow-hidden tw:pointer-events-none">
        <motion.div
          className="tw:absolute tw:top-20 tw:left-10 tw:w-32 tw:h-32 tw:bg-gradient-to-r tw:from-blue-400 tw:to-purple-400 tw:rounded-full tw:opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="tw:absolute tw:bottom-20 tw:right-10 tw:w-24 tw:h-24 tw:bg-gradient-to-r tw:from-indigo-400 tw:to-pink-400 tw:rounded-full tw:opacity-20"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="tw:absolute tw:top-1/2 tw:left-1/4 tw:w-16 tw:h-16 tw:bg-gradient-to-r tw:from-cyan-400 tw:to-blue-400 tw:rounded-full tw:opacity-15"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="tw:relative tw:z-10 tw:bg-white/80 tw:backdrop-blur-lg tw:shadow-2xl tw:rounded-3xl tw:p-8 tw:max-w-md tw:w-full tw:text-center tw:border tw:border-white/20"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.6,
            type: "spring",
            bounce: 0.5,
          }}
          className="tw:mb-6"
        >
          <div className="tw:w-20 tw:h-20 tw:mx-auto tw:bg-gradient-to-r tw:from-blue-500 tw:to-purple-600 tw:rounded-full tw:flex tw:items-center tw:justify-center tw:shadow-lg">
            <motion.svg
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="tw:w-10 tw:h-10 tw:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z"
                clipRule="evenodd"
              />
              <path d="M13.828 8.172a1 1 0 011.414 0A5.983 5.983 0 0117 12a5.983 5.983 0 01-1.758 3.828 1 1 0 11-1.414-1.414A3.987 3.987 0 0015 12a3.987 3.987 0 00-1.172-2.828 1 1 0 010-1.414z" />
            </motion.svg>
          </div>
        </motion.div>

        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="tw:text-3xl tw:font-bold tw:mb-4 tw:bg-gradient-to-r tw:from-blue-600 tw:to-purple-600 tw:bg-clip-text tw:text-transparent"
        >
          Live Zoom Session
        </motion.h1>

        {/* Animated Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="tw:mb-8 tw:text-gray-600 tw:leading-relaxed"
        >
          Ready to join the live session? Click the button below to connect
          instantly and start your learning journey.
        </motion.p>

        {/* Animated Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <motion.a
            href="https://zoom.us/j/your-meeting-id"
            target="_blank"
            rel="noopener noreferrer"
            className="tw:inline-block tw:bg-gradient-to-r tw:from-blue-600 tw:to-purple-600 tw:text-white tw:font-semibold tw:py-4 tw:px-8 tw:rounded-xl tw:shadow-lg tw:transition-all tw:duration-300 tw:relative tw:overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button Background Animation */}
            <motion.div
              className="tw:absolute tw:inset-0 tw:bg-gradient-to-r tw:from-purple-600 tw:to-blue-600 tw:opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Button Content */}
            <span className="tw:relative tw:z-10 tw:flex tw:items-center tw:gap-2">
              <motion.svg
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="tw:w-5 tw:h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </motion.svg>
              Join Zoom Meeting
            </span>
          </motion.a>
        </motion.div>

        {/* Animated Status Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="tw:mt-6 tw:flex tw:items-center tw:justify-center tw:gap-2 tw:text-green-600"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="tw:w-3 tw:h-3 tw:bg-green-400 tw:rounded-full tw:shadow-lg"
          />
          <span className="tw:text-sm tw:font-medium">Meeting Room Active</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
