import { useContext, useState, useEffect } from "react";
import Avatar from "./Avatar.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { BsPencilSquare } from "react-icons/bs";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";

const EditProfile = function () {
  const navigate = useNavigate();
  const { token, nama, email, alamat, dispatch } = useContext(AuthContext);
  const [inputName, setInputName] = useState(nama);
  const [inputAlamat, setInputAlamat] = useState(alamat);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    AOS.init({
      once: true, // Animasi hanya terjadi sekali
      duration: 800, // Durasi animasi (ms)
    });
  }, []);

  // Function to toggle editing mode
  const toggleEdit = () => {
    setEditable(!editable);
    setInputName(nama); // Reset inputName to current name
    setInputAlamat(alamat); // Reset inputAlamat to current alamat
  };

  // Function to handle save changes
  const handleSaveChanges = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nama: inputName, alamat: inputAlamat }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      // Update context or state if necessary
      dispatch({
        type: "update-profile",
        nama: inputName,
        alamat: inputAlamat,
      });

      // Show success message in Bahasa Indonesia
      Swal.fire({
        icon: "success",
        title: "Perubahan Tersimpan!",
        text: "Informasi profil Anda berhasil diperbarui.",
        confirmButtonText: "Oke",
      });

      // Exit editing mode
      setEditable(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal memperbarui profil. Silakan coba lagi nanti.",
        confirmButtonText: "Tutup",
      });
    }
  };

  // Function to handle navigate back to home
  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <main
      className="min-h-screen max-w-screen overflow-hidden bg-white py-6 px-10 flex flex-col gap-8 rounded-lg shadow-lg"
      data-aos="fade-down"
    >
      <div className="flex items-center mb-8">
        <button
          onClick={handleNavigateHome}
          className="bg-white text-primary px-3 py-2 rounded hover:bg-gray-200"
        >
          <IoMdArrowRoundBack size={24} />
        </button>
      </div>
      <h1 className="text-4xl text-primary font-bold">Profil Anda</h1>
      <Avatar className="scale-150 origin-top-left mb-14" />
      <div className="flex flex-row justify-between items-start gap-8">
        <div className="flex flex-col gap-5 w-full">
          <div className="h-16">
            <h2 className="text-lg text-primary font-bold">Nama</h2>
            {editable ? (
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="input bg-white border-2 border-primary rounded px-3 py-2 focus:outline-none focus:border-blue-600 w-full"
              />
            ) : (
              <h3 className="text-xl text-primary-content">{nama}</h3>
            )}
          </div>
          <div className="h-16">
            <h2 className="text-lg text-primary font-bold">Email</h2>
            <h3 className="text-xl text-primary-content">{email}</h3>
          </div>
          <div className="h-auto">
            <h2 className="text-lg text-primary font-bold">Alamat</h2>
            {editable ? (
              <textarea
                value={inputAlamat}
                onChange={(e) => setInputAlamat(e.target.value)}
                className="input bg-white border-2 border-primary rounded px-3 py-2 h-32 resize-none focus:outline-none focus:border-blue-600 w-full"
              />
            ) : (
              <h3 className="text-xl text-primary-content">{alamat}</h3>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end w-fit">
          <button
            onClick={toggleEdit}
            className="text-primary hover:text-blue-600"
          >
            <BsPencilSquare size={25} />
          </button>
        </div>
      </div>
      {editable && (
        <button
          onClick={handleSaveChanges}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 mt-8 transition-colors duration-300"
        >
          Simpan Perubahan
        </button>
      )}
    </main>
  );
};

export default EditProfile;
