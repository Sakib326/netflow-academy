"use client";
import { useEffect, useState } from "react";
import VideoPopup from "../../modals/VideoPopup";
import { SingleCourse } from "@/types/course";
import CourseCurriculum from "./components/CourseCurriculum";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import {
  useCreateOrderMutation,
  useLazyCheckCouponQuery,
} from "@/redux/orders/orderApi";
import { useGetReviewsQuery } from "@/redux/reviews/reviewApi";
import { SingleCourseModule } from "@/types/singleCourse";
import { Review } from "@/types/review";
import {
  FaBookOpen,
  FaChartLine,
  FaClipboardList,
  FaLanguage,
  FaQuestionCircle,
} from "react-icons/fa";

interface CourseDetailsAreaProps {
  course: SingleCourse;
}

export default function CourseDetailsArea({ course }: CourseDetailsAreaProps) {
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [reviewPage, setReviewPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [note, setNote] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [discountInfo, setDiscountInfo] = useState<{
    discount_amount: number;
    final_price: number;
    original_price: number;
  } | null>(null);
  const router = useRouter();
  const [createOrder] = useCreateOrderMutation();
  const [checkCoupon, { isLoading: isCouponLoading }] =
    useLazyCheckCouponQuery();
  const reviewsPerPage = 3;
  const {
    data: reviewData,
    isLoading: reviewLoading,
    error: reviewQueryError,
  } = useGetReviewsQuery(
    {
      page: reviewPage,
      per_page: reviewsPerPage,
      course_id: course?.id,
    },
    {
      skip: !course?.id,
    },
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/js/dist/tab");
    }
  }, []);

  // Null checks for all nested content
  const instructor = course?.instructor ?? {};
  const category = course?.category ?? {};
  const rating_distribution = course?.rating_distribution ?? [];
  const reviewTotalPages = reviewData?.last_page ?? 1;
  const reviewPageItems = (() => {
    if (reviewTotalPages <= 5) {
      return Array.from({ length: reviewTotalPages }, (_, index) => index + 1);
    }

    const pages = new Set<number>([1, reviewTotalPages]);

    for (const page of [reviewPage - 1, reviewPage, reviewPage + 1]) {
      if (page > 1 && page < reviewTotalPages) {
        pages.add(page);
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  })();

  useEffect(() => {
    setReviewPage(1);
  }, [course?.id]);

  const reviewError = reviewQueryError
    ? "status" in reviewQueryError
      ? "Failed to load reviews."
      : "Unable to load reviews."
    : "";

  // Buy Now handler
  const handleBuyNow = () => {
    // if (!isLoggedIn()) {
    //   router.push("/login");
    //   return;
    // }
    setModalOpen(true);
    // Reset coupon state when modal opens
    setCouponCode("");
    setCouponApplied(false);
    setCouponError("");
    setDiscountInfo(null);
  };

  // Check coupon handler
  const handleCheckCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }
    setCouponError("");
    try {
      const res = await checkCoupon({
        slug: course.slug!,
        coupon_code: couponCode.trim(),
      }).unwrap();
      if (res.success) {
        setCouponApplied(true);
        setDiscountInfo({
          discount_amount: res.discount_amount || 0,
          final_price: res.final_amount || res.final_price || 0,
          original_price: res.course_price || res.original_price || 0,
        });
        setCouponError("");
      } else {
        setCouponApplied(false);
        setDiscountInfo(null);
        setCouponError(res.message || "Invalid coupon code");
      }
    } catch (err: any) {
      setCouponApplied(false);
      setDiscountInfo(null);
      setCouponError(err?.data?.message || "Failed to validate coupon");
    }
  };

  // Remove coupon handler
  const handleRemoveCoupon = () => {
    setCouponCode("");
    setCouponApplied(false);
    setCouponError("");
    setDiscountInfo(null);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res: any = await createOrder({
        slug: course.slug!,
        notes: note,
        coupon_code: couponApplied ? couponCode : undefined,
      }).unwrap();
      if (res.success) {
        setModalOpen(false);
        router.push("/dashboard/orders/");
      } else {
        alert(res.message || "Could not place order.");
      }
    } catch (err: any) {
      alert(err?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
      setNote("");
      setCouponCode("");
      setCouponApplied(false);
      setDiscountInfo(null);
    }
  };

  // Sort modules and lessons
  const modules: SingleCourseModule[] =
    (course?.modules
      ?.slice()
      .sort(
        (a, b) => (a.order || 0) - (b.order || 0),
      ) as SingleCourseModule[]) || [];

  // Calculate totals
  const getTotalLessons = () => {
    return modules.reduce(
      (total, module) =>
        total +
        (module?.lessons?.filter(
          (lesson) =>
            lesson.lesson_type !== "assignment" &&
            lesson.lesson_type !== "quiz",
        )?.length || 0),
      0,
    );
  };

  const getTotalAssignments = () =>
    modules.reduce(
      (total, module) =>
        total +
        (module.lessons?.filter((lesson) => lesson.lesson_type === "assignment")
          .length || 0),
      0,
    );

  const getTotalQuizzes = () =>
    modules.reduce(
      (total, module) =>
        total +
        (module.lessons?.filter((lesson) => lesson.lesson_type === "quiz")
          .length || 0),
      0,
    );

  return (
    <>
      {/* video modal start */}
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoUrl={course?.thumb_video_url ?? ""}
      />
      {/* video modal end */}

      {/* Buy Now Modal */}

      <section className="courses-details section-padding">
        <div className="container">
          <Modal
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            className="tw:bg-white tw:rounded-2xl tw:max-w-lg tw:w-full tw:mx-4 tw:shadow-2xl tw:outline-none tw:overflow-hidden"
            overlayClassName="tw:fixed tw:inset-0 tw:bg-black/60 tw:backdrop-blur-sm tw:flex tw:items-center tw:justify-center tw:z-50"
          >
            {/* Modal Header */}
            <div className="tw:bg-gradient-to-r tw:from-blue-600 tw:to-blue-800 tw:p-6 tw:text-white">
              <div className="tw:flex tw:items-center tw:justify-between">
                <div>
                  <h2 className="tw:text-xl tw:font-bold tw:mb-1">
                    Complete Your Order
                  </h2>
                  <p className="tw:text-blue-100 tw:text-sm">
                    You're enrolling in: {course?.title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="tw:w-8 tw:h-8 tw:rounded-full tw:bg-white/20 hover:tw:bg-white/30 tw:flex tw:items-center tw:justify-center tw:transition-colors"
                >
                  <span className="tw:text-white tw:text-xl tw:leading-none">
                    &times;
                  </span>
                </button>
              </div>
            </div>

            <form onSubmit={handleOrderSubmit} className="tw:p-6">
              {/* Price Summary */}
              <div className="tw:bg-gray-50 tw:rounded-xl tw:p-4 tw:mb-6">
                <div className="tw:flex tw:justify-between tw:items-center tw:mb-2">
                  <span className="tw:text-gray-600">Original Price</span>
                  <span
                    className={`tw:font-semibold ${discountInfo ? "tw:line-through tw:text-gray-400" : "tw:text-gray-900"}`}
                  >
                    ৳
                    {discountInfo?.original_price ||
                      course?.discounted_price ||
                      course?.price}
                  </span>
                </div>
                {discountInfo && (
                  <>
                    <div className="tw:flex tw:justify-between tw:items-center tw:mb-2 tw:text-green-600">
                      <span className="tw:flex tw:items-center tw:gap-2">
                        <span className="tw:text-lg">🎉</span> Discount Applied
                      </span>
                      <span className="tw:font-semibold">
                        -৳{discountInfo.discount_amount}
                      </span>
                    </div>
                    <div className="tw:border-t tw:border-gray-200 tw:pt-2 tw:mt-2">
                      <div className="tw:flex tw:justify-between tw:items-center">
                        <span className="tw:text-gray-900 tw:font-semibold">
                          Final Price
                        </span>
                        <span className="tw:text-2xl tw:font-bold tw:text-green-600">
                          ৳{discountInfo.final_price}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Coupon Section */}
              <div className="tw:mb-6">
                <label className="tw:block tw:text-sm tw:font-semibold tw:text-gray-700 tw:mb-2">
                  🏷️ Have a Coupon Code?
                </label>
                {!couponApplied ? (
                  <div className="tw:flex tw:gap-2">
                    <input
                      type="text"
                      className="tw:flex-1 tw:border tw:border-gray-300 tw:rounded-lg tw:px-4 tw:py-3 tw:text-sm focus:tw:ring-2 focus:tw:ring-blue-500 focus:tw:border-blue-500 tw:outline-none tw:transition-all tw:uppercase"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase());
                        setCouponError("");
                      }}
                      disabled={loading || isCouponLoading}
                    />
                    <button
                      type="button"
                      onClick={handleCheckCoupon}
                      disabled={
                        loading || isCouponLoading || !couponCode.trim()
                      }
                      className="tw:px-5 tw:py-3 tw:bg-gray-800 tw:text-white tw:rounded-lg tw:font-semibold tw:text-sm hover:tw:bg-gray-900 disabled:tw:bg-gray-400 disabled:tw:cursor-not-allowed tw:transition-colors"
                    >
                      {isCouponLoading ? (
                        <span className="tw:flex tw:items-center tw:gap-2">
                          <svg
                            className="tw:animate-spin tw:h-4 tw:w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="tw:opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="tw:opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Checking
                        </span>
                      ) : (
                        "Apply"
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="tw:flex tw:items-center tw:justify-between tw:bg-green-50 tw:border tw:border-green-200 tw:rounded-lg tw:px-4 tw:py-3">
                    <div className="tw:flex tw:items-center tw:gap-2">
                      <span className="tw:text-green-600 tw:text-lg">✓</span>
                      <span className="tw:text-green-800 tw:font-semibold">
                        {couponCode}
                      </span>
                      <span className="tw:text-green-600 tw:text-sm">
                        applied
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="tw:text-red-500 hover:tw:text-red-700 tw:text-sm tw:font-medium tw:transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="tw:text-red-500 tw:text-sm tw:mt-2 tw:flex tw:items-center tw:gap-1">
                    <span>⚠️</span> {couponError}
                  </p>
                )}
              </div>

              {/* Special Request */}
              <div className="tw:mb-6">
                <label className="tw:block tw:text-sm tw:font-semibold tw:text-gray-700 tw:mb-2">
                  📝 Special Request (Optional)
                </label>
                <textarea
                  className="tw:w-full tw:border tw:border-gray-300 tw:rounded-lg tw:px-4 tw:py-3 tw:text-sm focus:tw:ring-2 focus:tw:ring-blue-500 focus:tw:border-blue-500 tw:outline-none tw:transition-all tw:resize-none"
                  rows={3}
                  placeholder="Any special request or message for us?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Action Buttons */}
              <div className="tw:flex tw:gap-3">
                <button
                  type="button"
                  className="tw:flex-1 tw:px-6 tw:py-3 tw:bg-gray-100 tw:text-gray-700 tw:rounded-lg tw:font-semibold hover:tw:bg-gray-200 tw:transition-colors"
                  onClick={() => setModalOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="tw:flex-1 tw:px-6 tw:py-3 tw:bg-gradient-to-r tw:from-blue-600 tw:to-blue-700 tw:text-white tw:rounded-lg tw:font-semibold hover:tw:from-blue-700 hover:tw:to-blue-800 tw:transition-all tw:shadow-lg hover:tw:shadow-xl disabled:tw:opacity-50 disabled:tw:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="tw:flex tw:items-center tw:justify-center tw:gap-2">
                      <svg
                        className="tw:animate-spin tw:h-5 tw:w-5"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="tw:opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="tw:opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="tw:flex tw:items-center tw:justify-center tw:gap-2">
                      🛒 Place Order
                    </span>
                  )}
                </button>
              </div>

              {/* Terms Note */}
              <p className="tw:text-xs tw:text-gray-500 tw:text-center tw:mt-4">
                By placing this order, you agree to our{" "}
                <a
                  href="/terms"
                  className="tw:text-blue-600 hover:tw:underline"
                >
                  Terms & Conditions
                </a>
              </p>
            </form>
          </Modal>
          <div className="row">
            <div className="col-xl-8 wow fadeIn">
              <div className="tw:relative tw:w-full tw:mb-6">
                {/* Always show the thumbnail image */}
                <img
                  src={course?.thumbnail ?? "/assets/img/courses/cdetails.jpg"}
                  alt={course?.title ?? "Course"}
                  className="tw:w-full tw:rounded-xl tw:object-cover tw:aspect-video"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/img/courses/cdetails.jpg";
                  }}
                />
              </div>

              <div className="scourse_meta">
                <div className="smeta">
                  <span>Category:</span>
                  <p>{category.name ?? "N/A"}</p>
                </div>

                <div className="smeta">
                  <span>Last Update:</span>
                  <p>
                    {course?.updated_at
                      ? new Date(course.updated_at).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div className="smeta">
                  <span>Review:</span>
                  <p>
                    <a href="#">
                      <span className="rev_icons">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={
                              i < Math.round(course?.average_rating ?? 0)
                                ? "bx bxs-star"
                                : "bx bx-star"
                            }
                          ></i>
                        ))}
                      </span>
                      <span className="rev_content">
                        ({(course?.average_rating ?? 0).toFixed(2)})
                      </span>
                    </a>
                  </p>
                </div>
              </div>

              <h2 className="scourse-title">{course?.title ?? "N/A"}</h2>

              <nav className="cd_tab">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    className="nav-link active"
                    id="nav-overview-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-overview"
                    type="button"
                    role="tab"
                    aria-controls="nav-overview"
                    aria-selected="true"
                  >
                    Overview
                  </button>
                  {/* Only show Curriculum tab if not a bundle */}
                  {!course.is_bundle && (
                    <button
                      className="nav-link"
                      id="nav-curriculum-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-curriculum"
                      type="button"
                      role="tab"
                      aria-controls="nav-curriculum"
                      aria-selected="false"
                    >
                      Curriculum
                    </button>
                  )}
                  <button
                    className="nav-link"
                    id="nav-review-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-review"
                    type="button"
                    role="tab"
                    aria-controls="nav-review"
                    aria-selected="false"
                  >
                    Review
                  </button>
                </div>
              </nav>

              <div className="tab-content" id="nav-tabContent">
                {/* Overview Tab */}
                <div
                  className="tab-pane fade show active"
                  id="nav-overview"
                  role="tabpanel"
                  aria-labelledby="nav-overview-tab"
                  tabIndex={0}
                >
                  {course.description && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          course?.description ?? "No description available.",
                      }}
                    />
                  )}
                  {course?.what_you_will_learn && (
                    <div>
                      <h3>What you will learn</h3>
                      <ul>
                        {course.what_you_will_learn
                          .split("\n")
                          .map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                  {course?.requirements && (
                    <div>
                      <h3>Requirements</h3>
                      <ul>
                        {course.requirements.split("\n").map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {course.is_bundle &&
                    course.bundle_courses &&
                    course.bundle_courses.length > 0 && (
                      <div className="tw:mt-6">
                        <h3 className="tw:mb-4 tw:text-lg tw:font-semibold">
                          Included Courses
                        </h3>
                        <div className="tw:grid tw:grid-cols-1 md:tw:grid-cols-2 tw:gap-4">
                          {course.bundle_courses.map((bundle) => (
                            <div
                              key={bundle.id}
                              className="tw:flex tw:items-center tw:bg-gray-50 tw:p-3 tw:rounded tw:shadow-sm"
                            >
                              <div className="tw:flex-shrink-0">
                                <img
                                  src={
                                    bundle.thumbnail ??
                                    "/assets/img/courses/cdetails.jpg"
                                  }
                                  alt={bundle.title}
                                  className="tw:w-20 tw:h-20 tw:object-cover tw:rounded-md tw:border tw:border-gray-200"
                                  style={{
                                    minWidth: 80,
                                    minHeight: 80,
                                    maxWidth: 80,
                                    maxHeight: 80,
                                  }}
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      "/assets/img/courses/cdetails.jpg";
                                  }}
                                />
                              </div>
                              <div className="tw:ml-4 tw:flex-1">
                                <a
                                  href={`/courses/${bundle.slug}`}
                                  className="tw:font-semibold tw:text-blue-700 tw:hover:underline tw:block tw:text-base"
                                >
                                  {bundle.title}
                                </a>
                                <div className="tw:text-xs tw:text-gray-500 tw:mt-1">
                                  {bundle.price && (
                                    <>
                                      <span>৳{bundle.price}</span>
                                      {bundle.discounted_price && (
                                        <span className="tw:line-through tw:ml-2">
                                          ৳{bundle.discounted_price}
                                        </span>
                                      )}
                                    </>
                                  )}
                                </div>
                                <div className="tw:text-xs tw:text-gray-400 tw:mt-1">
                                  {typeof bundle.total_lessons === "number"
                                    ? `${bundle.total_lessons} Lessons`
                                    : ""}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>

                {/* Curriculum Tab (only if not bundle) */}
                {!course.is_bundle && (
                  <div
                    className="tab-pane fade"
                    id="nav-curriculum"
                    role="tabpanel"
                    aria-labelledby="nav-curriculum-tab"
                    tabIndex={0}
                  >
                    <div className="cd_curriculum">
                      <CourseCurriculum course={course} />
                    </div>
                  </div>
                )}

                {/* Review Tab */}
                <div
                  className="tab-pane fade"
                  id="nav-review"
                  role="tabpanel"
                  aria-labelledby="nav-review-tab"
                  tabIndex={0}
                >
                  <div className="cd_rating">
                    <h3>Student's Reviews</h3>
                    <div className="cd_rating_top">
                      <div className="cdr_rate_summary">
                        <h1>{(course?.average_rating ?? 0).toFixed(1)}</h1>
                        <span className="cdr_rating">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={
                                i < Math.round(course?.average_rating ?? 0)
                                  ? "bx bxs-star"
                                  : "bx bx-star"
                              }
                            ></i>
                          ))}
                        </span>
                        <p>Total {course?.total_reviews ?? 0} Rating</p>
                      </div>
                      <div className="cdr_rate_number">
                        <ul>
                          {rating_distribution.length > 0 ? (
                            rating_distribution.map((dist) => (
                              <li key={dist.rating}>
                                <span className="cdr_rate_star">
                                  {dist.rating}
                                </span>
                                <span className="cdr_rate_value">
                                  <span
                                    className="rating_width"
                                    style={{
                                      width: `${dist.percentage ?? 0}%`,
                                    }}
                                  ></span>
                                  <span className="cdr_rate_count">
                                    {dist.count ?? 0} Rating
                                  </span>
                                </span>
                              </li>
                            ))
                          ) : (
                            <li>No rating distribution available.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                    {reviewLoading ? (
                      <div className="tw:mt-5 tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-slate-50 tw:px-4 tw:py-3 tw:text-sm tw:text-slate-600">
                        Loading reviews...
                      </div>
                    ) : reviewError ? (
                      <div className="tw:mt-5 tw:rounded-2xl tw:border tw:border-red-200 tw:bg-red-50 tw:px-4 tw:py-3 tw:text-sm tw:text-red-600">
                        {reviewError}
                      </div>
                    ) : null}

                    <div className="tw:mt-5 tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:shadow-sm">
                      <div className="tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-3 tw:border-b tw:border-slate-100 tw:px-5 tw:py-4">
                        <div>
                          <h4 className="tw:text-base tw:font-semibold tw:text-slate-900">
                            Recent Reviews
                          </h4>
                          <p className="tw:text-sm tw:text-slate-500">
                            Page {reviewData?.current_page ?? reviewPage} of{" "}
                            {reviewTotalPages}
                          </p>
                        </div>
                        <div className="tw:inline-flex tw:items-center tw:gap-2 tw:rounded-full tw:bg-slate-100 tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-slate-700">
                          <span className="tw:h-2 tw:w-2 tw:rounded-full tw:bg-blue-600"></span>
                          {reviewData?.total ?? 0} total reviews
                        </div>
                      </div>

                      <div className="rating_list tw:!m-0 tw:px-5 tw:py-5">
                        {!reviewLoading &&
                        !reviewError &&
                        reviewData?.data?.length ? (
                          reviewData.data.map((review: Review) => (
                            <div
                              className="rating_item tw:rounded-xl tw:border tw:border-slate-100 tw:bg-slate-50 tw:p-4 tw:shadow-sm tw:transition-shadow hover:tw:shadow-md"
                              key={review.id}
                            >
                              <div className="rating_item_avatar tw:items-start">
                                <img
                                  src={
                                    review.user?.avatar ??
                                    "/assets/img/review/default.jpg"
                                  }
                                  alt={review.user?.name ?? "avatar"}
                                  className="tw:h-12 tw:w-12 tw:rounded-full tw:border tw:border-white tw:object-cover tw:shadow-sm"
                                />
                                <div className="rava_conent tw:pt-0.5">
                                  <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3">
                                    <h3 className="tw:text-sm tw:font-semibold tw:text-slate-900">
                                      {review.user?.name ?? "Anonymous"}
                                    </h3>
                                    <span className="tw:rounded-full tw:bg-amber-50 tw:px-2.5 tw:py-1 tw:text-xs tw:font-semibold tw:text-amber-700">
                                      {review.rating.toFixed(1)} / 5
                                    </span>
                                  </div>
                                  <span className="rating_item_ricon tw:mt-1 tw:flex tw:text-amber-500">
                                    {[...Array(5)].map((_, i) => (
                                      <i
                                        key={i}
                                        className={
                                          i < (review.rating ?? 0)
                                            ? "bx bxs-star"
                                            : "bx bx-star"
                                        }
                                      ></i>
                                    ))}
                                  </span>
                                </div>
                              </div>
                              <div className="rating_item_content tw:mt-3 tw:border-l-2 tw:border-blue-200 tw:pl-4">
                                <p className="tw:text-sm tw:leading-6 tw:text-slate-700">
                                  {review.review ?? ""}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : !reviewLoading && !reviewError ? (
                          <div className="tw:rounded-xl tw:border tw:border-dashed tw:border-slate-200 tw:bg-slate-50 tw:px-4 tw:py-8 tw:text-center tw:text-sm tw:text-slate-500">
                            No reviews yet.
                          </div>
                        ) : null}
                      </div>

                      {reviewData && reviewTotalPages > 1 && (
                        <div className="tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-4 tw:border-t tw:border-slate-100 tw:px-5 tw:py-4">
                          <p className="tw:text-sm tw:text-slate-500">
                            Showing {reviewData.from ?? 0}-
                            {Math.min(
                              reviewData.to ?? 0,
                              reviewData.total ?? 0,
                            )}{" "}
                            of {reviewData.total ?? 0}
                          </p>

                          <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setReviewPage((page) => Math.max(1, page - 1))
                              }
                              disabled={reviewPage === 1}
                              className="tw:inline-flex tw:items-center tw:gap-2 tw:rounded-full tw:border tw:border-slate-200 tw:bg-white tw:px-4 tw:py-2 tw:text-sm tw:font-medium tw:text-slate-700 tw:shadow-sm tw:transition-colors hover:tw:bg-slate-50 disabled:tw:cursor-not-allowed disabled:tw:opacity-50"
                            >
                              Previous
                            </button>

                            <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
                              {reviewPageItems.map((pageNumber, index) => {
                                const previousPage = reviewPageItems[index - 1];
                                const showGap =
                                  index > 0 && previousPage !== pageNumber - 1;

                                return (
                                  <span
                                    key={pageNumber}
                                    className="tw:flex tw:items-center tw:gap-2"
                                  >
                                    {showGap && (
                                      <span className="tw:px-1 tw:text-sm tw:text-slate-400">
                                        ...
                                      </span>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => setReviewPage(pageNumber)}
                                      aria-current={
                                        reviewPage === pageNumber
                                          ? "page"
                                          : undefined
                                      }
                                      className={`tw:h-10 tw:min-w-10 tw:rounded-full tw:px-3 tw:text-sm tw:font-semibold tw:transition-all ${
                                        reviewPage === pageNumber
                                          ? "tw:bg-blue-600 tw:text-white tw:shadow-md tw:shadow-blue-200"
                                          : "tw:border tw:border-slate-200 tw:bg-white tw:text-slate-700 hover:tw:bg-slate-50"
                                      }`}
                                    >
                                      {pageNumber}
                                    </button>
                                  </span>
                                );
                              })}
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                setReviewPage((page) =>
                                  Math.min(reviewTotalPages, page + 1),
                                )
                              }
                              disabled={reviewPage === reviewTotalPages}
                              className="tw:inline-flex tw:items-center tw:gap-2 tw:rounded-full tw:border tw:border-slate-200 tw:bg-white tw:px-4 tw:py-2 tw:text-sm tw:font-medium tw:text-slate-700 tw:shadow-sm tw:transition-colors hover:tw:bg-slate-50 disabled:tw:cursor-not-allowed disabled:tw:opacity-50"
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Instructor Tab */}
                <div
                  className="tab-pane fade"
                  id="nav-instructor"
                  role="tabpanel"
                  aria-labelledby="nav-instructor-tab"
                  tabIndex={0}
                >
                  <div className="cd_instructor">
                    <div className="cdin_image">
                      <img
                        src={instructor.avatar ?? "/assets/img/instructor.jpg"}
                        alt=""
                      />
                      {/* Social links can be added here if available */}
                    </div>
                    <div className="cdin_content">
                      <h4>
                        <a href="#">{instructor.name ?? "N/A"}</a>
                      </h4>
                      <span>{instructor.bio ?? ""}</span>
                      <p>{instructor.bio ?? ""}</p>
                      <div className="cdin_meta">
                        <div className="cdin_meta_item">
                          <i className="bx bx-user"></i>{" "}
                          {instructor.total_students ?? 0} Students
                        </div>
                        <div className="cdin_meta_item">
                          <i className="bx bxs-folder-open"></i>{" "}
                          {instructor.total_courses ?? 0} Courses
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-xl-4 wow fadeIn">
              <div className="course-sidebar">
                <h3>Course Features</h3>
                <ul className="scourse_list">
                  <li>
                    <span className="cside-label  tw:gap-2 tw:flex tw:items-center">
                      <FaBookOpen /> Lesson
                    </span>
                    <span className="cside-value ">
                      {getTotalLessons() ?? 0}
                    </span>
                  </li>

                  <li>
                    <span className="cside-label tw:gap-2 tw:flex tw:items-center">
                      <FaClipboardList /> Assingments
                    </span>
                    <span className="cside-value">
                      {getTotalAssignments() ?? 0}
                    </span>
                  </li>

                  <li>
                    <span className="cside-label tw:gap-2 tw:flex tw:items-center">
                      <FaQuestionCircle /> Quizzes
                    </span>
                    <span className="cside-value">
                      {getTotalQuizzes() ?? 0}
                    </span>
                  </li>

                  <li>
                    <span className="cside-label tw:gap-2 tw:flex tw:items-center">
                      <FaChartLine /> Skill Level
                    </span>
                    <span className="cside-value">Beginner to Advance</span>
                  </li>
                  <li>
                    <span className="cside-label tw:gap-2 tw:flex tw:items-center">
                      <FaLanguage /> Language
                    </span>
                    <span className="cside-value">Bangla</span>
                  </li>
                </ul>
                <div className="cd_price">
                  {course.discounted_price ? (
                    <>
                      <span className="tw:line-through tw:text-gray-400 tw:mr-2">
                        ৳{course.price}
                      </span>
                      <span className="tw:text-red-500">
                        ৳{course.discounted_price}
                      </span>
                    </>
                  ) : (
                    <>৳{course.price ?? "N/A"}</>
                  )}
                </div>
                <div className="text-center">
                  <button
                    className="bg_btn bt"
                    onClick={handleBuyNow}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Buy Course"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
