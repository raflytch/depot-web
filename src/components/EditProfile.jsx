import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { BsPencilSquare } from "react-icons/bs";
import { AuthContext, AuthDispatchContext } from "../contexts/AuthContext";

const EditProfile = () => {
  const { nama: initialName, alamat: initialAddress } = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);

  const [name, setName] = useState(initialName);
  const [address, setAddress] = useState(initialAddress);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    // For example, call an API to update the user's profile

    Swal.fire({
      icon: "success",
      title: "Profile updated!",
      text: "Your profile has been updated successfully.",
    });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const renderInputWithIcon = (placeholder, value, onChange, disabled) => (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={`w-full p-2 border border-gray-300 rounded ${
          disabled ? "bg-gray-100" : ""
        }`}
        placeholder={placeholder}
        disabled={disabled}
        required
      />
      {!disabled && (
        <BsPencilSquare className="absolute top-2 right-2 text-gray-500 cursor-pointer" />
      )}
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex justify-center mb-4">
        <div className="avatar online">
          <div className="w-16 rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="Avatar"
            />
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-5">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          {renderInputWithIcon(
            "Enter your name",
            name,
            handleNameChange,
            false
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          {renderInputWithIcon(
            "Enter your address",
            address,
            handleAddressChange,
            false
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
