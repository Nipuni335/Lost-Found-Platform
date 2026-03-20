import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>My Profile</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Phone:</strong> {user?.phone}</p>
        <p><strong>Role:</strong> {user?.role}</p>

        <Link to="/edit-profile" className="details-btn">
          Edit Profile
        </Link>
      </div>
    </>
  );
}

export default Profile;