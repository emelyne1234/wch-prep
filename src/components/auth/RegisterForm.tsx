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

  const {
    formData,
    handleSubmit,
    handleInputChanges,
    errors,
    isPending
  } = useAddUsers();

  const handleOAuthLogin = async (provider: string) => {
    setLoading(true);
    await signIn(provider, { callbackUrl: "/" });
    setLoading(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card register-card shadow-lg rounded-4 p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Register</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label">Username</label>
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
              {errors.username && <div className="text-danger">{errors.username}</div>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
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
              {errors.email && <div className="text-danger">{errors.email}</div>}
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password" className="form-label">Password</label>
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
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={isPending}>
              {isPending ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Register"}
            </button>
          </form>
          <Link href="/login" className="">Already have an account? SignIn</Link>
          <hr className="my-4" />
          <div className="d-flex flex-column align-items-center gap-2">
            <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center" onClick={() => handleOAuthLogin("google")}>
              <FcGoogle className="me-2" />
              Sign in with Google
            </button>
            <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center" onClick={() => handleOAuthLogin("github")}>
              <IoLogoGithub className="me-2" />
              Sign in with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
