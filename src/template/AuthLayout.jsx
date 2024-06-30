import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import { jwtDecode } from "jwt-decode";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save access token to cookies
        Cookies.set("access_token", data.access_token, { expires: 30 }); // Set cookie to expire in 30 days

        // Decode the token to get the role
        const decodedToken = jwtDecode(data.access_token);
        const userRole = decodedToken.role;

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in.",
        }).then(() => {
          // Navigate to appropriate dashboard based on role
          if (userRole === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/dashboard");
          }
        });
      } else {
        // Show error message
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message || "Login failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "An error occurred while logging in. Please try again.",
      });
    }
  };

  return (
    <div className="hero min-h-screen w-full bg-white flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10 lg:gap-20 p-1 max-w-4xl w-full">
        <div className="text-center lg:text-left lg:flex-1">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">Login</h1>
          <p className="py-6">Please enter your email and password to login.</p>
        </div>
        <div className="card w-fit max-w-sm shadow-2xl bg-base-100 flex-1">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <Label title="Email" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <Label title="Password" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover no-underline font-bold text-primary"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <Button text="Login" />
            </div>
            <div className="form-control mt-4 text-center">
              <p>
                Don't have an account yet?{" "}
                <Link
                  to="/register"
                  className="text-primary font-bold no-underline hover:underline"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
