import React from "react";

const Footer = ({ img }) => {
  return (
    <footer className="bg-white rounded-lg dark:bg-gray-900" data-aos="fade-up">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 text-center">
        <div className="flex flex-col items-center lg:flex-row justify-between">
          <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={img} className="h-12" alt="PKM Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Depot Anugrah
            </span>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a
                href="https://www.instagram.com/pkmpi_refillmy_gallonbottle?igsh=MXNwejd6cTc4dWY3bQ=="
                className="hover:underline me-4 md:me-6"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/pkmpi_refillmy_gallonbottle?igsh=MXNwejd6cTc4dWY3bQ=="
                className="hover:underline me-4 md:me-6"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/pkmpi_refillmy_gallonbottle?igsh=MXNwejd6cTc4dWY3bQ=="
                className="hover:underline"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a
            href="https://www.instagram.com/pkmpi_refillmy_gallonbottle?igsh=MXNwejd6cTc4dWY3bQ=="
            className="hover:underline"
          >
            Refill My Gallon Bottle™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
