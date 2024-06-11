import React from "react";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";

const LoginAdminPage = () => {
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
          <form className="card-body">
            <div className="form-control">
              <Label title="Email" />
              <Input type="email" placeholder="Email" required />
            </div>
            <div className="form-control">
              <Label title="Password" />
              <Input type="password" placeholder="Password" required />
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
