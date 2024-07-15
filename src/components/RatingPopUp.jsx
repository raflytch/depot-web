import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { IoMdClose } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";

const RatingPopup = ({ id }) => {
  const [rating, setRating] = useState(0);
  const [productId, setProductId] = useState();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 500 });

    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const productData = await response.json();
        setProductId(productData.id);
        setRating(productData.rating);
      } catch (error) {
        console.error("Error fetching product details:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal memuat detail produk. Silakan coba lagi nanti.",
          confirmButtonText: "Tutup",
        });
      }
    };

    fetchProductDetails();
  }, [paymentId, token]);

  const handleRatingClick = (selectedRating) => {
    fetch(`${import.meta.env.VITE_BACKEND_URI}products/${productId}/rate`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating: selectedRating }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Rating sent successfully:", data);
        setRating(data.newRating);
        // Hide popup
        document.getElementById("popup-modal").setAttribute("hidden", true);
        // Show Swal alert
        Swal.fire({
          icon: "success",
          title: "Terima kasih!",
          text: `Anda memberikan rating ${selectedRating} bintang.`,
          confirmButtonText: "Tutup",
        }).then(() => {
          // Navigate back to /products
          window.location.href = "/products";
        });
      })
      .catch((error) => {
        console.error("Error sending rating:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal mengirim rating. Silakan coba lagi nanti.",
          confirmButtonText: "Tutup",
        });
      });
  };

  return (
    <div
      id="popup-modal"
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      data-aos="zoom-in"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-sm w-full max-w-md p-4 md:p-5">
          <div className="relative">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={() =>
                document
                  .getElementById("popup-modal")
                  .setAttribute("hidden", true)
              }
            >
              <IoMdClose size={24} />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <FaInfoCircle size={32} className="mb-5 mx-auto text-primary" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Berikan Rating Produk
              </h3>
              <div className="flex justify-center space-x-2" data-aos="fade-up">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    color={star <= rating ? "#FFC94A" : "#D1D5DB"}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setRating(star)}
                    onMouseLeave={() => setRating(0)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingPopup;
