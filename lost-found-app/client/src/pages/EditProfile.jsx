import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { updateProfile } from "../services/api";

function EditProfile() {
  const savedUser = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: savedUser?.name || "",
    email: savedUser?.email || "",
    phone: savedUser?.phone || ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile(savedUser._id, form);

      const updatedUser = {
        ...savedUser,
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Profile updated successfully");
    } catch (error) {
      alert("Error updating profile");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Edit Profile</h2>
        <form className="item-form" onSubmit={handleSubmit}>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
          <input type="text" name="phone" value={form.phone} onChange={handleChange} />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </>
  );
}

export default EditProfile;