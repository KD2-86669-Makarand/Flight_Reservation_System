import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Get the response body
      const data = await response.json();

      // Log the API response for debugging
      console.log("API Response:", data);

      if (response.ok) {
        toast.success("Login successful!");

        // Store user data in localStorage
        localStorage.setItem("token", data.body.token); // Token from the body
        localStorage.setItem("user", JSON.stringify(data.body.user)); // User data from the body

        sessionStorage.setItem("email", email);

        // Extract role and redirect accordingly
        if (data.body.user.role === "ROLE_ADMIN") {
          navigate("/AdminHome"); // Redirect Admin
        } else {
          navigate("/"); // Redirect Normal User
        }
      } else {
        toast.error(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded" style={{ width: "400px" }}>
        <div className="text-center mb-4">
          <h4 className="fw-bold">Airline Reservation</h4>
          <h3 className="fw-bold">Login</h3>
          <p className="text-muted">Access your account</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold mt-3"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Don't have an account?
            <Link to="/register"> Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
