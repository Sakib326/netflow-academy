"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  useStartExamMutation,
  useFinishExamMutation,
} from "@/redux/exam/examApi";

interface AnswerSubmission {
  question_id: number;
  selected: number;
}

type Props = {
  params: {
    slug: string;
    exam: string;
  };
};

const ExamPage = ({ params }: Props) => {
  const router = useRouter();

  // API mutations
  const [startExam, { isLoading: startingExam }] = useStartExamMutation();
  const [finishExam, { isLoading: submittingExam }] = useFinishExamMutation();

  // Local states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const examData = useSelector((state: any) => state.exam.examData);

  // Fetch exam on mount if not already in Redux
  useEffect(() => {
    if (!examData) {
      initializeExam();
    } else {
      // If data already in Redux, setup timer and answers
      setUserAnswers(new Array(examData.content.length).fill(-1));
      setTimeRemaining(examData.total_time * 60);
      setHasStarted(true);
    }
  }, [examData]);

  // Initialize exam function
  const initializeExam = () => {
    try {
      setError(null);
      startExam(params?.exam);
    } catch (err: any) {
      console.error("Failed to start exam:", err);
      setError(err?.data?.message || "Failed to initialize exam");
    }
  };

  // Timer effect
  useEffect(() => {
    if (timeRemaining <= 0 || !examData) return;
    const timerId = setTimeout(
      () => setTimeRemaining((prev) => prev - 1),
      1000
    );
    return () => clearTimeout(timerId);
  }, [timeRemaining, examData]);

  // Auto-submit when time ends
  useEffect(() => {
    if (hasStarted && timeRemaining === 0 && examData) {
      handleExamSubmission();
    }
  }, [timeRemaining, examData, hasStarted]);

  const handleAnswerSelect = (optionIndex: number) => {
    const updated = [...userAnswers];
    updated[currentQuestionIndex] = optionIndex;
    setUserAnswers(updated);
  };

  const navigateToQuestion = (direction: "prev" | "next") => {
    if (direction === "prev" && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (
      direction === "next" &&
      examData &&
      currentQuestionIndex < examData.content.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleExamSubmission = async () => {
    if (!examData) return;

    try {
      const submissionData = {
        exam_id: params.exam,
        answers: userAnswers.map((selected, index) => ({
          question_id: examData.content[index].question_id,
          selected: selected !== -1 ? String(selected) : null,
        })),
      };

      await finishExam(submissionData);
      router.push(`/courses/${params.slug}/exams/${params.exam}/result`);
    } catch (err: any) {
      console.error("Exam submission failed:", err);
      setError(err?.data?.message || "Failed to submit exam");
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remaining
      .toString()
      .padStart(2, "0")}`;
  };

  // Loading
  if (startingExam || !examData) {
    return (
      <div className="tw:p-6 tw:text-center">
        <div className="tw:text-lg">Starting exam...</div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="tw:p-6 tw:text-center">
        <div className="tw:text-red-600 tw:text-lg tw:mb-4">{error}</div>
      </div>
    );
  }

  const currentQuestion = examData.content[currentQuestionIndex];
  const isLast = currentQuestionIndex === examData.content.length - 1;

  return (
    <div className="tw:p-6 tw:max-w-4xl tw:mx-auto tw:shadow-lg tw:my-6 tw:bg-white tw:rounded-lg">
      {/* Header */}
      <div className="tw:flex tw:justify-between tw:items-center tw:mb-6 tw:pb-4 tw:border-b tw:border-gray-200">
        <div>
          <h1 className="tw:text-2xl tw:font-bold tw:text-gray-800">
            {examData.title}
          </h1>
          <p className="tw:text-gray-600">
            Question {currentQuestionIndex + 1} of {examData.content.length}
          </p>
        </div>

        <div className="tw:bg-red-600 tw:text-white tw:px-2 tw:py-2 tw:rounded tw:font-semibold tw:grid tw:grid-cols-2 tw:gap-1 tw:items-center tw:text-center">
          <div className="tw:text-lg">Time</div>
          <div className="tw:text-xl tw:font-mono">
            {formatTime(timeRemaining)}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="tw:w-full tw:bg-gray-200 tw:rounded-full tw:h-2 tw:mb-6">
        <div
          className="tw:bg-green-700 tw:h-2 tw:rounded-full tw:transition-all"
          style={{
            width: `${
              ((currentQuestionIndex + 1) / examData.content.length) * 100
            }%`,
          }}
        ></div>
      </div>

      {/* Question */}
      <div className="tw:mb-8">
        <h3 className="tw:text-lg tw:font-semibold tw:mb-4">
          {currentQuestion.question}
        </h3>
        <div className="tw:space-y-3">
          {currentQuestion.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`tw:w-full tw:text-left tw:p-4 tw:rounded-lg tw:border tw:transition-all ${
                userAnswers[currentQuestionIndex] === index
                  ? "tw:bg-[#4F3AF5] tw:text-white tw:border-[#4F3AF5] tw:hover:bg-[#3e2dcf]"
                  : "tw:bg-white tw:text-gray-800 tw:border-gray-300 tw:hover:bg-gray-50"
              }`}
            >
              <div className="tw:flex tw:items-center">
                <span className="tw:font-medium tw:mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="tw:flex tw:justify-between tw:items-center">
        <button
          onClick={() => navigateToQuestion("prev")}
          disabled={currentQuestionIndex === 0}
          className="tw:flex tw:items-center tw:gap-1 tw:px-4 tw:py-2 tw:bg-gray-500 tw:text-white tw:rounded disabled:tw:opacity-50 disabled:tw:cursor-not-allowed tw:hover:bg-gray-600"
        >
          <MdSkipPrevious className="tw:text-xl" />
          Prev
        </button>

        {!isLast ? (
          <button
            onClick={() => navigateToQuestion("next")}
            className="tw:flex tw:items-center tw:gap-1 tw:px-4 tw:py-2 tw:bg-[#4F3AF5] tw:hover:bg-[#3e2dcf] tw:text-white tw:rounded"
          >
            Next
            <MdSkipNext className="tw:text-xl" />
          </button>
        ) : (
          <button
            onClick={handleExamSubmission}
            disabled={submittingExam}
            className="tw:px-4 tw:py-2 tw:bg-green-700 tw:text-white tw:rounded disabled:tw:opacity-50 tw:hover:bg-green-600"
          >
            {submittingExam ? "Submitting..." : "Submit Exam"}
          </button>
        )}
      </div>

      {/* Navigation Dots */}
      <div className="tw:flex tw:justify-center tw:gap-2 tw:mt-6 tw:pt-4 tw:border-t tw:border-y-gray-200">
        {examData.content.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentQuestionIndex(index)}
            className={`tw:w-8 tw:h-8 tw:rounded-full tw:text-sm ${
              index === currentQuestionIndex
                ? "tw:bg-[#4F3AF5] tw:text-white"
                : userAnswers[index] !== -1
                ? "tw:bg-green-700 tw:text-white"
                : "tw:bg-gray-300 tw:text-gray-600"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExamPage;
