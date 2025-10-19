"use client";

import { useState } from "react";
import { useResetPasswordMutation } from "@/redux/auth/authApi";
import { toast } from "react-hot-toast";
import { FiLock, FiMail, FiKey } from "react-icons/fi";
import { useRouter } from "next/navigation";

const ResetPasswordPassword = () => {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [formData, setFormData] = useState({
    email: "",
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await resetPassword(formData).unwrap();
      toast.success(res.message || "Password reset successful!");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="tw:flex tw:justify-center tw:items-center tw:min-h-screen tw:bg-gradient-to-br tw:from-indigo-100 tw:via-blue-50 tw:to-white tw:px-4">
      <div className="tw:w-full tw:max-w-md tw:bg-white tw:shadow-xl tw:rounded-2xl tw:p-8">
        <h2 className="tw:text-2xl tw:font-bold tw:text-center tw:text-gray-800 tw:mb-6">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit} className="tw:space-y-5">
          {/* Email */}
          <div>
            <label className="tw:block tw:text-gray-600 tw:mb-1 tw:font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="tw:w-full tw:border tw:border-gray-300 tw:rounded-lg tw:px-3 tw:py-2 tw:focus:ring-2 tw:focus:ring-blue-400 tw:outline-none"
            />
          </div>

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
            className="tw:w-full tw:bg-blue-600 tw:hover:bg-blue-700 tw:text-white tw:font-semibold tw:py-2 tw:rounded-lg tw:transition-all tw:duration-200 disabled:tw:opacity-50"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
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

export default ResetPasswordPassword;
