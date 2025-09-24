"use client";

import { useUpdateProfileMutation } from "@/redux/auth/authApi";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa";
import { useSelector } from "react-redux";

const Setting = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [preview, setPreview] = useState<string | undefined>(user?.avatar_url);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      alert(
        "Invalid file type. Only JPG, JPEG, PNG, GIF, and WEBP are allowed."
      );
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("File too large. Max 2MB allowed.");
      e.target.value = "";
      return;
    }

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      const res = updateProfile(formData);

      if (res) {
        toast.success("Profile update successfully");
        console.log("Server response:", res);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating profile.");
    }
  };

  useEffect(() => {
    setPreview(user?.avatar_url || "");
    setName(user?.name || "");
    setPhone(user?.phone || "");
  }, [user]);

  return (
    <form
      onSubmit={handleSubmit}
      className="tw:w-full tw:max-w-3xl tw:flex tw:flex-col tw:gap-3"
    >
      <div className="tw:flex tw:justify-center">
        <div className="tw:border tw:relative tw:border-gray-200 tw:w-36 tw:h-36 tw:rounded-full tw:overflow-hidden">
          <img
            src={preview || "/assets/img/default-avatar.jpg"}
            alt={user?.name}
            className="tw:w-full tw:h-full tw:rounded-full tw:object-cover"
          />
          <fieldset className="">
            <label
              htmlFor="avatar"
              // className="tw-flex tw-items-center tw-justify-center tw-w-full"
              className="tw:absolute tw:bottom-0 tw:bg-[#359093] tw:opacity-80 tw:overflow-hidden tw:w-full tw:py-4 tw:flex tw:items-center tw:justify-center tw:cursor-pointer tw:text-white tw:shadow-md hover:tw:bg-[#2a6c74]"
            >
              <FaCamera className="tw:text-xl" />
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="tw:hidden"
              accept=".jpg,.jpeg,.png,.gif,.webp"
              onChange={handleFileChange}
            />
          </fieldset>
        </div>
      </div>

      {/* User Info */}
      <div className=" tw:px-10 tw:py-6 tw:bg-white tw:rounded-lg tw:shadow-md tw:flex tw:flex-col tw:gap-4">
        <div className="tw:flex tw:flex-col">
          <label
            htmlFor="name"
            className="tw:mb-1 tw:text-gray-600 tw:font-medium"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="tw:px-4 tw:py-2 tw:border tw:border-gray-300 tw:rounded-md tw:focus:tw:outline-none tw:focus:tw:ring-2 tw:focus:tw:ring-[#359093]"
          />
        </div>

        <div className="tw:flex tw:flex-col">
          <label
            htmlFor="phone"
            className="tw:mb-1 tw:text-gray-600 tw:font-medium"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="tw:px-4 tw:py-2 tw:border tw:border-gray-300 tw:rounded-md tw:focus:tw:outline-none tw:focus:tw:ring-2 tw:focus:tw:ring-[#359093]"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="tw:mt-4 tw:px-6 tw:py-2 tw:bg-[#359093] tw:text-white tw:rounded-md hover:tw:bg-[#2a6c74] tw:disabled:tw:opacity-50"
        >
          {isLoading ? "Updating..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default Setting;
