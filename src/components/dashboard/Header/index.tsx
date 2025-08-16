"use client";

import { useProfileQuery } from "@/redux/auth/authApi";
import { FaRegBell } from "react-icons/fa";
import Link from "next/link";
import { useEffect } from "react";

const Header = () => {
  const { data: profile, isFetching, error } = useProfileQuery();
  return (
    <div className="tw:flex tw:justify-between tw:items-center tw:py-6 tw:border-b tw:border-gray-200">
      <div className="tw:flex tw:gap-2 tw:items-center">
        {profile?.avatar ? (
          <img src="" alt="" />
        ) : (
          <span className="tw:flex tw:w-12 tw:h-12 tw:justify-center tw:items-center tw:rounded-full tw:bg-[#359093] tw:text-white tw:text-3xl tw:font-medium">
            {profile?.name?.charAt(0).toUpperCase()}
          </span>
        )}

        <p className="tw:text-xl tw:mb-0">{profile?.name}</p>
      </div>

      <div>
        <Link
          href="/dashboard/notifications"
          className="tw:bg-[#35909350] tw:hover:bg-[#359093] tw:hover:text-white tw:text-black tw:p-3 tw:rounded-full tw:flex tw:justify-center tw:items-center"
        >
          <FaRegBell className="tw:text-xl" />
        </Link>
      </div>
    </div>
  );
};
export default Header;
