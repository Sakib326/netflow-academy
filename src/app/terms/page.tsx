export default function TermsPage() {
  return (
    <section className="tw:py-16 tw:px-4 tw:bg-gradient-to-br tw:from-slate-50 tw:via-blue-50 tw:to-slate-100 tw:min-h-screen">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header */}
            <div className="tw:text-center tw:mb-12">
              <span className="tw:inline-block tw:px-4 tw:py-2 tw:bg-blue-600 tw:text-white tw:rounded-full tw:text-sm tw:font-semibold tw:mb-4">
                📋 Please Read Carefully
              </span>
              <h1 className="tw:text-4xl md:tw:text-5xl tw:font-bold tw:text-gray-900 tw:mb-4">
                Terms & Conditions
              </h1>
              <p className="tw:text-gray-600 tw:max-w-2xl tw:mx-auto">
                By enrolling in Netflow Academy courses, you agree to abide by
                the following terms and conditions.
              </p>
            </div>

            {/* Important Notice - Refund Policy */}
            <div className="tw:mb-10 tw:p-6 tw:bg-gradient-to-r tw:from-red-500 tw:to-red-600 tw:rounded-2xl tw:shadow-2xl tw:border-4 tw:border-red-300 tw:relative tw:overflow-hidden">
              <div className="tw:absolute tw:top-0 tw:right-0 tw:w-32 tw:h-32 tw:bg-white/10 tw:rounded-full tw:-translate-y-1/2 tw:translate-x-1/2"></div>
              <div className="tw:absolute tw:bottom-0 tw:left-0 tw:w-24 tw:h-24 tw:bg-white/10 tw:rounded-full tw:translate-y-1/2 tw:-translate-x-1/2"></div>
              <div className="tw:flex tw:items-start tw:gap-4 tw:relative tw:z-10">
                <div className="tw:flex-shrink-0 tw:w-14 tw:h-14 tw:bg-white tw:rounded-full tw:flex tw:items-center tw:justify-center tw:shadow-lg">
                  <span className="tw:text-2xl tw:font-bold tw:text-red-600">
                    1
                  </span>
                </div>
                <div className="tw:flex-1">
                  <div className="tw:flex tw:items-center tw:gap-2 tw:mb-2">
                  
                  </div>
                  <h3 className="tw:text-xl md:tw:text-2xl tw:font-bold tw:text-white tw:mb-2">
                    Non-Refundable Policy
                  </h3>
                  <p className="tw:text-white/95 tw:text-lg tw:leading-relaxed">
                    The admission fee is{" "}
                    <span className="tw:font-bold tw:underline tw:decoration-yellow-400 tw:decoration-2">
                      non-refundable
                    </span>{" "}
                    once booking or full payment is made and enrollment is
                    confirmed.
                  </p>
                </div>
              </div>
            </div>

            {/* Other Terms Grid */}
            <div className="tw:grid tw:grid-cols-1 md:tw:grid-cols-2 tw:gap-6">
              {/* Term 2 */}
              <div className="tw:bg-white tw:rounded-xl tw:p-6 tw:shadow-lg tw:border tw:border-gray-100 hover:tw:shadow-xl tw:transition-all tw:duration-300 hover:tw:-translate-y-1">
                <div className="tw:flex tw:items-start tw:gap-4">
                  <div className="tw:flex-shrink-0 tw:w-12 tw:h-12 tw:bg-gradient-to-br tw:from-blue-500 tw:to-blue-600 tw:rounded-xl tw:flex tw:items-center tw:justify-center tw:shadow-md">
                    <span className="tw:text-lg tw:font-bold tw:text-white">
                      2
                    </span>
                  </div>
                  <div>
                    <h4 className="tw:text-lg tw:font-bold tw:text-gray-900 tw:mb-2">
                      📅 Attendance Policy
                    </h4>
                    <p className="tw:text-gray-600">
                      Must attend all classes. Regular attendance is mandatory
                      for successful course completion.
                    </p>
                  </div>
                </div>
              </div>

              {/* Term 3 */}
              <div className="tw:bg-white tw:rounded-xl tw:p-6 tw:shadow-lg tw:border tw:border-gray-100 hover:tw:shadow-xl tw:transition-all tw:duration-300 hover:tw:-translate-y-1">
                <div className="tw:flex tw:items-start tw:gap-4">
                  <div className="tw:flex-shrink-0 tw:w-12 tw:h-12 tw:bg-gradient-to-br tw:from-green-500 tw:to-green-600 tw:rounded-xl tw:flex tw:items-center tw:justify-center tw:shadow-md">
                    <span className="tw:text-lg tw:font-bold tw:text-white">
                      3
                    </span>
                  </div>
                  <div>
                    <h4 className="tw:text-lg tw:font-bold tw:text-gray-900 tw:mb-2">
                      📝 Assignment Submission
                    </h4>
                    <p className="tw:text-gray-600">
                      Homework must be submitted for each class on time to track
                      your progress.
                    </p>
                  </div>
                </div>
              </div>

              {/* Term 4 */}
              <div className="tw:bg-white tw:rounded-xl tw:p-6 tw:shadow-lg tw:border tw:border-gray-100 hover:tw:shadow-xl tw:transition-all tw:duration-300 hover:tw:-translate-y-1">
                <div className="tw:flex tw:items-start tw:gap-4">
                  <div className="tw:flex-shrink-0 tw:w-12 tw:h-12 tw:bg-gradient-to-br tw:from-purple-500 tw:to-purple-600 tw:rounded-xl tw:flex tw:items-center tw:justify-center tw:shadow-md">
                    <span className="tw:text-lg tw:font-bold tw:text-white">
                      4
                    </span>
                  </div>
                  <div>
                    <h4 className="tw:text-lg tw:font-bold tw:text-gray-900 tw:mb-2">
                      💻 Practical Learning
                    </h4>
                    <p className="tw:text-gray-600">
                      Hands-on practice is essential. Theory alone won't make
                      you an expert.
                    </p>
                  </div>
                </div>
              </div>

              {/* Term 5 */}
              <div className="tw:bg-white tw:rounded-xl tw:p-6 tw:shadow-lg tw:border tw:border-gray-100 hover:tw:shadow-xl tw:transition-all tw:duration-300 hover:tw:-translate-y-1">
                <div className="tw:flex tw:items-start tw:gap-4">
                  <div className="tw:flex-shrink-0 tw:w-12 tw:h-12 tw:bg-gradient-to-br tw:from-orange-500 tw:to-orange-600 tw:rounded-xl tw:flex tw:items-center tw:justify-center tw:shadow-md">
                    <span className="tw:text-lg tw:font-bold tw:text-white">
                      5
                    </span>
                  </div>
                  <div>
                    <h4 className="tw:text-lg tw:font-bold tw:text-gray-900 tw:mb-2">
                      📜 Guidelines Compliance
                    </h4>
                    <p className="tw:text-gray-600">
                      All academy guidelines and instructions must be followed
                      throughout the course.
                    </p>
                  </div>
                </div>
              </div>

              {/* Term 6 */}
              <div className="tw:bg-white tw:rounded-xl tw:p-6 tw:shadow-lg tw:border tw:border-gray-100 hover:tw:shadow-xl tw:transition-all tw:duration-300 hover:tw:-translate-y-1">
                <div className="tw:flex tw:items-start tw:gap-4">
                  <div className="tw:flex-shrink-0 tw:w-12 tw:h-12 tw:bg-gradient-to-br tw:from-teal-500 tw:to-teal-600 tw:rounded-xl tw:flex tw:items-center tw:justify-center tw:shadow-md">
                    <span className="tw:text-lg tw:font-bold tw:text-white">
                      6
                    </span>
                  </div>
                  <div>
                    <h4 className="tw:text-lg tw:font-bold tw:text-gray-900 tw:mb-2">
                      ⏳ Patience & Commitment
                    </h4>
                    <p className="tw:text-gray-600">
                      Be patient for minimum 6 months to 1 year. Success takes
                      time and dedication.
                    </p>
                  </div>
                </div>
              </div>

              {/* Term 7 */}
              <div className="tw:bg-white tw:rounded-xl tw:p-6 tw:shadow-lg tw:border tw:border-gray-100 hover:tw:shadow-xl tw:transition-all tw:duration-300 hover:tw:-translate-y-1">
                <div className="tw:flex tw:items-start tw:gap-4">
                  <div className="tw:flex-shrink-0 tw:w-12 tw:h-12 tw:bg-gradient-to-br tw:from-pink-500 tw:to-pink-600 tw:rounded-xl tw:flex tw:items-center tw:justify-center tw:shadow-md">
                    <span className="tw:text-lg tw:font-bold tw:text-white">
                      7
                    </span>
                  </div>
                  <div>
                    <h4 className="tw:text-lg tw:font-bold tw:text-gray-900 tw:mb-2">
                      🕐 Daily Practice
                    </h4>
                    <p className="tw:text-gray-600">
                      Dedicate minimum 3 to 5 hours daily for practice to
                      achieve the best results.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Agreement */}
            <div className="tw:mt-12 tw:text-center tw:p-6 tw:bg-white tw:rounded-xl tw:shadow-lg tw:border tw:border-gray-100">
              <div className="tw:inline-flex tw:items-center tw:justify-center tw:w-16 tw:h-16 tw:bg-green-100 tw:rounded-full tw:mb-4">
                <span className="tw:text-3xl">✅</span>
              </div>
              <p className="tw:text-gray-700 tw:font-medium">
                By enrolling in our courses, you acknowledge that you have read,
                understood, and agree to these terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
