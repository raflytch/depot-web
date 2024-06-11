import React from "react";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import HeroRight from "../components/HeroRight";
import img from "../assets/img/herorightpeople.png";
import img2 from "../assets/img/heroleftimg.jpg";
import Footer from "../components/Footer";
import HeroLeft from "../components/HeroLeft";
import Maps from "../components/Maps";
import FormContact from "../template/FormContact";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Home />
      <HeroRight
        img={img}
        title={"Delapan Tahun Melayani dengan Dedikasi"}
        desc={
          "Selamat datang di Depot Anugrah! Sudah 8 tahun lamanya, kami telah hadir dengan komitmen yang teguh untuk melayani Anda dengan yang terbaik. Dari produk-produk bahan pokok hingga kebutuhan sehari-hari lainnya, kami selalu berusaha memberikan yang terbaik dalam kualitas dan pelayanan. Setiap kunjungan Anda di Depot Anugrah adalah kesempatan bagi kami untuk terus meningkatkan layanan dan memastikan kepuasan Anda. Terima kasih telah mempercayakan kebutuhan Anda kepada kami selama ini."
        }
      />
      <HeroLeft
        img={img2}
        title={"Komitmen Terhadap Keberlanjutan"}
        desc={
          "Di Depot Anugrah, kami tidak hanya melayani dengan kualitas terbaik, tetapi juga dengan tanggung jawab terhadap lingkungan. Kami berkomitmen untuk menjaga keberlanjutan dengan memilih produk-produk yang ramah lingkungan dan mendukung praktik bisnis yang berkelanjutan. Dengan demikian, setiap pembelian Anda di Depot Anugrah tidak hanya mendukung kebutuhan sehari-hari Anda, tetapi juga membantu menjaga kelestarian lingkungan."
        }
        bgColor={"bg-primary"}
      />
      <Maps />
      <FormContact />
      <Footer />
    </>
  );
};

export default LandingPage;
