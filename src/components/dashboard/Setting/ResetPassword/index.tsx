"use client";

import { useResetPasswordMutation } from "@/redux/auth/authApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
    }

    try {
      resetPassword({
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
    <form
      className="tw:space-y-4 tw:w-full tw:max-w-2xl"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="tw:block tw:mb-1 tw:font-medium">
          Current Password
        </label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="tw:w-full tw:p-2 tw:border tw:rounded"
          required
        />
      </div>

      <div>
        <label className="tw:block tw:mb-1 tw:font-medium">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="tw:w-full tw:p-2 tw:border tw:rounded"
          required
        />
      </div>

      <div>
        <label className="tw:block tw:mb-1 tw:font-medium">
          Confirm New Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="tw:w-full tw:p-2 tw:border tw:rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="tw:w-full tw:px-4 tw:py-2 tw:text-white tw:rounded"
        style={{ backgroundColor: "#359093" }}
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default ResetPassword;
