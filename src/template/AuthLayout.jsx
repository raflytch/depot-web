import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import imgLogin from "../assets/img/bgLogin.jpg"; // Import gambar latar belakang
import { jwtDecode } from "jwt-decode";
import { AuthDispatchContext } from "../contexts/AuthContext.jsx"; // Impor yang benar
import AOS from "aos";
import "aos/dist/aos.css";

const AuthLayout = ({ mode }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(""); // State untuk nama
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useContext(AuthDispatchContext);

  const isRegisterMode = mode === "register";

  useEffect(() => {
    AOS.init({
      once: true, // Animasi hanya terjadi sekali
      duration: 800, // Durasi animasi (ms)
    });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URI + "auth/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Simpan token akses ke dalam cookies
        Cookies.set("access_token", data.access_token, { expires: 30 }); // Set cookie untuk kedaluwarsa dalam 30 hari

        // Decode token untuk mendapatkan peran (role) pengguna
        const decodedToken = jwtDecode(data.access_token);
        const userRole = decodedToken.role;

        dispatch({
          type: "logged-in",
          user: {
            nama: decodedToken.nama,
            email: decodedToken.email,
            role: userRole,
            token: data.access_token,
          },
        });

        // Tampilkan pesan sukses
        Swal.fire({
          icon: "success",
          title: "Login Berhasil",
          text: "Anda berhasil masuk ke akun Anda.",
        }).then(() => {
          // Arahkan ke route yang sesuai berdasarkan peran (role) pengguna
          if (userRole === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/products");
          }
        });
      } else {
        // Tampilkan pesan error
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: data.message || "Login gagal. Silakan coba lagi.",
        });
      }
    } catch (error) {
      console.error("Error saat login:", error);
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Terjadi kesalahan saat login. Silakan coba lagi.",
      });
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    // Validasi konfirmasi password
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: "Password dan konfirmasi password tidak cocok.",
      });
      return;
    }

    try {
      // Logika untuk proses registrasi
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle registration success
        Swal.fire({
          icon: "success",
          title: "Registrasi Berhasil",
          text: "Akun Anda berhasil didaftarkan.",
        }).then(() => {
          navigate("/login"); // Redirect to login page after successful registration
        });
      } else {
        // Handle registration failure
        Swal.fire({
          icon: "error",
          title: "Registrasi Gagal",
          text:
            data.message ||
            "Terjadi kesalahan saat registrasi. Silakan coba lagi.",
        });
      }
    } catch (error) {
      console.error("Error saat registrasi:", error);
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: "Terjadi kesalahan saat registrasi. Silakan coba lagi.",
      });
    }
  };

  return (
    <div
      className="hero min-h-screen w-full bg-cover bg-center flex items-center justify-center py-5"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${imgLogin})`,
      }}
      data-aos="fade-down" // Tambahkan atribut data-aos di sini
    >
      <div className="hero-content flex-col lg:flex-row-reverse gap-10 lg:gap-20 p-1 max-w-4xl w-full">
        <div className="text-center lg:text-left lg:flex-1 text-white">
          <h1 className="text-3xl lg:text-4xl font-bold">
            {isRegisterMode
              ? "Bergabung dengan Kami!"
              : "Selamat Datang Kembali!"}
          </h1>
          <p className="py-6 px-5 lg:px-0 text-lg leading-relaxed">
            {isRegisterMode
              ? "Daftar akun untuk mengakses produk dan layanan kami yang luar biasa. Nikmati navigasi yang mulus dan transaksi yang aman!"
              : "Masuk ke akun Anda untuk mengakses produk dan layanan kami yang luar biasa. Nikmati navigasi yang mulus dan transaksi yang aman!"}
          </p>
        </div>
        <div className="card w-fit max-w-sm shadow-2xl bg-base-100 bg-opacity-60 flex-1">
          <form
            className="card-body"
            onSubmit={isRegisterMode ? handleRegister : handleLogin}
          >
            {isRegisterMode && (
              <div className="form-control">
                <Label title="Nama" />
                <Input
                  type="text"
                  placeholder="Nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
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
              <Label title="Kata Sandi" />
              <Input
                type="password"
                placeholder="Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {!isRegisterMode && (
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover no-underline font-bold text-primary"
                  >
                    Lupa kata sandi?
                  </a>
                </label>
              )}
            </div>
            {isRegisterMode && (
              <div className="form-control">
                <Label title="Konfirmasi Kata Sandi" />
                <Input
                  type="password"
                  placeholder="Konfirmasi Kata Sandi"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="form-control mt-6">
              <Button text={isRegisterMode ? "Daftar" : "Masuk"} />
            </div>
            <div className="form-control mt-4 text-center">
              <p className="text-white">
                {!isRegisterMode ? "Belum punya akun? " : "Sudah punya akun? "}
                <Link
                  to={isRegisterMode ? "/login" : "/register"}
                  className="text-primary font-bold no-underline hover:underline"
                >
                  {isRegisterMode ? "Masuk di sini" : "Daftar di sini"}
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
