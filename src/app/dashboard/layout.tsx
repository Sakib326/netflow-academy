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
    <div className="container">
      <Header />
      <div className="tw:grid tw:grid-cols-[300px_1fr]">
        <Sidebar />
        <div className="tw:p-6 tw:pr-0">{children}</div>
      </div>
    </div>
  );
};
export default DashboardLayout;
