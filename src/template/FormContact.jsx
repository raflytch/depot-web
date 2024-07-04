import React, { useState } from "react";
import Swal from "sweetalert2";
import TextArea from "../components/TextArea";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";

const FormContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Silakan lengkapi semua field yang diperlukan.",
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Format email tidak valid!",
      });
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "dc2e4177-f83f-4187-bb18-4941c8f5d552",
          subject: "New Submission from Web3Forms",
          ...formData,
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Pesan Anda telah terkirim.",
        });

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan. Silakan coba lagi nanti.",
      });
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="hero min-h-screen bg-white py-10 lg:py-20">
      <div className="hero-content p-0 text-center flex flex-col">
        <div className="max-w-md lg:max-w-3xl">
          <h1 className="text-5xl font-bold text-primary">Kontak</h1>
          <p className="py-6">
            Kami siap melayani kebutuhan air minum Anda! Jangan ragu untuk
            menghubungi kami jika Anda memiliki pertanyaan, membutuhkan
            informasi lebih lanjut, atau ingin melakukan pemesanan. Tim kami
            yang ramah dan profesional selalu siap membantu Anda.
          </p>
        </div>
        <div className="card w-full lg:w-4/6 shadow-2xl bg-base-100 flex-1">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <Label title="Nama" />
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama Anda"
                required
              />
            </div>
            <div className="form-control">
              <Label title="Email" />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Masukkan email Anda"
                required
              />
            </div>
            <div>
              <TextArea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Ketik pesan Anda di sini"
                required
              />
            </div>
            <div className="form-control mt-6">
              <Button text="Kirim" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormContact;
