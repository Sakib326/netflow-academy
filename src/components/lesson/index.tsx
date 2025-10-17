"use client";
import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import {
  useGetLessonBySlugQuery,
  useSubmitLessonBySlugMutation,
  useGetSubmissionsByLessonSlugQuery,
} from "@/redux/lesson/lessonApi";
import type {
  Lesson,
  Question,
  FileItem,
  Submission,
} from "@/types/moduleLessons";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLessionSidebar,
  openLessionSidebar,
  toggleLessionSidebar,
} from "@/redux/theme/themeSlice";
import { MdClose } from "react-icons/md";

// Define proper types for detailed quiz answers
interface DetailedQuizAnswer {
  question: string;
  submitted_option: string;
  submitted_text: string;
  correct_option: string;
  correct_text: string;
}

interface EnhancedSubmission extends Omit<Submission, "answers"> {
  answers?: DetailedQuizAnswer[] | string[]; // Support both old and new formats
  score?: number;
  max_score?: number;
}

const FILE_BASE_URL =
  process.env.NEXT_PUBLIC_FILE_URL ||
  "https://admin.netflowacademy.com/storage";

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu")) {
      if (parsed.searchParams.get("v")) {
        return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
      }
      const pathnameId = parsed.pathname.split("/").filter(Boolean).pop();
      if (pathnameId) {
        return `https://www.youtube.com/embed/${pathnameId}`;
      }
    }
  } catch {}
  return null;
}

function isVideoFile(file: FileItem): boolean {
  const src = (file.url || file.name || "").toLowerCase();
  if (file.type === "url") {
    return (
      src.includes("youtube") ||
      src.includes("youtu.be") ||
      /\.(mp4|avi|mov|wmv|flv|webm)$/.test(src)
    );
  }
  return /\.(mp4|avi|mov|wmv|flv|webm)$/.test(src);
}

function isImageFile(file: FileItem): boolean {
  const src = (file.url || file.name || "").toLowerCase();
  return /\.(jpg|jpeg|png|gif|webp|svg)$/.test(src);
}

function getFileExtension(file: FileItem): string {
  const fileName = file.name || file.url || "";
  return fileName.split(".").pop()?.toLowerCase() || "";
}

// Helper function to get option text from question
function getOptionText(question: Question, optionKey: string): string {
  return (question as any)[`option_${optionKey}`] || "";
}

// Helper function to get correct answer from question
function getCorrectAnswer(question: Question): string {
  return (question as any).answer || "";
}

// Build a safe URL for download/open
function buildFileHref(file: FileItem): string {
  if (file.type === "url") {
    return file.url || "#";
  }
  // upload: prefer url, fallback to name if it looks like a path
  const path = file.url || file.name || "";
  if (!path) return "#";
  if (/^https?:\/\//i.test(path)) return path;
  return `${FILE_BASE_URL}/${path}`.replace(/([^:]\/)\/+/g, "$1"); // clean double slashes
}

export default function LessonPage() {
  const params = useParams();
  const lessonSlug = params.lesson as string;
  const { data, isLoading, isError } = useGetLessonBySlugQuery(lessonSlug);
  const lesson: Lesson | undefined = data?.lesson;

  // Quiz state
  const [answers, setAnswers] = useState<{ [idx: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // one-by-one

  // Assignment/quiz submission state
  const [content, setContent] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { isLessionSidebarOpen } = useSelector((state: any) => state.theme);
  const [submitLesson, { isLoading: isSubmitting }] =
    useSubmitLessonBySlugMutation();

  const { data: submissionsData, refetch: refetchSubmissions } =
    useGetSubmissionsByLessonSlugQuery(lessonSlug, { skip: !lesson });

  // Check if user has already submitted (for assignment or quiz)
  const hasSubmitted =
    submissionsData &&
    submissionsData.submissions &&
    submissionsData.submissions.length > 0;

  // Get the latest submission (if any)
  const latestSubmission: any =
    hasSubmitted && submissionsData!.submissions[0]
      ? (submissionsData!.submissions[0] as EnhancedSubmission)
      : null;

  // Quiz logic
  const handleAnswer = (idx: number, val: string): void => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [idx]: val }));
  };

  const handleQuizSubmit = async (e?: React.FormEvent): Promise<void> => {
    if (e) e.preventDefault();
    if (!lesson || !lesson.questions) return;
    setSubmitError(null);
    setSubmitSuccess(null);

    // Create detailed answers
    const detailedAnswers: any[] = lesson.questions.map((question, idx) => {
      const submittedOption = answers[idx] || "";
      const correctOption = getCorrectAnswer(question);
      return {
        question: question.question,
        submitted_option: submittedOption,
        submitted_text: submittedOption
          ? getOptionText(question, submittedOption)
          : "",
        correct_option: correctOption,
        correct_text: correctOption
          ? getOptionText(question, correctOption)
          : "",
      };
    });

    const formData = new FormData();
    formData.append("answers", JSON.stringify(detailedAnswers));
    formData.append("content", "");
    files.forEach((file) => formData.append("files[]", file));

    try {
      await submitLesson({ slug: lesson.slug, data: formData }).unwrap();
      setSubmitSuccess("Quiz submitted successfully!");
      setSubmitted(true);
      refetchSubmissions();
    } catch {
      setSubmitError("Failed to submit quiz.");
    }
  };

  // Assignment logic
  const handleAssignmentSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!lesson) return;
    setSubmitError(null);
    setSubmitSuccess(null);

    const formData = new FormData();
    formData.append("content", content);
    formData.append("answers", "");
    files.forEach((file) => formData.append("files[]", file));

    try {
      await submitLesson({ slug: lesson.slug, data: formData }).unwrap();
      setSubmitSuccess("Assignment submitted successfully!");
      setContent("");
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      refetchSubmissions();
    } catch {
      setSubmitError("Failed to submit assignment.");
    }
  };

  // File input handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  // Parse submission answers (new + old format)
  const parseSubmissionAnswers = (
    submission: EnhancedSubmission,
    questionIndex: number
  ): {
    submittedOption: string;
    submittedText: string;
    correctOption: string;
    correctText: string;
  } => {
    if (!submission.answers || !Array.isArray(submission.answers)) {
      return {
        submittedOption: "",
        submittedText: "",
        correctOption: "",
        correctText: "",
      };
    }

    const answer = submission.answers[questionIndex];

    // New format
    if (typeof answer === "object" && answer !== null) {
      const detailedAnswer = answer as DetailedQuizAnswer;
      return {
        submittedOption: detailedAnswer.submitted_option || "",
        submittedText: detailedAnswer.submitted_text || "",
        correctOption: detailedAnswer.correct_option || "",
        correctText: detailedAnswer.correct_text || "",
      };
    }

    // Old format (string like 'a','b','c','d')
    if (typeof answer === "string" && lesson?.questions) {
      const question = lesson.questions[questionIndex];
      const correctOption = getCorrectAnswer(question);

      return {
        submittedOption: answer,
        submittedText: getOptionText(question, answer),
        correctOption: correctOption,
        correctText: getOptionText(question, correctOption),
      };
    }

    return {
      submittedOption: "",
      submittedText: "",
      correctOption: "",
      correctText: "",
    };
  };

  if (isLoading) {
    return (
      <div className="tw:p-8 tw:text-center tw:text-lg tw:text-gray-500">
        Loading lesson...
      </div>
    );
  }

  if (isError || !lesson) {
    return (
      <div className="tw:p-8 tw:text-center tw:text-lg tw:text-red-500">
        Lesson not found.
      </div>
    );
  }

  const totalQuestions = lesson.questions?.length || 0;
  const onFirst = currentQuestionIndex === 0;
  const onLast =
    totalQuestions > 0 && currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="">
      {/* Title */}
      <div className="tw:px-4 tw:h-[64px] tw:max-h-[64px] tw:mb-4 tw:text-start tw:bg-gradient-to-r tw:to-blue-600 tw:from-indigo-600 tw:flex tw:justify-between tw:items-center">
        <h1 className="tw:text-xl tw:font-bold tw:text-slate-50 tw:mb-0">
          {lesson.title}
        </h1>

        <div className="tw:lg:hidden">
          {isLessionSidebarOpen ? (
            <button onClick={() => dispatch(closeLessionSidebar())}>
              {/* hamberger maneu */}
              <MdClose className="tw:text-2xl tw:text-white" />
            </button>
          ) : (
            <button onClick={() => dispatch(openLessionSidebar())}>
              {/* hamberger maneu */}
              <FaBars className="tw:text-2xl tw:text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Description/Content */}
      {(lesson.content || lesson.description) && (
        <div className="tw:bg-white tw:p-6 tw:rounded-xl tw:shadow-sm tw:border tw:border-gray-200 tw:mb-8">
          <div
            className="tw:prose tw:prose-lg tw:max-w-none"
            dangerouslySetInnerHTML={{
              __html: lesson.content || lesson.description || "",
            }}
          />
        </div>
      )}

      {/* Quiz Form (One-by-one) */}
      {lesson.lesson_type === "quiz" &&
        lesson.questions &&
        lesson.questions.length > 0 &&
        !hasSubmitted && (
          <form
            className="tw:bg-white  tw:p-8 tw:rounded-xl tw:shadow-sm tw:border tw:border-gray-200 tw:space-y-6"
            onSubmit={handleQuizSubmit}
          >
            <h2 className="tw:font-bold tw:text-2xl tw:mb-2 tw:text-gray-900">
              📝 Quiz
            </h2>

            {/* Progress */}
            <div className="tw:flex tw:items-center tw:justify-between">
              <div className="tw:text-sm tw:text-gray-600">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </div>
              <div className="tw:w-40 tw:bg-gray-200 tw:h-2 tw:rounded-full">
                <div
                  className="tw:bg-blue-600 tw:h-2 tw:rounded-full tw:transition-all"
                  style={{
                    width: `${
                      totalQuestions
                        ? ((currentQuestionIndex + 1) / totalQuestions) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {(() => {
              const q = lesson.questions[currentQuestionIndex];
              return (
                <div
                  key={q.id}
                  className="tw:bg-gray-50 tw:p-6 tw:rounded-lg tw:border tw:border-gray-100"
                >
                  <div className="tw:font-semibold tw:text-lg tw:mb-4 tw:text-gray-900">
                    <span className="tw:text-blue-600 tw:mr-3">
                      Question {currentQuestionIndex + 1}:
                    </span>
                    {q.question}
                  </div>

                  <div className="tw:space-y-3">
                    {(["a", "b", "c", "d"] as const).map((key) => {
                      const option = getOptionText(q, key);
                      if (!option) return null;

                      const isSelected = answers[currentQuestionIndex] === key;

                      return (
                        <label
                          key={key}
                          className={`tw:flex tw:items-center tw:gap-3 tw:p-4 tw:rounded-lg tw:border-2 tw:cursor-pointer tw:transition-all tw:duration-200 ${
                            isSelected
                              ? "tw:bg-blue-50 tw:border-blue-400 tw:shadow-sm"
                              : "tw:bg-white tw:border-gray-200 hover:tw:border-gray-300 hover:tw:shadow-sm"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question_${currentQuestionIndex}`}
                            value={key}
                            checked={isSelected}
                            onChange={() =>
                              handleAnswer(currentQuestionIndex, key)
                            }
                            disabled={submitted}
                            className="tw:w-4 tw:h-4 tw:text-blue-600"
                          />
                          <span className="tw:font-bold tw:text-blue-600 tw:min-w-[32px]">
                            {key.toUpperCase()}.
                          </span>
                          <span className="tw:text-gray-800 tw:flex-1">
                            {option}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {submitError && (
              <div className="tw:bg-red-50 tw:border tw:border-red-200 tw:text-red-700 tw:px-4 tw:py-3 tw:rounded-lg">
                ❌ {submitError}
              </div>
            )}

            {submitSuccess && (
              <div className="tw:bg-green-50 tw:border tw:border-green-200 tw:text-green-700 tw:px-4 tw:py-3 tw:rounded-lg">
                ✅ {submitSuccess}
              </div>
            )}

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-3">
              <button
                type="button"
                className="tw:px-4 tw:py-2 tw:rounded-lg tw:border tw:text-gray-700 tw:bg-white disabled:tw:opacity-50"
                disabled={onFirst}
                onClick={() =>
                  setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
                }
              >
                ◀ Prev
              </button>

              {!onLast ? (
                <button
                  type="button"
                  className="tw:px-4 tw:py-2 tw:rounded-lg tw:bg-blue-600 tw:text-white disabled:tw:bg-gray-400 disabled:tw:cursor-not-allowed"
                  onClick={() =>
                    setCurrentQuestionIndex((prev) =>
                      Math.min(totalQuestions - 1, prev + 1)
                    )
                  }
                  disabled={!answers[currentQuestionIndex]}
                >
                  Next ▶
                </button>
              ) : (
                <button
                  type="submit"
                  className="tw:px-6 tw:py-2 tw:rounded-lg tw:bg-green-600 tw:text-white disabled:tw:bg-gray-400 disabled:tw:cursor-not-allowed"
                  disabled={
                    isSubmitting ||
                    Object.keys(answers).length !== totalQuestions
                  }
                >
                  {isSubmitting ? "Submitting..." : "Submit Quiz"}
                </button>
              )}
            </div>
          </form>
        )}

      {/* Assignment Form */}
      {lesson.lesson_type === "assignment" && !hasSubmitted && (
        <form
          className="tw:bg-white tw:p-8 tw:rounded-xl tw:shadow-sm tw:border tw:border-gray-200"
          onSubmit={handleAssignmentSubmit}
        >
          <h2 className="tw:font-bold tw:text-2xl tw:mb-6 tw:text-gray-900">
            📋 Assignment
          </h2>

          <div className="tw:mb-6">
            <label className="tw:block tw:font-semibold tw:text-lg tw:mb-3 tw:text-gray-800">
              Your Answer
            </label>
            <textarea
              className="tw:w-full tw:p-4 tw:border-2 tw:border-gray-200 tw:rounded-lg tw:min-h-[150px] tw:text-gray-800 tw:placeholder-gray-500 focus:tw:border-blue-400 focus:tw:ring-2 focus:tw:ring-blue-100 tw:transition-all"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your answer here..."
              required
            />
          </div>

          <div className="tw:mb-6">
            <label className="tw:block tw:font-semibold tw:text-lg tw:mb-3 tw:text-gray-800">
              Attach Files (optional)
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              className="tw:block tw:w-full tw:text-gray-800 tw:file:mr-4 tw:file:py-2 tw:file:px-4 tw:file:rounded-lg tw:file:border-0 tw:file:text-sm tw:file:font-semibold tw:file:bg-blue-50 tw:file:text-blue-700 hover:tw:file:bg-blue-100"
            />
          </div>

          {submitError && (
            <div className="tw:bg-red-50 tw:border tw:border-red-200 tw:text-red-700 tw:px-4 tw:py-3 tw:rounded-lg tw:mb-4">
              ❌ {submitError}
            </div>
          )}

          {submitSuccess && (
            <div className="tw:bg-green-50 tw:border tw:border-green-200 tw:text-green-700 tw:px-4 tw:py-3 tw:rounded-lg tw:mb-4">
              ✅ {submitSuccess}
            </div>
          )}

          <button
            type="submit"
            className="tw:w-full tw:bg-green-600 tw:text-white tw:px-8 tw:py-4 tw:rounded-lg tw:font-semibold tw:text-lg tw:transition-colors tw:duration-200 disabled:tw:bg-gray-400 disabled:tw:cursor-not-allowed hover:tw:bg-green-700"
            disabled={isSubmitting || !content.trim()}
          >
            {isSubmitting ? "Submitting..." : "Submit Assignment"}
          </button>
        </form>
      )}

      {/* Files & Media */}
      {lesson.files && lesson.files.length > 0 && (
        <div className="tw:bg-white tw:xl:max-w-6xl tw:m-6 tw:mx-auto tw:p-8 tw:rounded-xl tw:shadow-sm tw:border tw:border-gray-200">
          <div className="tw:space-y-6">
            {lesson.files
              .map((file: any) => ({
                ...file,
                url: file.url || file.file, // normalize url for both 'url' and 'file' property
              }))
              .map((file, idx) => {
                const href = buildFileHref(file);
                const isVideo = isVideoFile(file);
                const isImage = isImageFile(file);
                const ext = getFileExtension(file);

                return (
                  <div
                    key={idx}
                    className="tw:bg-gray-50 tw:rounded-lg tw:border tw:border-gray-100"
                  >
                    {/* <h3 className="tw:font-semibold tw:text-lg tw:mb-4 tw:text-gray-900">
                      {file.name || `File ${idx + 1}`}
                      {ext ? (
                        <span className="tw:text-sm tw:text-gray-500 tw:ml-2">
                          ({ext.toUpperCase()})
                        </span>
                      ) : null}
                    </h3> */}

                    {/* Video */}
                    {isVideo && (
                      <div className="tw:aspect-video tw:bg-black tw:rounded-lg tw:overflow-hidden tw:mb-4">
                        {file.type === "url" &&
                        file.url &&
                        getYouTubeEmbedUrl(file.url) ? (
                          <iframe
                            src={getYouTubeEmbedUrl(file.url) ?? ""}
                            className="tw:w-full tw:h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={href}
                            controls
                            className="tw:w-full tw:h-full tw:object-contain"
                          >
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    )}

                    {/* Image */}
                    {isImage && (
                      <div className="tw:bg-white tw:p-4 tw:rounded-lg tw:shadow-sm tw:mb-4">
                        <img
                          src={href}
                          alt={file.name ?? ""}
                          className="tw:w-full tw:max-w-2xl tw:mx-auto tw:rounded-lg tw:shadow-sm"
                        />
                      </div>
                    )}

                    {/* Download / Open Link */}
                    <div className="tw:flex tw:flex-wrap tw:gap-3">
                      {file.type === "url" && (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tw:inline-flex tw:items-center tw:px-4 tw:py-2 tw:bg-blue-600 tw:text-white tw:rounded-lg tw:font-medium tw:transition-colors hover:tw:bg-blue-700"
                        >
                          🔗 Open Link
                        </a>
                      )}

                      {/* Always allow download for uploads or if not video/image */}
                      {(file.type === "upload" || !isVideo || !isImage) && (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="tw:inline-flex tw:items-center tw:px-4 tw:py-2 tw:bg-green-600 tw:text-white tw:rounded-lg tw:font-medium tw:transition-colors hover:tw:bg-green-700"
                        >
                          📥 Download
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Quiz Results */}
      {lesson.lesson_type === "quiz" &&
        hasSubmitted &&
        latestSubmission &&
        Array.isArray(latestSubmission.content?.answers) && (
          <div className="tw:bg-white tw:p-8 tw:rounded-xl tw:shadow-sm tw:border tw:border-gray-200">
            <h2 className="tw-font-bold tw:text-2xl tw:mb-6 tw:text-gray-900">
              📊 Quiz Results
            </h2>

            <div className="tw:text-sm tw:text-gray-500 tw:mb-6">
              Submitted:{" "}
              {new Date(latestSubmission.created_at as any).toLocaleString()}
            </div>

            {/* Score Display */}
            {latestSubmission.score !== undefined &&
              latestSubmission.max_score && (
                <div className="tw:bg-gradient-to-r tw:from-blue-50 tw:to-indigo-50 tw:p-6 tw:rounded-lg tw:border tw:border-blue-200 tw:mb-8">
                  <div className="tw:flex tw:items-center tw:justify-between tw:mb-3">
                    <span className="tw:font-semibold tw:text-blue-800 tw:text-lg">
                      Your Score:
                    </span>
                    <span className="tw:text-3xl tw:font-bold tw:text-blue-900">
                      {latestSubmission.score} / {latestSubmission.max_score}
                    </span>
                  </div>
                  <div className="tw:w-full tw:bg-blue-200 tw:rounded-full tw:h-3">
                    <div
                      className="tw:bg-blue-600 tw:h-3 tw:rounded-full tw:transition-all tw:duration-700"
                      style={{
                        width: `${Math.round(
                          (Number(latestSubmission.score) /
                            Number(latestSubmission.max_score)) *
                            100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div className="tw-text-center tw-text-blue-700 tw:font-medium tw:mt-2">
                    {Math.round(
                      (Number(latestSubmission.score) /
                        Number(latestSubmission.max_score)) *
                        100
                    )}
                    %
                  </div>
                </div>
              )}

            {/* Question by Question Results */}
            <div className="tw:space-y-8">
              {latestSubmission.content.answers.map(
                (
                  answer: {
                    question: string;
                    submitted_option: string;
                    submitted_text: string;
                    correct_option: string;
                    correct_text: string;
                  },
                  idx: number
                ) => {
                  const isCorrect =
                    answer.submitted_option === answer.correct_option;
                  return (
                    <div
                      key={idx}
                      className={`tw:p-6 tw:border-2 tw:rounded-lg tw:transition-all ${
                        isCorrect
                          ? "tw:bg-green-50 tw:border-green-300"
                          : "tw:bg-red-50 tw:border-red-300"
                      }`}
                    >
                      {/* Question Header */}
                      <div className="tw:flex tw:items-start tw:justify-between tw:mb-6">
                        <div className="tw:font-semibold tw:text-lg tw:text-gray-900 tw:flex-1">
                          <span className="tw:text-blue-600 tw:mr-3">
                            Question {idx + 1}:
                          </span>
                          {answer.question}
                        </div>
                        <div
                          className={`tw:flex-shrink-0 tw:ml-4 tw:px-4 tw:py-2 tw:rounded-full tw:text-sm tw:font-bold ${
                            isCorrect
                              ? "tw:bg-green-100 tw:text-green-800"
                              : "tw:bg-red-100 tw:text-red-800"
                          }`}
                        >
                          {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                        </div>
                      </div>

                      {/* Answer Summary Cards */}
                      <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-6 tw:mb-6">
                        {/* Your Answer */}
                        <div
                          className={`tw:p-5 tw:rounded-lg tw:border-2 ${
                            isCorrect
                              ? "tw:bg-green-100 tw:border-green-300"
                              : "tw:bg-red-100 tw:border-red-300"
                          }`}
                        >
                          <div className="tw:flex tw:items-center tw:gap-3 tw:mb-3">
                            <div
                              className={`tw:w-3 tw:h-3 tw:rounded-full ${
                                isCorrect ? "tw:bg-green-500" : "tw:bg-red-500"
                              }`}
                            ></div>
                            <span
                              className={`tw:font-bold tw:text-sm tw:uppercase tw:tracking-wide ${
                                isCorrect
                                  ? "tw:text-green-800"
                                  : "tw:text-red-800"
                              }`}
                            >
                              Your Answer
                            </span>
                          </div>
                          <div
                            className={`tw:font-semibold tw:text-lg ${
                              isCorrect
                                ? "tw:text-green-900"
                                : "tw:text-red-900"
                            }`}
                          >
                            {answer.submitted_option ? (
                              <>
                                <span className="tw:font-bold tw:mr-2">
                                  {answer.submitted_option.toUpperCase()}.
                                </span>
                                {answer.submitted_text}
                              </>
                            ) : (
                              <span className="tw:text-gray-500 tw:italic">
                                No answer selected
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Correct Answer */}
                        <div className="tw:p-5 tw:rounded-lg tw:border-2 tw:bg-green-100 tw:border-green-300">
                          <div className="tw:flex tw:items-center tw:gap-3 tw:mb-3">
                            <div className="tw:w-3 tw:h-3 tw:rounded-full tw:bg-green-500"></div>
                            <span className="tw:font-bold tw:text-sm tw:uppercase tw:tracking-wide tw:text-green-800">
                              Correct Answer
                            </span>
                          </div>
                          <div className="tw:font-semibold tw:text-lg tw:text-green-900">
                            {answer.correct_option ? (
                              <>
                                <span className="tw:font-bold tw:mr-2">
                                  {answer.correct_option.toUpperCase()}.
                                </span>
                                {answer.correct_text}
                              </>
                            ) : (
                              <span className="tw:text-gray-500 tw:italic">
                                Answer not available
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            {/* Overall Feedback */}
            {latestSubmission.feedback && (
              <div className="tw:bg-amber-50 tw:p-6 tw:rounded-lg tw:border tw:border-amber-200 tw:mt-8">
                <div className="tw:flex tw:items-center tw:gap-2 tw:mb-3">
                  <span className="tw:text-xl">📝</span>
                  <span className="tw:font-bold tw:text-amber-800 tw:text-lg">
                    Overall Feedback:
                  </span>
                </div>
                <div className="tw:text-amber-900 tw:leading-relaxed">
                  {latestSubmission.feedback}
                </div>
              </div>
            )}
          </div>
        )}

      {/* Assignment Submission Results */}
      {lesson.lesson_type === "assignment" &&
        hasSubmitted &&
        latestSubmission && (
          <div className="tw:bg-white tw:p-8 tw:rounded-xl tw:shadow-sm tw:border tw:border-gray-200">
            <h2 className="tw:font-bold tw:text-2xl tw:mb-6 tw:text-gray-900">
              📋 Your Assignment Submission
            </h2>

            <div className="tw:text-sm tw:text-gray-500 tw:mb-6">
              Submitted:{" "}
              {new Date(latestSubmission.created_at as any).toLocaleString()}
            </div>

            {/* Assignment Content */}
            {latestSubmission.content && (
              <div className="tw:mb-6">
                <h3 className="tw:font-semibold tw:text-gray-700 tw:text-lg tw:mb-3">
                  📄 Your Answer:
                </h3>
                <div className="tw:bg-gray-50 tw:p-5 tw:rounded-lg tw:border tw:border-gray-200">
                  <div
                    className="tw:text-gray-800 tw:leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: latestSubmission.content,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Submitted Files */}
            {latestSubmission.files && latestSubmission.files.length > 0 && (
              <div className="tw:mb-6">
                <h3 className="tw:font-semibold tw:text-gray-700 tw:text-lg tw:mb-4">
                  📎 Submitted Files:
                </h3>
                <div className="tw:grid tw:grid-cols-1 tw:gap-4">
                  {latestSubmission.files.map((fileUrl: string, i: number) => {
                    const fileName =
                      fileUrl.split("/").pop() || `File ${i + 1}`;
                    const fullFileUrl = fileUrl.startsWith("http")
                      ? fileUrl
                      : `${FILE_BASE_URL}/${fileUrl}`;
                    const extension =
                      fileName.split(".").pop()?.toLowerCase() || "";

                    return (
                      <div
                        key={i}
                        className="tw:flex tw:items-center tw:p-4 tw:bg-gray-50 tw:rounded-lg tw:border tw:border-gray-200 tw:hover:bg-gray-100 tw:transition-colors"
                      >
                        <div className="tw:flex-shrink-0 tw:mr-4">
                          {/* File type icon */}
                          {[
                            "jpg",
                            "jpeg",
                            "png",
                            "gif",
                            "webp",
                            "svg",
                          ].includes(extension) ? (
                            <div className="tw:w-12 tw:h-12 tw:bg-green-100 tw:rounded-lg tw:flex tw:items-center tw:justify-center">
                              <span className="tw:text-green-600 tw:text-xl">
                                🖼️
                              </span>
                            </div>
                          ) : extension === "pdf" ? (
                            <div className="tw:w-12 tw:h-12 tw:bg-red-100 tw:rounded-lg tw:flex tw:items-center tw:justify-center">
                              <span className="tw:text-red-600 tw:text-xl">
                                📄
                              </span>
                            </div>
                          ) : [
                              "mp4",
                              "avi",
                              "mov",
                              "wmv",
                              "flv",
                              "webm",
                            ].includes(extension) ? (
                            <div className="tw:w-12 tw:h-12 tw:bg-purple-100 tw:rounded-lg tw:flex tw:items-center tw:justify-center">
                              <span className="tw:text-purple-600 tw:text-xl">
                                🎥
                              </span>
                            </div>
                          ) : (
                            <div className="tw:w-12 tw:h-12 tw:bg-blue-100 tw:rounded-lg tw:flex tw:items-center tw:justify-center">
                              <span className="tw:text-blue-600 tw:text-xl">
                                📁
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="tw:flex-grow tw:min-w-0">
                          <div className="tw:font-medium tw:text-gray-900 tw:truncate">
                            {fileName}
                          </div>
                          <div className="tw:text-sm tw:text-gray-500">
                            {extension.toUpperCase()} file
                          </div>
                        </div>

                        <a
                          href={fullFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tw:flex-shrink-0 tw:ml-4 tw:inline-flex tw:items-center tw:px-4 tw:py-2 tw:bg-blue-600 tw:text-white tw:rounded-lg tw:font-medium tw:transition-colors hover:tw:bg-blue-700"
                        >
                          <span className="tw:mr-2">📥</span>
                          Download
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Score */}
            {latestSubmission.score !== undefined &&
              latestSubmission.max_score && (
                <div className="tw:bg-blue-50 tw:p-5 tw:rounded-lg tw:border tw:border-blue-200 tw:mb-4">
                  <div className="tw:flex tw:items-center tw:justify-between">
                    <span className="tw:font-semibold tw:text-blue-800 tw:text-lg">
                      Score:
                    </span>
                    <span className="tw:text-2xl tw:font-bold tw:text-blue-900">
                      {latestSubmission.score} / {latestSubmission.max_score}
                    </span>
                  </div>
                </div>
              )}

            {/* Status */}
            {latestSubmission.status && (
              <div
                className={`tw:p-4 tw:rounded-lg tw:border tw:mb-4 ${
                  latestSubmission.status === "graded"
                    ? "tw:bg-green-50 tw:border-green-200"
                    : latestSubmission.status === "pending"
                    ? "tw:bg-yellow-50 tw:border-yellow-200"
                    : "tw:bg-gray-50 tw:border-gray-200"
                }`}
              >
                <div className="tw:flex tw:items-center tw:gap-2">
                  <span className="tw:font-semibold tw:text-gray-700">
                    Status:
                  </span>
                  <span
                    className={`tw:font-medium tw:capitalize tw:px-3 tw:py-1 tw:rounded-full tw:text-sm ${
                      latestSubmission.status === "graded"
                        ? "tw:bg-green-100 tw:text-green-700"
                        : latestSubmission.status === "pending"
                        ? "tw:bg-yellow-100 tw:text-yellow-700"
                        : "tw:bg-gray-100 tw:text-gray-700"
                    }`}
                  >
                    {latestSubmission.status}
                  </span>
                </div>
              </div>
            )}

            {/* Feedback */}
            {latestSubmission.feedback && (
              <div className="tw:bg-amber-50 tw:p-5 tw:rounded-lg tw:border tw:border-amber-200">
                <div className="tw:flex tw:items-center tw:gap-2 tw:mb-3">
                  <span className="tw:text-xl">💬</span>
                  <span className="tw:font-bold tw:text-amber-800 tw:text-lg">
                    Instructor Feedback:
                  </span>
                </div>
                <div className="tw:text-amber-900 tw:leading-relaxed">
                  {latestSubmission.feedback}
                </div>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
