import BottomBar from "@/components/dashboard/Discussions/BottomBar";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};
const DashboardLayout = async ({ children }: Props) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="container tw:top-0">
      <Header />
      <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-[220px_1fr]">
        <Sidebar />
        <div className="tw:md:p-6 tw:pr-0 tw:md:overflow-y-auto tw:md:h-[80vh]">
          {children}
        </div>
        <BottomBar />
      </div>
    </div>
  );
};
export default DashboardLayout;
