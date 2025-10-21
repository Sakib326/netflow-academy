import { Suspense } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Loading from "@/components/common/Loading";
import ForgotPassword from "@/components/forgot-password";

const ForgotPasswordPage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/dashboard");
  }

  return (
    <Suspense fallback={<Loading />}>
      <ForgotPassword />
    </Suspense>
  );
};

export default ForgotPasswordPage;
