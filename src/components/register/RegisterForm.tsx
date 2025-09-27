"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface FormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage("");
    setErrors({});

    try {
      const response = await axios.post(
        "https://admin.netflowacademy.com/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // Success
      setMessage("Registration successful! Redirecting...");

      // Store token if provided
      if (response.data.token) {
        document.cookie = `token=${response.data.token}; path=/; max-age=${
          7 * 24 * 60 * 60
        }`; // 7 days
      }

      // Redirect after short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error: any) {
      console.error("Registration error:", error);

      if (error.response?.data) {
        // Handle API validation errors
        const { data } = error.response;

        if (data.errors) {
          const apiErrors: Record<string, string> = {};
          Object.entries(data.errors).forEach(
            ([key, messages]: [string, any]) => {
              if (Array.isArray(messages)) {
                apiErrors[key] = messages[0];
              }
            }
          );
          setErrors(apiErrors);
        } else {
          setMessage(data.message || "Registration failed. Please try again.");
        }
      } else if (error.request) {
        setMessage(
          "Network error. Please check your connection and try again."
        );
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="tw:text-2xl tw:font-bold tw:text-gray-900 tw:mb-2">
              Create Account
            </h2>
            <p className="tw:text-gray-600">Join us today and get started</p>
          </div>

          {/* Success/Error Message */}
          {message && (
            <div
              className={`tw:mb-6 tw:p-4 tw:rounded-lg tw:text-sm ${
                message.includes("successful")
                  ? "tw:bg-green-50 tw:text-green-700 tw:border tw:border-green-200"
                  : "tw:bg-red-50 tw:text-red-700 tw:border tw:border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="tw:space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`tw:w-full tw:px-4 tw:py-3 tw:border tw:rounded-lg tw:focus:ring-2 tw:focus:ring-blue-500 tw:focus:border-transparent tw:transition-all ${
                  errors.name
                    ? "tw:border-red-300 tw:bg-red-50"
                    : "tw:border-gray-300"
                }`}
                placeholder="Enter your full name"
                required
              />
              {errors.name && (
                <p className="tw:mt-1 tw:text-sm tw:text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`tw:w-full tw:px-4 tw:py-3 tw:border tw:rounded-lg tw:focus:ring-2 tw:focus:ring-blue-500 tw:focus:border-transparent tw:transition-all ${
                  errors.phone
                    ? "tw:border-red-300 tw:bg-red-50"
                    : "tw:border-gray-300"
                }`}
                placeholder="Enter your phone number"
                required
              />
              {errors.phone && (
                <p className="tw:mt-1 tw:text-sm tw:text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Email */}
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
                value={formData.email}
                onChange={handleChange}
                className={`tw:w-full tw:px-4 tw:py-3 tw:border tw:rounded-lg tw:focus:ring-2 tw:focus:ring-blue-500 tw:focus:border-transparent tw:transition-all ${
                  errors.email
                    ? "tw:border-red-300 tw:bg-red-50"
                    : "tw:border-gray-300"
                }`}
                placeholder="Enter your email address"
                required
              />
              {errors.email && (
                <p className="tw:mt-1 tw:text-sm tw:text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`tw:w-full tw:px-4 tw:py-3 tw:border tw:rounded-lg tw:focus:ring-2 tw:focus:ring-blue-500 tw:focus:border-transparent tw:transition-all ${
                  errors.password
                    ? "tw:border-red-300 tw:bg-red-50"
                    : "tw:border-gray-300"
                }`}
                placeholder="Create a password"
                required
              />
              {errors.password && (
                <p className="tw:mt-1 tw:text-sm tw:text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="password_confirmation"
                className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                className={`tw:w-full tw:px-4 tw:py-3 tw:border tw:rounded-lg tw:focus:ring-2 tw:focus:ring-blue-500 tw:focus:border-transparent tw:transition-all ${
                  errors.password_confirmation
                    ? "tw:border-red-300 tw:bg-red-50"
                    : "tw:border-gray-300"
                }`}
                placeholder="Confirm your password"
                required
              />
              {errors.password_confirmation && (
                <p className="tw:mt-1 tw:text-sm tw:text-red-600">
                  {errors.password_confirmation}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`tw:w-full tw:py-3 tw:px-4 tw:rounded-lg tw:font-medium tw:text-white tw:transition-all tw:duration-200 ${
                isLoading
                  ? "tw:bg-gray-400 tw:cursor-not-allowed"
                  : "tw:bg-gradient-to-r tw:from-blue-500 tw:to-indigo-600 hover:tw:from-blue-600 hover:tw:to-indigo-700 tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-blue-500 tw:focus:ring-offset-2 tw:transform hover:tw:scale-[1.02] active:tw:scale-[0.98]"
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
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="tw:mt-8 tw:text-center">
            <p className="tw:text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="tw:font-medium tw:text-blue-600 hover:tw:text-blue-500 tw:transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
