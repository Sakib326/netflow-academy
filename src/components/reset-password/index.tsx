"use client";

import { useState, useEffect } from "react";
import { useResetPasswordMutation } from "@/redux/auth/authApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email");

  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();
  const [formData, setFormData] = useState({
    code: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!emailFromQuery) {
      toast.error("Email is missing in the URL!");
      return;
    }

    try {
      const payload = { ...formData, email: emailFromQuery };
      resetPassword(payload);

      if (isSuccess) {
        toast.success("Password reset successful! Please login.");
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (!emailFromQuery) {
      toast.error("Invalid reset link!");
      router.push("/forgot-password");
    }
  }, [emailFromQuery, router]);

  return (
    <div className="tw:flex tw:justify-center tw:items-center tw:min-h-screen tw:bg-gradient-to-br tw:from-indigo-100 tw:via-blue-50 tw:to-white tw:px-4">
      <div className="tw:w-full tw:max-w-md tw:bg-white tw:shadow-xl tw:rounded-2xl tw:p-8">
        <h2 className="tw:text-2xl tw:font-bold tw:text-center tw:text-gray-800 tw:mb-6">
          Reset Your Password
        </h2>
        <p className="tw:text-center tw:text-sm tw:text-gray-500 tw:mb-6">
          A reset code has been sent to your email address. <br />
          If you don’t see it in your inbox within a few minutes, please check
          your
          <span className="tw:font-medium tw:text-gray-700"> Spam </span>folder.
        </p>

        <form onSubmit={handleSubmit} className="tw:space-y-5">
          {/* Code */}
          <div>
            <label className="tw:block tw:text-gray-600 tw:mb-1 tw:font-medium">
              Verification Code
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter 6-digit code"
              required
              className="tw:w-full tw:border tw:border-gray-300 tw:rounded-lg tw:px-3 tw:py-2 tw:focus:ring-2 tw:focus:ring-blue-400 tw:outline-none"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="tw:block tw:text-gray-600 tw:mb-1 tw:font-medium">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              required
              className="tw:w-full tw:border tw:border-gray-300 tw:rounded-lg tw:px-3 tw:py-2 tw:focus:ring-2 tw:focus:ring-blue-400 tw:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="tw:block tw:text-gray-600 tw:mb-1 tw:font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              className="tw:w-full tw:border tw:border-gray-300 tw:rounded-lg tw:px-3 tw:py-2 tw:focus:ring-2 tw:focus:ring-blue-400 tw:outline-none"
            />
          </div>

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
                Resetting...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <p className="tw:text-center tw:text-sm tw:text-gray-500 tw:mt-6">
          Remember your password?{" "}
          <span
            onClick={() => router.push("/login")}
            className="tw:text-blue-600 tw:hover:underline tw:cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
