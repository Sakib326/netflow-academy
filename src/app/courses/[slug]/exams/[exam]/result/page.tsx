"use client";

import { useGetExamResultQuery } from "@/redux/exam/examApi";
import Link from "next/link";
import React from "react";
import { FaCheckCircle, FaClock, FaPaperPlane } from "react-icons/fa";

type Props = {
  params: {
    slug: string;
    exam: string;
  };
};

const ResultPage = ({ params }: Props) => {
  const { data, isLoading } = useGetExamResultQuery(params.exam);

  const {
    score,
    max_score,
    percentage,
    total_time_taken,
    status,
    started_at,
    submitted_at,
    graded_at,
  } = data || {};

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleString();

  return (
    <div className="tw:w-6xl tw:h-[560px] tw:mx-auto tw:p-6 tw:my-6 tw:bg-white tw:shadow-md tw:rounded-lg">
      <h1 className="tw:text-2xl tw:font-bold tw:mb-4">Exam Result</h1>

      <div className="tw:grid tw:grid-cols-2 tw:gap-4 tw:mb-6">
        <div className=" tw:bg-gradient-to-r tw:from-green-100 tw:to-green-200 tw:p-4 tw:rounded">
          <p className="tw:text-gray-500 tw:text-sm tw:font-semibold">Score</p>
          <p className="tw:text-xl tw:font-semibold">
            {score} / {max_score}
          </p>
        </div>
        <div className="tw:bg-gradient-to-r tw:from-blue-100 tw:to-blue-200 tw:p-4 tw:rounded">
          <p className="tw:text-gray-500 tw:text-sm tw:font-semibold">
            Percentage
          </p>
          <p className="tw:text-xl tw:font-semibold">{percentage}%</p>
        </div>
        <div className="tw:bg-gradient-to-r tw:from-yellow-100 tw:to-yellow-200 tw:p-4 tw:rounded">
          <p className="tw:text-gray-500 tw:text-sm tw:font-semibold">
            Time Taken
          </p>
          <p className="tw:text-xl tw:font-semibold">{total_time_taken} min</p>
        </div>
        <div className="tw:bg-gradient-to-r tw:from-purple-100 tw:to-purple-200 tw:p-4 tw:rounded">
          <p className="tw:text-gray-500 tw:text-sm tw:font-semibold">Status</p>
          <p className="tw:text-xl tw:font-semibold capitalize">{status}</p>
        </div>
      </div>

      <div className="tw:grid tw:grid-cols-1 md:tw:grid-cols-3 tw:gap-4 tw:my-6">
        {/* Started At */}
        <div className="tw:flex tw:items-center tw:gap-3 tw:bg-blue-50 tw:p-2 tw:rounded-lg tw:shadow hover:tw:shadow-md tw:transition">
          <FaClock className="tw:text-blue-500 tw:w-4 tw:h-4" />
          <p className="tw:text-gray-700 tw:text-sm tw:m-0">
            <span className="tw:font-semibold">Started At:</span>{" "}
            {formatDate(started_at)}
          </p>
        </div>

        {/* Submitted At */}
        <div className="tw:flex tw:items-center tw:gap-3 tw:bg-yellow-50 tw:p-2 tw:rounded-lg tw:shadow hover:tw:shadow-md tw:transition">
          <FaPaperPlane className="tw:text-yellow-500 tw:w-4 tw:h-4" />
          <p className="tw:text-gray-700 tw:text-sm tw:m-0">
            <span className="tw:font-semibold">Submitted At:</span>{" "}
            {formatDate(submitted_at)}
          </p>
        </div>

        {/* Graded At */}
        <div className="tw:flex tw:items-center tw:gap-3 tw:bg-green-50 tw:p-2 tw:rounded-lg tw:shadow hover:tw:shadow-md tw:transition">
          <FaCheckCircle className="tw:text-green-500 tw:w-4 tw:h-4" />
          <p className="tw:text-gray-700 tw:text-sm tw:m-0">
            <span className="tw:font-semibold">Graded At:</span>{" "}
            {formatDate(graded_at)}
          </p>
        </div>
      </div>
      <div className="tw:flex tw:gap-4">
        <Link
          href={`/courses/digital-marketing-mavericks-pro/exams/${params?.exam}/result/details`}
          className="tw:bg-[#2957FB] tw:text-white tw:px-4 tw:py-2 tw:rounded hover:tw:bg-blue-600"
        >
          View Details
        </Link>

        {/* <Link
          href="/dashboard"
          className="tw:bg-gray-500 tw:text-white tw:px-4 tw:py-2 tw:rounded hover:tw:bg-gray-600"
        >
          Go to Dashboard
        </Link> */}
      </div>
    </div>
  );
};

export default ResultPage;
