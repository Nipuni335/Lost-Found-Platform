import React, { useState } from "react";
import { createItem } from "../services/api";

function ReportLost() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    createItem({ ...form, type: "lost" })
      .then(() => alert("Lost item added"))
      .catch(() => alert("Error"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report Lost Item</h2>

      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <input type="date" name="date" onChange={handleChange} />
      <input name="contactName" placeholder="Name" onChange={handleChange} />
      <input name="contactEmail" placeholder="Email" onChange={handleChange} />
      <input name="contactPhone" placeholder="Phone" onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
  );
}

export default ReportLost;