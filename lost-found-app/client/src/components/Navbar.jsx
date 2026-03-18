import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/home" className="portal-title">
          <span className="home-icon">🏠</span>
          <span>Lost &amp; Found Portal</span>
        </Link>
      </div>

      <div className="navbar-right">
  {user && (
    <>
     <Link to="/profile" className="profile-link">
  <div className="user-badge">
    <div className="user-avatar">
      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
    </div>
    <span className="user-name">{user.name}</span>
  </div>
</Link>

      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </>
  )}
</div>
    </div>
  );
}

export default Navbar;