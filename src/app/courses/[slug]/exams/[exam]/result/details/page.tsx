"use client";
import { useGetExamResultDetailsQuery } from "@/redux/exam/examApi";
import { FaCheck, FaTimes } from "react-icons/fa";

type Props = {
  params: {
    slug: string;
    exam: string;
  };
};
const DetailsPage = ({ params }: Props) => {
  const { data, isLoading } = useGetExamResultDetailsQuery(params.exam);
  return (
    <div className="tw:w-6xl tw:mx-auto tw:my-6 tw:border tw:border-gray-200 tw:rounded-lg tw:p-6 tw:bg-gray-50">
      <h2 className="tw:text-lg tw:font-semibold tw:mb-4">
        {data?.exam_title} - Details
      </h2>

      {data?.questions?.map((q: any) => (
        <div
          key={q.question_id}
          className="tw:mb-4 tw:p-4 tw:bg-white tw:rounded tw:shadow-sm"
        >
          <p className="tw:font-semibold tw:mb-2">
            Q{q.question_id + 1}: {q.question}
          </p>
          <ul className="tw:list-decimal tw:ml-5 tw:mb-2">
            {q.options.map((option: any, index: any) => (
              <li
                key={index}
                className={`${
                  index == q.correct_answer
                    ? "tw:text-green-600 tw:font-semibold"
                    : index == q.user_answer
                    ? "tw:text-red-500"
                    : "tw:text-gray-700"
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
          <p className="tw:text-sm tw:flex tw:items-center tw:gap-1">
            <strong>Your Answer:</strong> {q.options[q.user_answer]} |{" "}
            {q.is_correct ? (
              <FaCheck className="tw:text-green-500" />
            ) : (
              <FaTimes className="tw:text-red-500" />
            )}
          </p>
        </div>
      ))}
    </div>
  );
};
export default DetailsPage;
