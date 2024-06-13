import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../utils/product";
import Card from "../components/Card";
import logo from "../assets/img/logo.png";
import Button from "../components/Button"; // Import Button component
import { useNavigate } from "react-router-dom";

// Impor semua gambar produk
import GalonAqua from "../assets/img/galonaqua.png";
import GalonOasis from "../assets/img/galonoasis.jpg";
import GalonPristine from "../assets/img/galonpristine.jpeg";
import GalonAmidis from "../assets/img/galonamidis.jpeg";
import GalonVit from "../assets/img/galonvit.jpeg";
import GalonIsiUlang from "../assets/img/galonisiulang.jpg";
import RefillBotol from "../assets/img/refillulang.jpg";

// Objek yang mengaitkan produk dengan gambar yang sesuai
const productImages = {
  Aqua: GalonAqua,
  Oasis: GalonOasis,
  Pristine: GalonPristine,
  Amidis: GalonAmidis,
  Vit: GalonVit,
  "Isi Ulang - RO": GalonIsiUlang,
  "Isi Ulang - Biasa": GalonIsiUlang,
  "Air Minum - 500ml": RefillBotol,
  "Air Minum - 1L": RefillBotol,
};

const ProductPage = () => {
  // Memisahkan produk berdasarkan kategori
  const newGallons = products.filter(
    (product) =>
      product.product === "Aqua" ||
      product.product === "Oasis" ||
      product.product === "Pristine" ||
      product.product === "Amidis" ||
      product.product === "Vit"
  );

  const refillGallons = products.filter(
    (product) =>
      product.product === "Isi Ulang - RO" ||
      product.product === "Isi Ulang - Biasa"
  );

  const refillWater = products.filter(
    (product) =>
      product.product === "Air Minum - 500ml" ||
      product.product === "Air Minum - 1L"
  );

  const navigate = useNavigate(); // Initialize useNavigate

  // Function untuk menavigasi kembali ke halaman Beranda
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
          {newGallons.map((product, index) => (
            <Card
              key={index}
              product={product.product}
              desc={product.desc}
              price={product.price}
              img={productImages[product.product]} // Memanggil objek productImages untuk mendapatkan gambar sesuai dengan nama produk
            />
          ))}
        </div>
        <div className="text-center mt-12 mb-8">
          <h1 className="text-3xl font-bold">Galon Isi Ulang</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {refillGallons.map((product, index) => (
            <Card
              key={index}
              product={product.product}
              desc={product.desc}
              price={product.price}
              img={productImages[product.product]} // Memanggil objek productImages untuk mendapatkan gambar sesuai dengan nama produk
            />
          ))}
        </div>
        <div className="text-center mt-12 mb-8">
          <h1 className="text-3xl font-bold">Refill Air Minum</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {refillWater.map((product, index) => (
            <Card
              key={index}
              product={product.product}
              desc={product.desc}
              price={product.price}
              img={productImages[product.product]} // Memanggil objek productImages untuk mendapatkan gambar sesuai dengan nama produk
            />
          ))}
        </div>
        {/* Tombol "Kembali ke Beranda" menggunakan komponen Button */}
        <div className="flex justify-center mt-8">
          <Button onClick={goToHome} text="Kembali ke Beranda" />
        </div>
      </div>
      <Footer img={logo} />
    </>
  );
};

export default ProductPage;
