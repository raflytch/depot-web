import React, {useState, useEffect, useContext} from "react";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import {AuthContext} from "../contexts/AuthContext.jsx";

const RatingPopup = ({ paymentId }) => {
  const [rating, setRating] = useState(0);
  const [productId, setProductId] = useState();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with desired options
    // Fetching product details including current rating
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}payments/${paymentId}/product`,
            {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const productData = await response.json();
        setProductId(productData.id)
        setRating(productData.rating); // Set initial rating from fetched data
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
  }, [paymentId]);

  const handleRatingClick = (selectedRating) => {
    // Handle logic for sending rating to backend
    Swal.fire({
      icon: "success",
      title: "Terima kasih!",
      text: `Anda memberikan rating ${selectedRating} bintang.`,
    });

    // Example: You can send the rating to the backend here
    // Uncomment below lines when you integrate with actual backend
    // /*
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
        // Handle success response from backend
        console.log("Rating sent successfully:", data);
        setRating(data.newRating); // Update state with new rating from backend
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
    // */
  };

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      data-aos="zoom-in"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Berikan Rating Produk
            </h3>
            <div className="flex justify-center space-x-2" data-aos="fade-up">
              {" "}
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  color={star <= rating ? "#FFC94A" : "#D1D5DB"}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRatingClick(star)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingPopup;
