"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForgotPasswordMutation } from "@/redux/auth/authApi";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading, isError, isSuccess, error }] =
    useForgotPasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    forgotPassword({ email });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password reset code sent! Please check your email.");
      setEmail("");
    }

    if (isError && error) {
      if ("status" in error) {
        const errorData = error.data as any;
        toast.error(errorData?.message || `Error: ${error.status}`);
      } else if ("message" in error) {
        toast.error(error.message || "Something went wrong");
      } else {
        toast.error("Failed to send reset code");
      }
    }
  }, [isSuccess, isError, error]);

  return (
    <div className="tw:min-h-screen tw:bg-gradient-to-br tw:from-blue-50 tw:to-indigo-100 tw:flex tw:items-center tw:justify-center tw:p-4">
      <div className="tw:max-w-md tw:w-full">
        <div className="tw:bg-white tw:rounded-2xl tw:shadow-xl tw:p-8">
          {/* Header */}
          <div className="tw:text-center tw:mb-8">
            <div className="tw:mx-auto tw:w-16 tw:h-16 tw:bg-gradient-to-r tw:from-blue-500 tw:to-indigo-600 tw:rounded-full tw:flex tw:items-center tw:justify-center tw:mb-4">
              <svg
                className="tw:w-8 tw:h-8 tw:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11v2m12-2v2m-6 6h.01M12 4a8 8 0 100 16 8 8 0 000-16z"
                />
              </svg>
            </div>
            <h2 className="tw:text-2xl tw:font-bold tw:text-gray-900 tw:mb-2">
              Forgot Password
            </h2>
            <p className="tw:text-gray-600">
              Enter your email address to receive a reset code
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="tw:space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="tw:w-full tw:px-4 tw:py-3 tw:border tw:rounded-lg tw:border-gray-300 tw:focus:ring-2 tw:focus:ring-blue-500 tw:focus:border-transparent tw:outline-0"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`tw:w-full tw:py-3 tw:px-4 tw:rounded-lg tw:font-medium tw:text-white tw:transition-all tw:duration-200 ${
                isLoading
                  ? "tw:bg-gray-400 tw:cursor-not-allowed"
                  : "tw:bg-gradient-to-r tw:from-blue-500 tw:to-indigo-600 tw:hover:from-blue-600 tw:hover:to-indigo-700 tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-blue-500 tw:focus:ring-offset-2 tw:transform tw:hover:scale-[1.02] active:tw:scale-[0.98]"
              }`}
            >
              {isLoading ? (
                <span className="tw:flex tw:items-center tw:justify-center">
                  <svg
                    className="tw:animate-spin tw:-ml-1 tw:mr-2 tw:h-4 tw:w-4 tw:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="tw:opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="tw:opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending Code...
                </span>
              ) : (
                "Send Reset Code"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="tw:mt-8 tw:text-center">
            <p className="tw:text-gray-600">
              Remembered your password?{" "}
              <Link
                href="/login"
                className="tw:font-medium tw:text-blue-600 tw:hover:text-blue-500 tw:transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
