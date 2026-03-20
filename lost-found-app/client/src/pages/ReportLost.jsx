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
      <div className="container">
        <h2>Report Lost Item</h2>
        <form className="item-form" onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Item title" value={form.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <input type="text" name="location" placeholder="Location lost" value={form.location} onChange={handleChange} required />
          <input type="date" name="date" value={form.date} onChange={handleChange} />
          <input type="text" name="contactName" placeholder="Contact name" value={form.contactName} onChange={handleChange} required />
          <input type="email" name="contactEmail" placeholder="Contact email" value={form.contactEmail} onChange={handleChange} required />
          <input type="text" name="contactPhone" placeholder="Contact phone" value={form.contactPhone} onChange={handleChange} />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button type="submit">Submit Lost Item</button>
        </form>
      </div>
    </>
  );
}

export default ReportLost;