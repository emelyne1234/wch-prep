"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Header from "../Header";
import Footer from "../Footer";
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


  return (
    <>
      <Header />
      <main
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "calc(100vh - 136px)" }}>
        <div
          className="card login-card shadow-lg rounded-4 p-4"
          style={{ maxWidth: "500px", width: "100%" }}>
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Login</h2>
            <form onSubmit={(e) => {
              e.preventDefault()
              handleSubmission()
            }}>
              <div className="form-group mb-3">
                <label htmlFor="username" className="form-label">
                  username
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
                <small id="username" className="form-text text-muted">
                  We'll never share your username with anyone else.
                </small>
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
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}>
                {loading ? (
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
            <Link href="/register" className="">Do you have an account? SignUp</Link>
            <hr className="my-4" />
            <div className="d-flex flex-column align-items-center gap-2">
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                onClick={() => handleOAuthLogin("google")}>
                <FcGoogle className="me-2" />
                Sign in with Google
              </button>
              <button
                className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
                onClick={() => handleOAuthLogin("github")}>
                <IoLogoGithub className="me-2" />
                Sign in with GitHub
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
