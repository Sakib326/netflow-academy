"use client";
import { useGetExamResultDetailsQuery } from "@/redux/exam/examApi";
import { FaCheck, FaTimes } from "react-icons/fa";

// const detailsData = {
//   exam_id: 1,
//   exam_title: "PHP Basics MCQ Exam",
//   score: 0, // Will calculate later
//   max_score: 10,
//   percentage: 0, // Will calculate later
//   total_time_taken: 25,
//   total_time_allowed: 30,
//   status: "graded",
//   started_at: "2025-10-08T15:42:17.188Z",
//   submitted_at: "2025-10-08T15:42:17.188Z",
//   questions: [
//     {
//       question_id: 0,
//       question: "What does PHP stand for?",
//       options: [
//         "Personal Home Page",
//         "Private Hypertext Processor",
//         "PHP: Hypertext Preprocessor",
//         "Public Hosting Project",
//       ],
//       correct_answer: 2,
//       user_answer: 2,
//       is_correct: true,
//     },
//     {
//       question_id: 1,
//       question: "Which symbol is used to start a PHP variable?",
//       options: ["#", "$", "&", "%"],
//       correct_answer: 1,
//       user_answer: 0, // Wrong
//       is_correct: false,
//     },
//     {
//       question_id: 2,
//       question: "Which function is used to output data in PHP?",
//       options: ["echo()", "print()", "Both echo() and print()", "write()"],
//       correct_answer: 2,
//       user_answer: 2,
//       is_correct: true,
//     },
//     {
//       question_id: 3,
//       question:
//         "Which of the following is a correct way to create a comment in PHP?",
//       options: [
//         "// This is a comment",
//         "# This is a comment",
//         "/* This is a comment */",
//         "All of the above",
//       ],
//       correct_answer: 3,
//       user_answer: 1, // Wrong
//       is_correct: false,
//     },
//     {
//       question_id: 4,
//       question: "What is the correct way to include another PHP file?",
//       options: [
//         "import 'file.php';",
//         "require 'file.php';",
//         "include 'file.php';",
//         "Both require and include",
//       ],
//       correct_answer: 3,
//       user_answer: 3,
//       is_correct: true,
//     },
//     {
//       question_id: 5,
//       question:
//         "Which superglobal is used to collect form data with GET method?",
//       options: ["$_GET", "$_POST", "$_REQUEST", "$_FORM"],
//       correct_answer: 0,
//       user_answer: 0,
//       is_correct: true,
//     },
//     {
//       question_id: 6,
//       question: "Which function is used to start a session in PHP?",
//       options: [
//         "session_start()",
//         "start_session()",
//         "init_session()",
//         "create_session()",
//       ],
//       correct_answer: 0,
//       user_answer: 3, // Wrong
//       is_correct: false,
//     },
//     {
//       question_id: 7,
//       question: "Which operator is used for concatenation in PHP?",
//       options: ["+", "&", ".", "concat()"],
//       correct_answer: 2,
//       user_answer: 2,
//       is_correct: true,
//     },
//     {
//       question_id: 8,
//       question: "What will `strlen('PHP')` return?",
//       options: ["2", "3", "4", "Error"],
//       correct_answer: 1,
//       user_answer: 1,
//       is_correct: true,
//     },
//     {
//       question_id: 9,
//       question: "Which keyword is used to define a constant in PHP?",
//       options: ["define", "const", "fixed", "Both define and const"],
//       correct_answer: 3,
//       user_answer: 0, // Wrong
//       is_correct: false,
//     },
//   ],
// };

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
                  index === q.correct_answer
                    ? "tw:text-green-600 tw:font-semibold"
                    : index === q.user_answer
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
