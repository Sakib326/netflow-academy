"use client";
import Link from "next/link";
import { FaRegBell } from "react-icons/fa";
import { useProfileQuery } from "@/redux/auth/authApi";

const Header = () => {
  const { data: user, isFetching } = useProfileQuery();
  return (
    <div className="tw:flex tw:justify-between tw:items-center tw:py-6 tw:border-b tw:border-gray-200">
      <div className="tw:flex tw:gap-2 tw:items-center">
        {user?.avatar_url ? (
          <img
            src={user?.avatar_url}
            alt={user?.name}
            className="tw:w-16 tw:h-16 tw:rounded-full tw:object-center tw:object-cover"
          />
        ) : (
          <span className="tw:flex tw:w-12 tw:h-12 tw:justify-center tw:items-center tw:rounded-full tw:bg-[#359093] tw:text-white tw:text-3xl tw:font-medium">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        )}

        <p className="tw:text-xl tw:mb-0">{user?.name}</p>
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
