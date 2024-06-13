import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";

const AuthLayout = ({ type }) => {
  const isLogin = type === "login";
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="hero min-h-screen w-full bg-white flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10 lg:gap-20 p-1 max-w-4xl w-full">
        <div className="text-center lg:text-left lg:flex-1">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">
            {isLogin ? "Login" : "Register"}
          </h1>
          <p className="py-6">
            {isLogin
              ? "Silakan masukkan email dan kata sandi Anda untuk masuk."
              : "Silakan isi form berikut untuk membuat akun baru."}
          </p>
          <div className="mt-6 text-center lg:text-left">
            <Button onClick={handleBackToHome} text="Kembali ke Beranda" />
          </div>
        </div>
        <div className="card w-fit max-w-sm shadow-2xl bg-base-100 flex-1">
          <form className="card-body">
            {!isLogin && (
              <div className="form-control">
                <Label title="Nama Lengkap" />
                <Input type="text" placeholder="Nama Lengkap" required />
              </div>
            )}
            <div className="form-control">
              <Label title="Email" />
              <Input type="email" placeholder="Email" required />
            </div>
            <div className="form-control">
              <Label title="Password" />
              <Input type="password" placeholder="Password" required />
              {isLogin && (
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover no-underline font-bold text-primary"
                  >
                    Forgot password?
                  </a>
                </label>
              )}
            </div>
            <div className="form-control mt-6">
              <Button text={isLogin ? "Login" : "Register"} />
            </div>
            <div className="form-control mt-4 text-center">
              {isLogin ? (
                <p>
                  Anda tidak punya akun?{" "}
                  <Link
                    to="/register"
                    className="text-primary font-bold no-underline hover:underline"
                  >
                    Daftar
                  </Link>
                </p>
              ) : (
                <p>
                  Sudah punya akun?{" "}
                  <Link
                    to="/login"
                    className="text-primary font-bold no-underline hover:underline"
                  >
                    Masuk
                  </Link>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
