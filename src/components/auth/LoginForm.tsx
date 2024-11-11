"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useLogin } from "@/hooks/users/useLogin";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const {
    formData,
    handleSubmission,
    handleLoginInputField,
    errors,
    isLoading,
  } = useLogin();

  const handleOAuthLogin = async (provider: string) => {
    setLoading(true);
    await signIn(provider, { redirect: true, callbackUrl: "/" });
    setLoading(false);
  };

  console.log("spinnerrr", loading)

  return (
    <main className="min-vh-100 d-flex justify-content-center align-items-center bg-light py-5">
      <div className="container">
        <div
          className="row shadow-lg rounded-4 bg-white mx-auto"
          style={{ maxWidth: "1000px" }}>
          {/* Left side - Image */}
          <div className="col-md-6 p-0 d-none d-md-block">
            <img
              src="/elephants 1.png"
              alt="Login illustration"
              className="w-100 h-100 object-fit-cover rounded-start-4"
              style={{ maxHeight: "600px", minHeight: "500px" }}
            />
          </div>
          {/* Right side - Form */}
          <div className="col-md-6 p-5">
            <div className="card border-0">
              <div className="card-body">
                <h2 className="card-title text-center mb-4 fw-bold">
                  Welcome Back!
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmission();
                  }}>
                  <div className="form-group mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={formData.username}
                      onChange={handleLoginInputField}
                      placeholder="Enter your username"
                      aria-label="Username"
                      required
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={formData.password}
                      onChange={handleLoginInputField}
                      placeholder="Password"
                      aria-label="Password"
                      required
                    />
                    {errors.general && (
                      <div className="text-danger mt-2">
                        {errors.general}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isLoading}>
                    {isLoading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>
                <Link
                  href="/register"
                  className="d-block text-center text-decoration-none mt-3 text-muted">
                  Don't have an account?{" "}
                  <span className="text-primary">Sign Up</span>
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
