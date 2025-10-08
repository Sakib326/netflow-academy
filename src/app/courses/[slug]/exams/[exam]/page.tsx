"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import data from "@/data/questions.json";
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

type Props = {
  params: {
    slug: string;
    exam: string;
  };
};

const ExamPage = ({ params }: Props) => {
  const [startExam, { data, isLoading, error }] = useStartExamMutation();
  const [finishExam, { isSuccess }] = useFinishExamMutation();
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const router = useRouter();

  // Start exam on page load
  useEffect(() => {
    const start = async () => {
      const response: any = await startExam(params.exam).unwrap();
      setExamData(response);
      setAnswers(Array(response.content.length).fill(null));
      setTimeLeft(response.total_time * 60); // minutes → seconds
    };
    start();
  }, []);

  console.log("Exam Data:", examData);
  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionClick = (optionIndex: number) => {
    const updated = [...answers];
    updated[currentQuestion] = optionIndex;
    setAnswers(updated);
  };

  const handlePrev = () =>
    currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1);
  const handleNext = () =>
    examData &&
    currentQuestion < examData.content.length - 1 &&
    setCurrentQuestion(currentQuestion + 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    const submitData = {
      answers: answers.map((selected, index) => ({
        question_id: index,
        selected,
      })),
    };
    finishExam({ exam_id: params.exam, answers: submitData });
    if (isSuccess) {
      router.push(`/courses/${params.slug}/exams/${params.exam}/result`);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (isLoading || !examData) return <div>Loading exam...</div>;
  if (error) return <div>Error loading exam.</div>;

  const question = examData.content[currentQuestion];

  return (
    <div className="tw:p-6 tw:w-6xl tw:mx-auto tw:shadow tw:my-6 tw:bg-white tw:rounded-lg tw:h-[420px]">
      <div className="tw:flex tw:justify-between tw:items-center tw:mb-6">
        <h2 className="tw:text-xl tw:font-bold">{data.title}</h2>
        <div className="tw:flex tw:gap-3 tw:text-md tw:font-semibold tw:bg-red-600 tw:text-white tw:px-4 tw:py-2 tw:rounded">
          <span>Time Left:</span>
          <span className="tw:w-12 tw:text-center">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="tw:mb-6 tw:border-b tw:border-gray-200 tw:pb-4">
          <p className="tw:font-semibold tw:mb-2">
            Q{currentQuestion + 1}: {question.question}
          </p>
          <div className="tw:space-y-2">
            {question.options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                className={`tw:flex tw:gap-2 tw:items-center tw:p-2 tw:border tw:border-gray-200 tw:rounded tw:cursor-pointer ${
                  answers[currentQuestion] === optionIndex
                    ? "tw:bg-green-500 tw:text-white"
                    : "tw:bg-white tw:text-black"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={optionIndex}
                  checked={answers[currentQuestion] === optionIndex}
                  onChange={() => handleOptionClick(optionIndex)}
                  className="mr-2 tw:accent-green-500 tw:hidden"
                />{" "}
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="tw:flex tw:justify-between tw:mt-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className={`tw:flex tw:items-center tw:gap-1 tw:px-4 tw:py-2 ${
              currentQuestion === 0 ? "tw:bg-gray-400" : "tw:bg-[#2957FB]"
            } tw:text-white tw:rounded disabled:tw:opacity-50`}
          >
            <MdSkipPrevious className="tw:text-xl" /> Prev
          </button>

          {currentQuestion < data.content.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="tw:flex tw:items-center tw:gap-1 tw:px-4 tw:py-2 tw:bg-[#2957FB] tw:text-white tw:rounded"
            >
              Next <MdSkipNext className="tw:text-xl" />
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="tw:px-4 tw:py-2 tw:bg-green-500 tw:text-white tw:rounded"
            >
              Submit Exam
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExamPage;
