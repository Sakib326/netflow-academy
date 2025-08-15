"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Register user
      const res = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        phone,
      });

      const { token } = res.data;
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

      setSuccess("Registration successful!");
    } catch (err: any) {
      if (err.response?.data?.errors) {
        // Laravel validation errors
        const messages = Object.values(err.response.data.errors)
          .flat()
          .join(" ");
        setError(messages);
      } else {
        setError(err.response?.data?.message || "Registration failed");
      }
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      required
                    />
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}
                  <div className="form-group col-lg-12">
                    <button
                      className="bg_btn bt"
                      type="submit"
                      name="submit"
                      disabled={loading}
                    >
                      {loading ? "Signing up..." : "Signup now"}
                    </button>
                  </div>
                </form>
                <p>
                  Already have an account? <Link href="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
