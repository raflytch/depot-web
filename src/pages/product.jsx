import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import logo from "../assets/img/logo.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import {kualitasAirMapper} from "../components/Barang.jsx";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URI + "products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data)
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal memuat produk. Silakan coba lagi nanti.",
          confirmButtonText: "Tutup",
        });
      }
    };

    fetchProducts();
  }, [token]);

  const goToHome = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar img={logo} />
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Galon Baru</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {products
            .filter((product) => product.category === "GALON_BARU")
            .map((product, index) => (
              <Card
                key={index}
                id={product.id}
                product={product.name}
                desc={product.description}
                price={product.price}
                img={product.imgUrl}
                kualitasAir={kualitasAirMapper(product.kualitasAir)}
                stock={product.stock}
                totalRating={product.totalRating}
                totalPurchases={product.totalPurchases}
              />
            ))}
        </div>
        <div className="text-center mt-12 mb-8">
          <h1 className="text-3xl font-bold">Galon Isi Ulang</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {products
            .filter((product) => product.category === "GALON_ISI_ULANG")
            .map((product, index) => (
              <Card
                key={index}
                id={product.id}
                product={product.name}
                desc={product.description}
                price={product.price}
                img={product.imgUrl}
                stock={product.stock}
                totalRating={product.totalRating}
                totalPurchases={product.totalPurchases}
              />
            ))}
        </div>
        <div className="text-center mt-12 mb-8">
          <h1 className="text-3xl font-bold">Refill Air Minum</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {products
            .filter((product) => product.category === "REFILL_AIR_MINUM")
            .map((product, index) => (
              <Card
                key={index}
                id={product.id}
                product={product.name}
                desc={product.description}
                price={product.price}
                img={product.imgUrl}
                stock={product.stock}
                totalRating={product.totalRating}
                totalPurchases={product.totalPurchases}
                category={product.category} // Pass the category to Card component
              />
            ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button onClick={goToHome} text="Kembali ke Beranda" />
        </div>
      </div>
      <Footer img={logo} />
    </>
  );
};

export default ProductPage;
