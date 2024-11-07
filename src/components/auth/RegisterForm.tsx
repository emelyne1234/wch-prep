"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOAuthLogin = async (provider: string) => {
    setLoading(true);
    await signIn(provider, { redirect: true, callbackUrl: "/" });
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoading(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card register-card shadow-lg rounded-4 p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                aria-label="Username"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby="emailHelp"
                aria-label="Email address"
                required
              />
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
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Register"}
            </button>
          </form>
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
