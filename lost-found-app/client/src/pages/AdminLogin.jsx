import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminLogin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
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
      const res = await axios.post("http://localhost:5000/api/users/login", form);

      if (res.data.role !== "admin") {
        alert("Access denied. Admin only.");
        return;
      }

      localStorage.setItem("admin", JSON.stringify(res.data));
      window.location = "/admin";
    } catch (error) {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Admin Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Admin Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Go back to <Link to="/">User Login</Link>
        </p>
      </form>
    </div>
  );
}

export default AdminLogin;