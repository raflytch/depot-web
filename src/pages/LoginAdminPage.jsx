import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";

const LoginAdminPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

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
      Cookies.set("access_token", data.access_token, { expires: 30 }); // Set cookie to expire in 1 day
      // Navigate to the admin dashboard
      navigate("/admin/dashboard");
    } else {
      // Handle login error
      alert(data.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="hero min-h-screen w-full bg-white flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10 lg:gap-20 p-1 max-w-4xl w-full">
        <div className="text-center lg:text-left lg:flex-1">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">
            Login Untuk Admin
          </h1>
          <p className="py-6">
            Selamat datang di halaman login admin. Silakan masukkan email dan
            kata sandi Anda untuk mengakses panel administrasi.
          </p>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdminPage;
