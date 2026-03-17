import React, { useState } from "react";
import { createItem } from "../services/api";
import "../App.css";

function ReportFound() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    contactName: "",
    contactEmail: "",
    contactPhone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple validation
    if (!form.title || !form.location || !form.contactName) {
      alert("Please fill required fields");
      return;
    }

    try {
      await createItem({ ...form, type: "found" });
      alert("Found item added successfully!");

      // reset form
      setForm({
        title: "",
        description: "",
        location: "",
        date: "",
        contactName: "",
        contactEmail: "",
        contactPhone: ""
      });

    } catch (error) {
      alert("Error adding item");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 style={{ textAlign: "center" }}>Report Found Item</h2>

        <input name="title" value={form.title} placeholder="Title *" onChange={handleChange} />
        <input name="description" value={form.description} placeholder="Description" onChange={handleChange} />
        <input name="location" value={form.location} placeholder="Location *" onChange={handleChange} />
        <input type="date" name="date" value={form.date} onChange={handleChange} />

        <h4>Contact Details</h4>

        <input name="contactName" value={form.contactName} placeholder="Your Name *" onChange={handleChange} />
        <input name="contactEmail" value={form.contactEmail} placeholder="Email" onChange={handleChange} />
        <input name="contactPhone" value={form.contactPhone} placeholder="Phone" onChange={handleChange} />

        <button type="submit">Submit Found Item</button>
      </form>
    </div>
  );
}

export default ReportFound;