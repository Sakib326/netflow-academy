"use client";

import { useUpdatePasswordMutation } from "@/redux/auth/authApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updatePassword, { isLoading, isSuccess }] =
    useUpdatePasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
    }

    try {
      updatePassword({
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      });

      if (isSuccess) {
        toast.success("Password change successfully");
      }
    } catch (error: any) {
      toast.error(`${error?.message}`);
    }
  };

  return (
    <form className="tw:space-y-5 tw:max-w-xl" onSubmit={handleSubmit}>
      {/* Current Password */}
      <div>
        <label className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:mb-2">
          Current Password
        </label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
          className="tw:w-full tw:px-4 tw:py-2 tw:border tw:border-gray-300 tw:rounded-lg focus:tw:ring-2 focus:tw:ring-blue-500 focus:tw:border-transparent tw:transition tw:outline-0"
          required
        />
      </div>

      {/* New Password */}
      <div>
        <label className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:mb-2">
          New Password
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          className="tw:w-full tw:px-4 tw:py-2 tw:border tw:border-gray-300 tw:rounded-lg focus:tw:ring-2 focus:tw:ring-blue-500 focus:tw:border-transparent tw:transition tw:outline-0"
          required
        />
      </div>

      {/* Confirm New Password */}
      <div>
        <label className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:mb-2">
          Confirm New Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          className="tw:w-full tw:px-4 tw:py-2 tw:border tw:border-gray-300 tw:rounded-lg focus:tw:ring focus:tw:ring-blue-500 focus:tw:border-transparent tw:transition tw:outline-0"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`tw:w-full tw:py-2 tw:text-white tw:font-medium tw:rounded-lg tw:transition-all ${
          isLoading
            ? "tw:bg-gray-400 tw:cursor-not-allowed"
            : "tw:bg-gradient-to-r tw:from-blue-500 tw:to-indigo-600 tw:hover:from-blue-600 tw:hover:to-indigo-700"
        }`}
      >
        {isLoading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default ResetPassword;
