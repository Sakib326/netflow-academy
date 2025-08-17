import Link from "next/link";

const SettingHeader = () => {
  return (
    <div className="tw:border-b tw:py-2 tw:border-gray-200 tw:mb-6">
      <ul className="tw:flex tw:gap-8 tw:px-6">
        <li>
          <Link href="/dashboard/settings">Setting</Link>
        </li>
        <li>
          <Link href="/dashboard/settings/reset-password">Password</Link>
        </li>
      </ul>
    </div>
  );
};
export default SettingHeader;
