import Login from "@/components/login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/dashboard");
  }

  return <Login />;
}
