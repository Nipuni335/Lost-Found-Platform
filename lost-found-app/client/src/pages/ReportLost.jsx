import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { createItem } from "../services/api";

function ReportLost() {
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
    formData.append("type", "lost");
    if (image) formData.append("image", image);

    try {
      await createItem(formData);
      alert("Lost item reported successfully");
    } catch (error) {
      alert("Error submitting item");
    }
  };

  return (
    <>
      <Navbar />

      <div className="form-container">
        <form className="item-form" onSubmit={handleSubmit}>
          <h2>Report Lost Item</h2>

          <input type="text" name="title" placeholder="Item title" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} />
          <input type="text" name="location" placeholder="Location lost" onChange={handleChange} required />
          <input type="date" name="date" onChange={handleChange} />
          <input type="text" name="contactName" value={form.contactName} onChange={handleChange} required />
          <input type="email" name="contactEmail" value={form.contactEmail} onChange={handleChange} required />
          <input type="text" name="contactPhone" value={form.contactPhone} onChange={handleChange} />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <button type="submit" className="nav-btn">
            Submit Lost Item
          </button>
        </form>
      </div>
    </>
  );
}

export default ReportLost;