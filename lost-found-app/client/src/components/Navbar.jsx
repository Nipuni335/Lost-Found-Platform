import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/lost">Report Lost</Link>
      <Link to="/found">Report Found</Link>
      <Link to="/browse">Browse</Link>
      <Link to="/admin">Admin</Link>
    </div>
  );
}

export default Navbar;