import React from "react";
import homeImage from "../assets/img/home.jpg";

const Home = () => {
  return (
    <section
      className="bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${homeImage})`,
        backgroundBlendMode: "multiply",
        backgroundColor: "gray",
      }}
    >
      <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 className="mb-4 text-3xl font-bold tracking-tight leading-none text-white md:text-5xl lg:text-5xl">
          Melayani Masyarakat dengan Sepenuh Hati
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48 px-4 md:px-0">
          Selamat datang di Depot Anugrah! Kami menyediakan berbagai kebutuhan
          sehari-hari dengan kualitas tinggi dan harga terjangkau. Kepuasan Anda
          adalah kebanggaan kami.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 mx-7">
          <a
            href="#"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 hover:transition hover:duration-500"
          >
            Get started
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
