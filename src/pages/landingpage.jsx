import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import HeroRight from "../components/HeroRight";
import img from "../assets/img/herorightpeople.png";
import img2 from "../assets/img/heroleftimg.jpg";
import Footer from "../components/Footer";
import HeroLeft from "../components/HeroLeft";
import Maps from "../components/Maps";
import FormContact from "../template/FormContact";
import logo from "../assets/img/logo.png";
import AOS from "aos";
import "aos/dist/aos.css";

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      once: true, // Hanya animasi satu kali saat scroll
      duration: 800, // Durasi animasi (ms)
    });
  }, []);

  return (
    <>
      <Navbar img={logo} />
      <section id="home" data-aos="fade-up">
        <Home />
      </section>
      <section id="heroRight" data-aos="fade-up">
        <HeroRight
          img={img}
          title={"Delapan Tahun Melayani dengan Dedikasi"}
          desc={
            "Selamat datang di Depot Anugrah! Sudah 8 tahun lamanya, kami telah hadir dengan komitmen yang teguh untuk melayani Anda dengan yang terbaik. Dari produk-produk bahan pokok hingga kebutuhan sehari-hari lainnya, kami selalu berusaha memberikan yang terbaik dalam kualitas dan pelayanan. Setiap kunjungan Anda di Depot Anugrah adalah kesempatan bagi kami untuk terus meningkatkan layanan dan memastikan kepuasan Anda. Terima kasih telah mempercayakan kebutuhan Anda kepada kami selama ini."
          }
        />
      </section>
      <section id="heroLeft" data-aos="fade-up">
        <HeroLeft
          img={img2}
          title={"Komitmen Terhadap Keberlanjutan"}
          desc={
            "Di Depot Anugrah, kami tidak hanya melayani dengan kualitas terbaik, tetapi juga dengan tanggung jawab terhadap lingkungan. Kami berkomitmen untuk menjaga keberlanjutan dengan memilih produk-produk yang ramah lingkungan dan mendukung praktik bisnis yang berkelanjutan. Dengan demikian, setiap kali Anda berbelanja di sini, Anda juga turut berkontribusi dalam menjaga kelestarian bumi untuk generasi mendatang."
          }
          bgColor={"bg-primary"}
        />
      </section>
      <section id="maps" data-aos="fade-up">
        <Maps />
      </section>
      <section id="contact" data-aos="fade-up">
        <FormContact />
      </section>
      <Footer img={logo} data />
    </>
  );
};

export default LandingPage;
