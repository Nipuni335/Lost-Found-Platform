import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/api/users/login", form)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));

        if (res.data.role === "admin") {
          window.location = "/admin";
        } else {
          window.location = "/home";
        }
      })
      .catch(() => alert("Invalid credentials"));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
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
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;