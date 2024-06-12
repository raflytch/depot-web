import React from "react";

const Maps = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-3xl text-primary font-extrabold text-center tracking-tight leading-none md:text-5xl lg:text-6xl dark:text-white">
            Temukan Kami
          </h1>
          <p className="mb-8 text-lg font-normal text-black lg:text-md dark:text-gray-400 text-center">
            Kunjungi Depot Anugrah dengan mudah! Kami menyediakan peta
            interaktif dan panduan navigasi untuk membantu Anda menemukan lokasi
            kami. Klik di sini untuk melihat peta dan mendapatkan petunjuk arah
            langsung ke Depot Anugrah. Nikmati pelayanan terbaik serta produk
            berkualitas yang kami tawarkan. Selamat berbelanja di Depot Anugrah!
          </p>
        </div>
        <div className="w-full h-64 md:h-96 lg:h-auto rounded-lg shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.954766785569!2d106.83015617474986!3d-6.136779893850096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5ab86c2d3b9%3A0x9783b9d50552397a!2sAgen%20Galon%20Le%20Minerale%20Anugrah!5e0!3m2!1sen!2sid!4v1718091768669!5m2!1sen!2sid"
            className="w-full h-full rounded-lg"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Maps;
