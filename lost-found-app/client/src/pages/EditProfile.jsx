import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function EditProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/update/${user._id}`,
        form
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Profile updated successfully");
      window.location = "/profile";
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Edit Profile</h2>

      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Enter phone"
          value={form.phone}
          onChange={handleChange}
        />

        <button type="submit" className="profile-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;