import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>

      <div className="profile-avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>

      <div className="profile-info">
        <div className="profile-row">
          <span className="profile-label">Name</span>
          <span className="profile-value">{user.name}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Email</span>
          <span className="profile-value">{user.email}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Phone</span>
          <span className="profile-value">{user.phone}</span>
        </div>
      </div>

      <Link to="/edit-profile">
        <button className="profile-btn">Edit Profile</button>
      </Link>
    </div>
  );
}

export default Profile;