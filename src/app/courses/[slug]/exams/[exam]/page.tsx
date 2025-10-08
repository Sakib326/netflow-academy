"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  useFinishExamMutation,
  useStartExamMutation,
} from "@/redux/exam/examApi";

interface Question {
  question: string;
  options: string[];
  answer: number;
}

interface ExamData {
  id: number;
  title: string;
  total_time: number;
  content: Question[];
}

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

  // State
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Initialize exam on component mount
  useEffect(() => {
    initializeExam();
  }, []);

  // Timer effect
  useEffect(() => {
    if (timeRemaining <= 0 || !examData) return;

    const timerId = setTimeout(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeRemaining, examData]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeRemaining === 0 && examData && userAnswers.length > 0) {
      handleExamSubmission();
    }
  }, [timeRemaining, examData, userAnswers]);

  const initializeExam = async () => {
    try {
      setError(null);
      const response = await startExam(params.exam).unwrap();

      setExamData(response);
      setUserAnswers(new Array(response.content.length).fill(-1)); // -1 means unanswered
      setTimeRemaining(response.total_time * 60); // Convert to seconds
    } catch (err: any) {
      console.error("Failed to start exam:", err);
      setError(err?.data?.message || "Failed to initialize exam");
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(updatedAnswers);
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
          question_id: index,
          selected: selected !== -1 ? selected : null, // Handle unanswered questions
        })),
      };

      await finishExam(submissionData).unwrap();

      // Redirect to results page
      router.push(`/courses/${params.slug}/exams/${params.exam}/result`);
    } catch (err: any) {
      console.error("Exam submission failed:", err);
      setError(err?.data?.message || "Failed to submit exam");
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Render loading state
  if (startingExam) {
    return (
      <div className="tw-p-6 tw-text-center">
        <div className="tw-text-lg">Starting exam...</div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="tw-p-6 tw-text-center">
        <div className="tw-text-red-600 tw-text-lg tw-mb-4">{error}</div>
        <button
          onClick={initializeExam}
          className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded hover:tw-bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // Render exam not ready state
  if (!examData) {
    return (
      <div className="tw-p-6 tw-text-center">
        <div className="tw-text-lg">Exam not available</div>
      </div>
    );
  }

  const currentQuestion = examData.content[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === examData.content.length - 1;

  return (
    <div className="tw-p-6 tw-max-w-4xl tw-mx-auto tw-shadow-lg tw-my-6 tw-bg-white tw-rounded-lg">
      {/* Header */}
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-6 tw-pb-4 tw-border-b">
        <div>
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-800">
            {examData.title}
          </h1>
          <p className="tw-text-gray-600">
            Question {currentQuestionIndex + 1} of {examData.content.length}
          </p>
        </div>

        <div className="tw-bg-red-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-font-semibold">
          <div className="tw-text-sm">Time Remaining</div>
          <div className="tw-text-xl tw-font-mono">
            {formatTime(timeRemaining)}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="tw-w-full tw-bg-gray-200 tw-rounded-full tw-h-2 tw-mb-6">
        <div
          className="tw-bg-green-500 tw-h-2 tw-rounded-full tw-transition-all"
          style={{
            width: `${
              ((currentQuestionIndex + 1) / examData.content.length) * 100
            }%`,
          }}
        ></div>
      </div>

      {/* Question */}
      <div className="tw-mb-8">
        <h3 className="tw-text-lg tw-font-semibold tw-mb-4">
          {currentQuestion.question}
        </h3>

        <div className="tw-space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`tw-w-full tw-text-left tw-p-4 tw-rounded-lg tw-border tw-transition-all ${
                userAnswers[currentQuestionIndex] === index
                  ? "tw-bg-blue-500 tw-text-white tw-border-blue-600"
                  : "tw-bg-white tw-text-gray-800 tw-border-gray-300 hover:tw-bg-gray-50"
              }`}
            >
              <div className="tw-flex tw-items-center">
                <span className="tw-font-medium tw-mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="tw-flex tw-justify-between tw-items-center">
        <button
          onClick={() => navigateToQuestion("prev")}
          disabled={currentQuestionIndex === 0}
          className="tw-flex tw-items-center tw-gap-2 tw-px-6 tw-py-3 tw-bg-gray-500 tw-text-white tw-rounded-lg disabled:tw-opacity-50 disabled:tw-cursor-not-allowed hover:tw-bg-gray-600"
        >
          <MdSkipPrevious className="tw-text-xl" />
          Previous
        </button>

        {!isLastQuestion ? (
          <button
            onClick={() => navigateToQuestion("next")}
            className="tw-flex tw-items-center tw-gap-2 tw-px-6 tw-py-3 tw-bg-blue-500 tw-text-white tw-rounded-lg hover:tw-bg-blue-600"
          >
            Next
            <MdSkipNext className="tw-text-xl" />
          </button>
        ) : (
          <button
            onClick={handleExamSubmission}
            disabled={submittingExam}
            className="tw-px-8 tw-py-3 tw-bg-green-500 tw-text-white tw-rounded-lg disabled:tw-opacity-50 hover:tw-bg-green-600"
          >
            {submittingExam ? "Submitting..." : "Submit Exam"}
          </button>
        )}
      </div>

      {/* Quick Navigation Dots */}
      <div className="tw-flex tw-justify-center tw-gap-2 tw-mt-6 tw-pt-4 tw-border-t">
        {examData.content.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestionIndex(index)}
            className={`tw-w-8 tw-h-8 tw-rounded-full tw-text-sm ${
              index === currentQuestionIndex
                ? "tw-bg-blue-500 tw-text-white"
                : userAnswers[index] !== -1
                ? "tw-bg-green-500 tw-text-white"
                : "tw-bg-gray-300 tw-text-gray-600"
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
