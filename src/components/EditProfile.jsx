import React, { useState } from "react";
import Swal from "sweetalert2";
import { BsPencilSquare } from "react-icons/bs";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "New password and confirmation password do not match.",
      });
      return;
    }

    // Handle the form submission logic here
    // For example, call an API to update the user's profile

    Swal.fire({
      icon: "success",
      title: "Profile updated!",
      text: "Your profile has been updated successfully.",
    });
  };

  const renderInputWithIcon = (placeholder, value, onChange, id) => (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        id={id}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder={placeholder}
        required
      />
      <BsPencilSquare className="absolute top-2 right-2 text-gray-500 cursor-pointer" />
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          {renderInputWithIcon(
            "Enter your name",
            name,
            (e) => setName(e.target.value),
            "name"
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="oldPassword">
            Old Password
          </label>
          {renderInputWithIcon(
            "Enter your old password",
            oldPassword,
            (e) => setOldPassword(e.target.value),
            "oldPassword"
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="newPassword">
            New Password
          </label>
          {renderInputWithIcon(
            "Enter your new password",
            newPassword,
            (e) => setNewPassword(e.target.value),
            "newPassword"
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm New Password
          </label>
          {renderInputWithIcon(
            "Confirm your new password",
            confirmPassword,
            (e) => setConfirmPassword(e.target.value),
            "confirmPassword"
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
