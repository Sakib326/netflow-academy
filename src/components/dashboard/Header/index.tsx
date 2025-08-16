"use client";

import { useProfileQuery } from "@/redux/auth/authApi";
import { FaRegBell } from "react-icons/fa";
import Link from "next/link";

const Header = () => {
  const { data: profile, isFetching, error } = useProfileQuery();
  return (
    <div className="tw:flex tw:justify-between tw:items-center tw:py-6 tw:border-b tw:border-gray-200">
      <div className="tw:flex tw:gap-2 tw:items-center">
        {profile?.avatar ? (
          <img src="" alt="" />
        ) : (
          <span className="tw:flex tw:w-20 tw:h-20 tw:justify-center tw:items-center tw:rounded-full tw:bg-[#359093] tw:text-white tw:text-5xl tw:font-medium">
            {profile?.name?.charAt(0).toUpperCase()}
          </span>
        )}
        <div>
          <p className="tw:text-xl">{profile?.name}</p>
        </div>
      </div>

      <div>
        <Link
          href="/dashboard/notifications"
          className="tw:bg-[#359093] tw:p-2 tw:rounded-full tw:flex tw:justify-center tw:items-center"
        >
          <FaRegBell className="tw:text-2xl" />
        </Link>
      </div>
    </div>
  );
};
export default Header;
