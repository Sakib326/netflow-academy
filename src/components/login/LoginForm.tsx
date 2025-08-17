"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLoginMutation } from "@/redux/auth/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { isLoading, isError, isSuccess, error }] = useLoginMutation();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      login(formData);
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged in successfully");
      router.push("/dashboard");
    }
    if (isError && error) {
      if ("status" in error) {
        const errorData = error.data as any;
        toast.error(errorData?.message || `Error: ${error.status}`);
      } else if ("message" in error) {
        toast.error(error.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
    }
  }, [isError, isSuccess, router, error]);

  return (
    <>
      <section className="login_register section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-xs-12 wow fadeIn">
              <div className="login">
                <h4 className="login_register_title">
                  Already a member? Sign in:
                </h4>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="login-email">Email</label>
                    <input
                      type="email"
                      id="login-email"
                      placeholder="Enter Email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      id="login-password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-check mb-4">
                    <input
                      id="rpaword"
                      className="form-check-input"
                      type="checkbox"
                    />
                    <label className="form-check-label" htmlFor="rpaword">
                      Remember Password
                    </label>
                  </div>

                  <div className="form-group col-lg-12">
                    <button
                      className="bg_btn bt"
                      type="submit"
                      name="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </button>
                  </div>
                </form>
                <p>
                  Dont have an account?{" "}
                  <Link href="/register">Register Now</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
