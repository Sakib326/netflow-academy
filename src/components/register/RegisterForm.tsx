"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useRegisterMutation } from "@/redux/auth/authApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [register, { isLoading, isError, error, isSuccess }] =
    useRegisterMutation();
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      register(formData);
    } catch (err: any) {
      toast.error(`${err?.message} | "Register failed"`);
    }
  };

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
    if (isError) {
      toast.error(error.message);
    }

    if (isSuccess) {
      toast.success("Regester successfully");
      router.push("/dashboard");
    }
  }, [isSuccess, isError, token, router, error]);

  return (
    <>
      <section className="login_register section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-xs-12 wow fadeIn">
              <div className="register">
                <h4 className="login_register_title">Create a new account:</h4>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter Full Name"
                      id="fullname"
                      className="form-control"
                      name="name"
                      value={formData?.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      placeholder="Enter Phone"
                      id="phone"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email-address">Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter Email Address"
                      id="email-address"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cpwd">Password</label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      id="cpwd"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cpwd2">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      id="cpwd2"
                      className="form-control"
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group col-lg-12">
                    <button
                      className="bg_btn bt"
                      type="submit"
                      name="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Register..." : "Register"}
                    </button>
                  </div>
                </form>
                <p>
                  <small> Already have an account?</small>{" "}
                  <Link href="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
