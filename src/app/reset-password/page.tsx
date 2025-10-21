import Loading from "@/components/common/Loading";
import ResetPassword from "@/components/reset-password";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/dashboard");
  }
  return (
    <Suspense fallback={<Loading />}>
      <ResetPassword />
    </Suspense>
  );
};

export default ResetPasswordPage;
