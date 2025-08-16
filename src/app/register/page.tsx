import Register from "@/components/register";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/dashboard");
  }

  return <Register />;
}
