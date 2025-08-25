import { useState } from "react";
import Link from "next/link";
import Modal from "react-modal";
import type {
  SingleCourse,
  SingleCourseModule,
  SingleCourseLesson,
  SingleCourseFile,
  SingleCourseQuestion,
} from "@/types/singleCourse";

interface CourseCurriculumProps {
  course?: SingleCourse | null;
}

interface ModalState {
  isOpen: boolean;
  lesson: SingleCourseLesson | null;
}

interface ExamState {
  answers: { [questionIndex: number]: string };
  submitted: boolean;
  score: number;
  totalQuestions: number;
}

const FILE_BASE_URL =
  process.env.NEXT_PUBLIC_FILE_URL ||
  "https://admin.netflowacademy.com/storage";

function getLessonIcon(lesson: SingleCourseLesson) {
  const files = lesson.files ?? [];
  if (files.some(isVideoFile)) return "bx bx-play-circle";
  switch (lesson.lesson_type?.toLowerCase()) {
    case "video":
      return "bx bx-play-circle";
    case "text":
    case "article":
      return "bx bx-file-doc";
    case "quiz":
      return "bx bx-question-mark";
    case "assignment":
      return "bx bx-task";
    default:
      return "bx bx-file";
  }
}

function getFileIcon(file: SingleCourseFile) {
  if (file.type === "url") {
    if (file.url?.includes("youtube") || file.url?.includes("youtu.be"))
      return "bx bxl-youtube";
    if (file.url?.includes("drive.google.com")) return "bx bxl-google-drive";
    return "bx bx-link-external";
  }
  const fileName = file.name.toLowerCase();
  if (fileName.includes(".pdf")) return "bx bx-file-pdf";
  if (fileName.includes(".doc") || fileName.includes(".docx"))
    return "bx bx-file-doc";
  if (fileName.includes(".xls") || fileName.includes(".xlsx"))
    return "bx bx-spreadsheet";
  if (fileName.includes(".ppt") || fileName.includes(".pptx"))
    return "bx bx-file-presentation";
  if (
    fileName.includes(".jpg") ||
    fileName.includes(".jpeg") ||
    fileName.includes(".png") ||
    fileName.includes(".gif") ||
    fileName.includes(".webp") ||
    fileName.includes(".svg")
  )
    return "bx bx-image";
  if (
    fileName.includes(".mp4") ||
    fileName.includes(".avi") ||
    fileName.includes(".mov") ||
    fileName.includes(".wmv") ||
    fileName.includes(".flv") ||
    fileName.includes(".webm")
  )
    return "bx bx-video";
  if (fileName.includes(".mp3") || fileName.includes(".wav"))
    return "bx bx-music";
  if (fileName.includes(".zip") || fileName.includes(".rar"))
    return "bx bx-archive";
  return "bx bx-file";
}

function getYouTubeEmbedUrl(url: string) {
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

function isVideoFile(file: SingleCourseFile) {
  if (file.type === "url") {
    return (
      file.url?.includes("youtube") ||
      file.url?.includes("youtu.be") ||
      file.url?.match(/\.(mp4|avi|mov|wmv|flv|webm)$/i)
    );
  }
  return file.name?.toLowerCase().match(/\.(mp4|avi|mov|wmv|flv|webm)$/i);
}

function isImageFile(file: SingleCourseFile) {
  if (file.type === "url") {
    return file.url?.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);
  }
  return file.name?.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);
}

export default function CourseCurriculum({ course }: CourseCurriculumProps) {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(
    new Set()
  );
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    lesson: null,
  });
  const [examState, setExamState] = useState<ExamState>({
    answers: {},
    submitted: false,
    score: 0,
    totalQuestions: 0,
  });

  const toggleModule = (moduleId: number) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    if (examState.submitted) return;
    setExamState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionIndex]: answer,
      },
    }));
  };

  const handleExamSubmit = (lesson: SingleCourseLesson) => {
    const questions = lesson.questions || [];
    let correctAnswers = 0;

    questions.forEach((question, index) => {
      if (examState.answers[index] === question.correct_answer?.toLowerCase()) {
        correctAnswers++;
      }
    });

    setExamState((prev) => ({
      ...prev,
      submitted: true,
      score: correctAnswers,
      totalQuestions: questions.length,
    }));
  };

  const resetExam = () => {
    setExamState({
      answers: {},
      submitted: false,
      score: 0,
      totalQuestions: 0,
    });
  };

  // Sort modules and lessons
  const modules: SingleCourseModule[] =
    (course?.modules
      ?.slice()
      .sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      ) as SingleCourseModule[]) || [];

  // Calculate totals
  const getTotalLessons = () =>
    modules.reduce((total, module) => total + (module.lessons?.length || 0), 0);

  // --- Modal Content ---
  function renderLessonModal(lesson: SingleCourseLesson) {
    return (
      <div className="tw:space-y-8">
        {/* Content/Description */}
        {(lesson.content || lesson.description) && (
          <div>
            <h4 className="tw:font-bold tw:text-xl tw:mb-4 tw:text-gray-800 tw:border-b tw:border-gray-200 tw:pb-2">
              📖 Lesson Content
            </h4>
            {lesson.content && (
              <div
                className="tw:prose tw:prose-lg tw:max-w-none tw:text-gray-700 tw:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
            )}
            {!lesson.content && lesson.description && (
              <div
                className="tw:prose tw:prose-lg tw:max-w-none tw:text-gray-700 tw:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: lesson.description }}
              />
            )}
          </div>
        )}

        {/* Enhanced Quiz Section */}
        {lesson.lesson_type === "quiz" &&
          lesson.questions &&
          lesson.questions.length > 0 && (
            <div>
              <div className="tw:flex tw:items-center tw:justify-between tw:mb-6">
                <h4 className="tw:font-bold tw:text-xl tw:text-gray-800">
                  📝 Quiz Exam ({lesson.questions.length} Questions)
                </h4>
                {!examState.submitted && (
                  <div className="tw:text-sm tw:text-gray-600 tw:bg-blue-50 tw:px-3 tw:py-1 tw:rounded-full">
                    {Object.keys(examState.answers).length} /{" "}
                    {lesson.questions.length} answered
                  </div>
                )}
              </div>

              {!examState.submitted ? (
                <div className="tw:space-y-6">
                  {lesson.questions.map((q, idx) => (
                    <div
                      key={idx}
                      className="tw:bg-gray-50 tw:p-6 tw:rounded-xl tw:border tw:border-gray-200"
                    >
                      <div className="tw:flex tw:items-start tw:gap-3 tw:mb-4">
                        <div className="tw:bg-blue-100 tw:text-blue-800 tw:w-8 tw:h-8 tw:rounded-full tw:flex tw:items-center tw:justify-center tw:font-bold tw:text-sm tw:flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="tw:flex-1">
                          <div className="tw:font-semibold tw:text-lg tw:text-gray-800 tw:mb-4">
                            {q.question}
                          </div>
                          {q.marks && (
                            <div className="tw:text-xs tw:text-green-600 tw:bg-green-50 tw:px-2 tw:py-1 tw:rounded tw:inline-block tw:mb-4">
                              📊 {q.marks} marks
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="tw:grid tw:grid-cols-1 tw:gap-3 tw:ml-11">
                        {[
                          { key: "a", text: q.option_a },
                          { key: "b", text: q.option_b },
                          { key: "c", text: q.option_c },
                          { key: "d", text: q.option_d },
                        ]
                          .filter((option) => option.text)
                          .map((option) => (
                            <label
                              key={option.key}
                              className={`tw:flex tw:items-center tw:gap-3 tw:p-4 tw:rounded-lg tw:border-2 tw:cursor-pointer tw:transition-all tw:duration-200 ${
                                examState.answers[idx] === option.key
                                  ? "tw:border-blue-500 tw:bg-blue-50 tw:shadow-md"
                                  : "tw:border-gray-200 tw:bg-white hover:tw:border-gray-300 hover:tw:shadow-sm"
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${idx}`}
                                value={option.key}
                                checked={examState.answers[idx] === option.key}
                                onChange={() =>
                                  handleAnswerSelect(idx, option.key)
                                }
                                className="tw:w-5 tw:h-5 tw:text-blue-600"
                              />
                              <span className="tw:font-medium tw:text-blue-600">
                                {option.key.toUpperCase()}.
                              </span>
                              <span className="tw:text-gray-700 tw:flex-1">
                                {option.text}
                              </span>
                            </label>
                          ))}
                      </div>
                    </div>
                  ))}

                  <div className="tw:flex tw:justify-center tw:pt-4">
                    <button
                      onClick={() => handleExamSubmit(lesson)}
                      disabled={
                        Object.keys(examState.answers).length !==
                        lesson.questions.length
                      }
                      className="tw:px-8 tw:py-3 tw:bg-gradient-to-r tw:from-blue-600 tw:to-blue-700 tw:text-white tw:rounded-xl tw:font-semibold tw:shadow-lg hover:tw:shadow-xl tw:transition-all tw:duration-200 disabled:tw:opacity-50 disabled:tw:cursor-not-allowed disabled:tw:from-gray-400 disabled:tw:to-gray-500"
                    >
                      🎯 Submit Exam
                    </button>
                  </div>
                </div>
              ) : (
                <div className="tw:bg-gradient-to-br tw:from-blue-50 tw:to-indigo-50 tw:p-8 tw:rounded-2xl tw:border tw:border-blue-200">
                  {/* Results Header */}
                  <div className="tw:text-center tw:mb-8">
                    <div className="tw:text-6xl tw:mb-4">
                      {examState.score === examState.totalQuestions
                        ? "🏆"
                        : examState.score >= examState.totalQuestions * 0.8
                        ? "🎉"
                        : examState.score >= examState.totalQuestions * 0.6
                        ? "👏"
                        : "📝"}
                    </div>
                    <h3 className="tw:text-3xl tw:font-bold tw:text-gray-800 tw:mb-2">
                      Exam Results
                    </h3>
                    <div className="tw:text-2xl tw:font-bold tw:text-blue-600">
                      {examState.score} / {examState.totalQuestions}
                    </div>
                    <div className="tw:text-lg tw:text-gray-600 tw:mt-2">
                      (
                      {Math.round(
                        (examState.score / examState.totalQuestions) * 100
                      )}
                      % Score)
                    </div>
                  </div>

                  {/* Detailed Results */}
                  <div className="tw:space-y-4 tw:mb-8">
                    {lesson.questions.map((q, idx) => {
                      const isCorrect =
                        examState.answers[idx] ===
                        q.correct_answer?.toLowerCase();
                      return (
                        <div
                          key={idx}
                          className={`tw:p-4 tw:rounded-xl tw:border-2 ${
                            isCorrect
                              ? "tw:bg-green-50 tw:border-green-200"
                              : "tw:bg-red-50 tw:border-red-200"
                          }`}
                        >
                          <div className="tw:flex tw:items-start tw:gap-3">
                            <div
                              className={`tw:w-8 tw:h-8 tw:rounded-full tw:flex tw:items-center tw:justify-center tw:font-bold tw:text-sm tw:flex-shrink-0 ${
                                isCorrect
                                  ? "tw:bg-green-100 tw:text-green-800"
                                  : "tw:bg-red-100 tw:text-red-800"
                              }`}
                            >
                              {isCorrect ? "✓" : "✗"}
                            </div>
                            <div className="tw:flex-1">
                              <div className="tw:font-semibold tw:text-gray-800 tw:mb-2">
                                Q{idx + 1}: {q.question}
                              </div>
                              <div className="tw:grid tw:grid-cols-2 tw:gap-4 tw:text-sm">
                                <div>
                                  <span className="tw:font-medium tw:text-gray-600">
                                    Your Answer:{" "}
                                  </span>
                                  <span
                                    className={
                                      isCorrect
                                        ? "tw:text-green-700 tw:font-semibold"
                                        : "tw:text-red-700 tw:font-semibold"
                                    }
                                  >
                                    {examState.answers[idx]?.toUpperCase() ||
                                      "Not answered"}
                                  </span>
                                </div>
                                <div>
                                  <span className="tw:font-medium tw:text-gray-600">
                                    Correct Answer:{" "}
                                  </span>
                                  <span className="tw:text-green-700 tw:font-semibold">
                                    {q.correct_answer?.toUpperCase()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="tw:flex tw:justify-center">
                    <button
                      onClick={resetExam}
                      className="tw:px-6 tw:py-3 tw:bg-gradient-to-r tw:from-purple-600 tw:to-purple-700 tw:text-white tw:rounded-xl tw:font-semibold tw:shadow-lg hover:tw:shadow-xl tw:transition-all tw:duration-200"
                    >
                      🔄 Retake Exam
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        {/* Enhanced Files Section */}
        {lesson.files && lesson.files.length > 0 && (
          <div>
            <h4 className="tw:font-bold tw:text-xl tw:mb-6 tw:text-gray-800 tw:border-b tw:border-gray-200 tw:pb-2">
              📁 Lesson Files & Media
            </h4>

            <div className="tw:space-y-6">
              {lesson.files.map((file, idx) => (
                <div
                  key={idx}
                  className="tw:bg-gray-50 tw:p-6 tw:rounded-xl tw:border tw:border-gray-200"
                >
                  <div className="tw:flex tw:items-start tw:gap-4 tw:mb-4">
                    <div className="tw:flex tw:items-center tw:justify-center tw:w-12 tw:h-12 tw:bg-blue-100 tw:rounded-lg tw:flex-shrink-0">
                      <i
                        className={`${getFileIcon(
                          file
                        )} tw:text-xl tw:text-blue-600`}
                      ></i>
                    </div>
                    <div className="tw:flex-1">
                      <h5 className="tw:font-semibold tw:text-lg tw:text-gray-800 tw:mb-2">
                        {file.name}
                      </h5>
                      <div className="tw:flex tw:items-center tw:gap-4 tw:text-sm tw:text-gray-600">
                        <span className="tw:px-2 tw:py-1 tw:bg-blue-100 tw:text-blue-700 tw:rounded tw:font-medium">
                          {isVideoFile(file)
                            ? "Video"
                            : isImageFile(file)
                            ? "Image"
                            : "File"}
                        </span>
                        {file.type === "url" && (
                          <span className="tw:px-2 tw:py-1 tw:bg-green-100 tw:text-green-700 tw:rounded tw:font-medium">
                            External Link
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Video Preview */}
                  {isVideoFile(file) && (
                    <div className="tw:mb-4">
                      {file.type === "url" &&
                      file.url &&
                      getYouTubeEmbedUrl(file.url) ? (
                        <div className="tw:aspect-video tw:bg-black tw:rounded-xl tw:overflow-hidden tw:shadow-lg">
                          <iframe
                            src={getYouTubeEmbedUrl(file.url) ?? ""}
                            className="tw:w-full tw:h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="tw:aspect-video tw:bg-black tw:rounded-xl tw:overflow-hidden tw:shadow-lg">
                          <video
                            src={
                              file.type === "url"
                                ? file.url ?? ""
                                : `${FILE_BASE_URL}/${file.file}`
                            }
                            controls
                            className="tw:w-full tw:h-full tw:object-contain"
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Image Preview */}
                  {isImageFile(file) && (
                    <div className="tw:mb-4">
                      <div className="tw:bg-white tw:p-4 tw:rounded-xl tw:shadow-lg">
                        <img
                          src={
                            file.type === "url"
                              ? file.url ?? ""
                              : `${FILE_BASE_URL}/${file.file}`
                          }
                          alt={file.name}
                          className="tw:w-full tw:max-w-2xl tw:mx-auto tw:rounded-lg tw:shadow-md"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="tw:flex tw:justify-end">
                    {file.type === "url" && file.url ? (
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tw:inline-flex tw:items-center tw:gap-2 tw:px-4 tw:py-2 tw:bg-blue-600 tw:text-white tw:rounded-lg hover:tw:bg-blue-700 tw:transition-colors tw:font-medium tw:shadow-md hover:tw:shadow-lg"
                      >
                        <i className="bx bx-link-external"></i>
                        Open Link
                      </a>
                    ) : file.type === "upload" && file.file ? (
                      <a
                        href={`${FILE_BASE_URL}/${file.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tw:inline-flex tw:items-center tw:gap-2 tw:px-4 tw:py-2 tw:bg-green-600 tw:text-white tw:rounded-lg hover:tw:bg-green-700 tw:transition-colors tw:font-medium tw:shadow-md hover:tw:shadow-lg"
                      >
                        <i className="bx bx-download"></i>
                        Download
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="tw:mt-8">
      {/* Course Content Header */}
      <div className="tw:mb-6">
        <h2 className="tw:text-2xl tw:font-bold tw:mb-2 tw:text-gray-900">
          Course Content
        </h2>
        <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-4 tw:text-sm tw:text-gray-600">
          <span>{modules.length} sections</span>
          <span>•</span>
          <span>{getTotalLessons()} lectures</span>
        </div>
      </div>

      <div className="tw:space-y-2">
        {/* Course Modules */}
        {modules.map((module, moduleIndex) => (
          <div
            key={module.id}
            className="tw:border tw:border-gray-200 tw:rounded-lg tw:overflow-hidden"
          >
            {/* Module Header */}
            <div
              className="tw:bg-gray-50 tw:px-4 tw:py-3 tw:cursor-pointer tw:flex tw:items-center tw:justify-between hover:tw:bg-gray-100 tw:transition-colors"
              onClick={() => toggleModule(module.id)}
            >
              <div className="tw:flex tw:items-center tw:gap-3">
                <button className="tw:text-gray-600 tw:text-lg tw:transition-transform tw:duration-200">
                  {expandedModules.has(module.id) ? (
                    <i className="bx bx-chevron-down"></i>
                  ) : (
                    <i className="bx bx-chevron-right"></i>
                  )}
                </button>
                <h3 className="tw:font-semibold tw:text-gray-900">
                  Section {moduleIndex + 1}: {module.title ?? "Untitled Module"}
                </h3>
              </div>
              <div className="tw:flex tw:items-center tw:gap-4 tw:text-sm tw:text-gray-600">
                <span>{module.lessons?.length || 0} lectures</span>
                {module.description && (
                  <span className="tw:text-xs tw:bg-blue-100 tw:text-blue-700 tw:px-2 tw:py-0.5 tw:rounded">
                    Info
                  </span>
                )}
              </div>
            </div>

            {/* Module Content */}
            {expandedModules.has(module.id) && (
              <div className="tw:bg-white">
                {module.description && (
                  <div className="tw:px-4 tw:py-3 tw:bg-blue-50 tw:border-b tw:border-gray-100">
                    <p className="tw:text-sm tw:text-gray-700">
                      {module.description}
                    </p>
                  </div>
                )}

                {/* Lessons */}
                {module.lessons
                  ?.slice()
                  .sort((a, b) => (a?.order || 0) - (b?.order || 0))
                  .map((lesson, lessonIndex) => (
                    <div
                      key={lesson?.id}
                      className="tw:px-4 tw:py-3 tw:border-t tw:border-gray-100 tw:flex tw:items-center tw:justify-between hover:tw:bg-gray-50 tw:transition-colors"
                    >
                      <div className="tw:flex tw:items-center tw:gap-3 tw:flex-1">
                        <div className="tw:w-8 tw:h-8 tw:flex tw:items-center tw:justify-center tw:bg-gray-100 tw:rounded-full tw:text-xs tw:font-medium tw:text-gray-600">
                          {lessonIndex + 1}
                        </div>

                        <div className="tw:flex tw:items-center tw:gap-2">
                          <i
                            className={`${getLessonIcon(
                              lesson!
                            )} tw:text-lg tw:text-gray-600`}
                          ></i>
                          {lesson?.slug && course?.slug ? (
                            <Link
                              href={`/courses/${course.slug}/lessons/${lesson.slug}`}
                              className="tw:font-medium tw:text-gray-900 hover:tw:text-blue-600 tw:transition-colors"
                            >
                              {lesson.title ?? "Untitled Lesson"}
                            </Link>
                          ) : (
                            <span className="tw:font-medium tw:text-gray-900">
                              {lesson?.title ?? "Untitled Lesson"}
                            </span>
                          )}

                          {lesson?.lesson_type && (
                            <span className="tw:px-2 tw:py-0.5 tw:bg-gray-100 tw:text-gray-600 tw:rounded-full tw:text-xs tw:font-medium tw:capitalize">
                              {lesson.lesson_type}
                            </span>
                          )}
                        </div>

                        <div className="tw:flex tw:items-center tw:gap-2">
                          {lesson?.is_free && (
                            <span className="tw:px-2 tw:py-0.5 tw:bg-green-100 tw:text-green-700 tw:rounded-full tw:text-xs tw:font-medium">
                              Free
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="tw:flex tw:items-center tw:gap-4">
                        {lesson?.duration && (
                          <span className="tw:text-sm tw:text-gray-500">
                            {lesson.duration}
                          </span>
                        )}

                        <button
                          className="tw:text-sm tw:text-blue-600 hover:tw:text-blue-700 tw:font-medium tw:underline tw:transition-colors"
                          onClick={() => {
                            resetExam();
                            setModalState({
                              isOpen: true,
                              lesson,
                            });
                          }}
                        >
                          Preview
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}

        {/* Empty State */}
        {!modules.length && (
          <div className="tw:text-center tw:py-12">
            <i className="bx bx-book tw:text-6xl tw:text-gray-300 tw:mb-4"></i>
            <p className="tw:text-gray-500 tw:text-lg">
              No curriculum available yet.
            </p>
            <p className="tw:text-gray-400 tw:text-sm tw:mt-2">
              Course content will be added soon.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalState.isOpen}
        onRequestClose={() => {
          setModalState({ isOpen: false, lesson: null });
          resetExam();
        }}
        contentLabel={modalState.lesson?.title ?? "Lesson Preview"}
        className="tw:max-w-6xl tw:mx-auto tw:my-8 tw:bg-white tw:rounded-xl tw:shadow-2xl tw:outline-none tw:max-h-[90vh] tw:overflow-y-auto"
        overlayClassName="tw:fixed tw:inset-0 tw:bg-black tw:bg-opacity-50 tw:flex tw:items-center tw:justify-center tw:p-4 tw:z-50"
        ariaHideApp={false}
      >
        <div className="tw:relative">
          {/* Modal Header */}
          <div className="tw:sticky tw:top-0 tw:bg-white tw:border-b tw:border-gray-200 tw:px-6 tw:py-4 tw:flex tw:items-center tw:justify-between tw:rounded-t-xl tw:z-10">
            <h3 className="tw:text-xl tw:font-semibold tw:text-gray-900 tw:pr-8">
              {modalState.lesson?.title}
            </h3>
            <button
              onClick={() => {
                setModalState({ isOpen: false, lesson: null });
                resetExam();
              }}
              className="tw:w-8 tw:h-8 tw:flex tw:items-center tw:justify-center tw:rounded-full tw:text-gray-400 hover:tw:text-gray-600 hover:tw:bg-gray-100 tw:transition-colors"
              aria-label="Close modal"
            >
              <i className="bx bx-x tw:text-xl"></i>
            </button>
          </div>

          {/* Modal Content */}
          <div className="tw:px-6 tw:py-6">
            {modalState.lesson && renderLessonModal(modalState.lesson)}
          </div>

          {/* Modal Footer */}
          <div className="tw:sticky tw:bottom-0 tw:bg-gray-50 tw:border-t tw:border-gray-200 tw:px-6 tw:py-4 tw:flex tw:justify-end tw:rounded-b-xl">
            <button
              onClick={() => {
                setModalState({ isOpen: false, lesson: null });
                resetExam();
              }}
              className="tw:px-6 tw:py-2 tw:bg-gray-600 tw:text-white tw:rounded-lg hover:tw:bg-gray-700 tw:transition-colors tw:font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
