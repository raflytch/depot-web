import React from "react";
import TextArea from "../components/TextArea";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";

const FormContact = () => {
  return (
    <div className="hero min-h-screen bg-white py-10 lg:py-20">
      <div className="hero-content text-center flex flex-col">
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
          <form className="card-body">
            <div className="form-control">
              <Label title="Nama" />
              <Input type="text" placeholder="Masukkan nama anda" required />
            </div>
            <div className="form-control">
              <Label title="Email" />
              <Input type="email" placeholder="Masukkan email anda" required />
            </div>
            <div>
              <TextArea />
            </div>
            <div className="form-control mt-6">
              <Button text="Kirim" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormContact;
