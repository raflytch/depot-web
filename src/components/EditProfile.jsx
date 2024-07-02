import { useContext, useState } from "react";
import Avatar from "./Avatar.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { BsPencilSquare } from "react-icons/bs";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const EditProfile = function () {
  const navigate = useNavigate();
  const { token, nama, email, alamat, dispatch } = useContext(AuthContext);
  const [inputName, setInputName] = useState(nama);
  const [inputAlamat, setInputAlamat] = useState(alamat);
  const [editable, setEditable] = useState(false);

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

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Changes Saved!",
        text: "Your profile information has been updated successfully.",
      });

      // Exit editing mode
      setEditable(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update profile. Please try again later.",
      });
    }
  };

  // Function to handle navigate back to home
  const handleNavigateHome = () => {
    navigate("/"); // Navigasi ke route "/"
  };

  return (
    <main className="min-h-screen max-w-screen overflow-hidden bg-white py-6 px-10 flex flex-col gap-8">
      <div className="flex items-center mb-8">
        <button
          onClick={handleNavigateHome}
          className="bg-gray-300 text-gray-800 px-3 py-2 rounded hover:bg-gray-400"
        >
          <IoMdArrowRoundBack size={24} />
        </button>
      </div>
      <h1 className="text-4xl text-primary font-bold ml-4">Your Profile</h1>
      <Avatar className="scale-[2] origin-top-left mb-14" />
      <div className="flex flex-row justify-between items-start gap-8">
        <div className="flex flex-col gap-5 w-full md:w-2/3">
          <div className="h-16">
            <h2 className="text-lg text-primary">Nama</h2>
            {editable ? (
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="input bg-white"
              />
            ) : (
              <h3 className="text-xl text-primary-content">{nama}</h3>
            )}
          </div>
          <div className="h-16">
            <h2 className="text-lg text-primary">Email</h2>
            <h3 className="text-xl text-primary-content">{email}</h3>
          </div>
          <div className="h-auto">
            <h2 className="text-lg text-primary">Alamat</h2>
            {editable ? (
              <textarea
                value={inputAlamat}
                onChange={(e) => setInputAlamat(e.target.value)}
                className="input bg-white h-32 resize-none"
              />
            ) : (
              <h3 className="text-xl text-primary-content">{alamat}</h3>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end w-full md:w-auto">
          <button onClick={toggleEdit}>
            <BsPencilSquare size={25} />
          </button>
        </div>
      </div>
      {editable && (
        <button
          onClick={handleSaveChanges}
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 mt-8"
        >
          Save Changes
        </button>
      )}
    </main>
  );
};

export default EditProfile;
