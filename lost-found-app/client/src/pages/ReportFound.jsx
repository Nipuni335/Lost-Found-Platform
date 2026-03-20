import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { createItem } from "../services/api";

function ReportFound() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    contactName: user?.name || "",
    contactEmail: user?.email || "",
    contactPhone: user?.phone || ""
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    formData.append("type", "found"); // 🔥 IMPORTANT
    if (image) formData.append("image", image);

    try {
      await createItem(formData);
      alert("Found item reported successfully");

      // reset form
      setForm({
        title: "",
        description: "",
        location: "",
        date: "",
        contactName: user?.name || "",
        contactEmail: user?.email || "",
        contactPhone: user?.phone || ""
      });
      setImage(null);

    } catch (error) {
      alert("Error submitting item");
    }
  };

  return (
    <>
      <Navbar />

      <div className="form-container">
        <form className="item-form" onSubmit={handleSubmit}>
          <h2>Report Found Item</h2>

          <input
            type="text"
            name="title"
            placeholder="Item title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location found"
            value={form.location}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <input
            type="text"
            name="contactName"
            value={form.contactName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="contactEmail"
            value={form.contactEmail}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="contactPhone"
            value={form.contactPhone}
            onChange={handleChange}
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit" className="nav-btn">
            Submit Found Item
          </button>
        </form>
      </div>
    </>
  );
}

export default ReportFound;