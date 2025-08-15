"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Login and get token
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      Cookies.set("token", token, {
        domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
      });
      // Get user details using token
      const userRes = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = userRes.data;
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                  {error && <div className="alert alert-danger">{error}</div>}

                  <div className="form-group col-lg-12">
                    <button
                      className="bg_btn bt"
                      type="submit"
                      name="submit"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "login"}
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
