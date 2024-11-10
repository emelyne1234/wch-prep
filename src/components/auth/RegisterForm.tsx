"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useAddUsers } from "@/hooks/users/useRegister";
import Link from "next/link";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const { formData, handleSubmit, handleInputChanges, errors, isPending } =
    useAddUsers();

  const handleOAuthLogin = async (provider: string) => {
    setLoading(true);
    await signIn(provider, { callbackUrl: "/" });
    setLoading(false);
  };

  return (
    <main className="min-vh-100 d-flex justify-content-center align-items-center bg-light py-3">
      <div className="container">
        <div
          className="row shadow-lg rounded-4 bg-white mx-auto"
          style={{ maxWidth: "1000px" }}>
          {/* Left side - Image */}
          <div className="col-md-6 p-0 d-none d-md-block">
            <img
              src="/elephants 1.png"
              alt="Register illustration"
              className="w-100 h-100 object-fit-cover rounded-start-4"
              style={{ height: "100%" }}
            />
          </div>
          {/* Right side - Form */}
          <div className="col-md-6 p-2">
            <div className="card border-0">
              <div className="card-body">
                <h2 className="card-title text-center mb-4 fw-bold">
                  Create Account
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}>
                  <div className="form-group mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter your username"
                      aria-label="Username"
                      value={formData.username}
                      onChange={handleInputChanges}
                      required
                    />
                    {errors.username && (
                      <div className="text-danger">{errors.username}</div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleInputChanges}
                      aria-describedby="emailHelp"
                      aria-label="Email address"
                      required
                    />
                    {errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      aria-label="Password"
                      value={formData.password}
                      onChange={handleInputChanges}
                      required
                    />
                    {errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isPending}>
                    {isPending ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Register"
                    )}
                  </button>
                </form>
                <Link
                  href="/login"
                  className="d-block text-center text-decoration-none mt-3 text-muted">
                  Already have an account?{" "}
                  <span className="text-primary">Sign In</span>
                </Link>
                <hr className="my-4" />
                <div className="d-flex flex-column gap-3">
                  <button
                    className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center py-2"
                    onClick={() => handleOAuthLogin("google")}>
                    <FcGoogle className="me-2 fs-5" />
                    Sign in with Google
                  </button>
                  <button
                    className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center py-2"
                    onClick={() => handleOAuthLogin("github")}>
                    <IoLogoGithub className="me-2 fs-5" />
                    Sign in with GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
