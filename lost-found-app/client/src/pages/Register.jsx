import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple validation
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users/register", form);
      alert("Registration successful!");

      // redirect to login
      window.location = "/login";

    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name *"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password *"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">Register</button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Register;