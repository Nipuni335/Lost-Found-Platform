import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <div className="home-container">
        <div className="home-card">
          <h2>Welcome to Lost & Found Portal</h2>
          <p>Choose an action below</p>

          {/* 🔴 Report Lost */}
          <div
            className="action-btn lost-btn"
            onClick={() => navigate("/report-lost")}
          >
            🔍
            <h3>Report Lost Item</h3>
          </div>

          {/* 🟠 Report Found */}
          <div
            className="action-btn found-btn"
            onClick={() => navigate("/report-found")}
          >
            🤝
            <h3>Report Found Item</h3>
          </div>

          {/* ⚪ My Reports */}
          <div
            className="action-btn report-btn"
            onClick={() => navigate("/my-reports")}
          >
            📄
            <h3>View My Reports</h3>
          </div>

          <p className="logged-user">
            Logged in as: <strong>{user?.name}</strong>
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;