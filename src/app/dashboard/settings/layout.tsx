import SettingHeader from "@/components/dashboard/Setting/SettingHeader";

type Props = {
  children: React.ReactNode;
};
const SettingLayout = ({ children }: Props) => {
  return (
    <>
      <h4 className="tw:w-xl tw:mb-4">Dashboard</h4>
      <SettingHeader />
      {children}
    </>
  );
};
export default SettingLayout;
