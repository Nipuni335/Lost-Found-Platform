import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="navbar">

      {/* 🔹 LEFT SIDE */}
      <div className="navbar-left">
        <Link
          to={user?.role === "admin" ? "/admin-dashboard" : "/home"}
          className="portal-title"
        >
          🏠 Lost & Found Portal
        </Link>
      </div>
      

      {/* 🔹 RIGHT SIDE */}
      <div className="navbar-right">

        {/* 👤 USER NAV */}
        {user?.role === "user" && (
          <>
            
          </>
        )}

        {/* 👑 ADMIN NAV */}
       

        {/* 👤 PROFILE BADGE */}
        <Link to="/profile" className="profile-link">
          <div className="user-badge">
            <div className="user-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="user-name">{user?.name}</span>
          </div>
        </Link>

        {/* 🚪 LOGOUT */}
        <button onClick={logout} className="logout-btn">
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;