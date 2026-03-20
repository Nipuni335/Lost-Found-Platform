import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>

            <div className="profile-header-text">
              <h2>{user?.name || "User"}</h2>
              <p>{user?.email || "No email available"}</p>
              <span className={`role-badge ${user?.role === "admin" ? "admin-role" : "user-role"}`}>
                {user?.role || "user"}
              </span>
            </div>
          </div>

          <div className="profile-info-grid">
            <div className="profile-info-box">
              <label>Full Name</label>
              <p>{user?.name || "-"}</p>
            </div>

            <div className="profile-info-box">
              <label>Email Address</label>
              <p>{user?.email || "-"}</p>
            </div>

            <div className="profile-info-box">
              <label>Phone Number</label>
              <p>{user?.phone || "-"}</p>
            </div>

            <div className="profile-info-box">
              <label>Account Type</label>
              <p>{user?.role || "user"}</p>
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/edit-profile" className="profile-btn primary-btn">
              Edit Profile
            </Link>

            <button onClick={handleLogout} className="profile-btn secondary-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;