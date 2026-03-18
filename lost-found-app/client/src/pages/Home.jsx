import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="home-wrapper">
      <div className="home-page">
        <div className="home-card">
          <h1 className="home-title">Welcome to Lost &amp; Found Portal</h1>
          <p className="home-subtitle">Choose an action below</p>

          <div className="home-actions">
            <Link to="/lost" className="home-action-card lost-card">
              <div className="home-action-icon">🔍</div>
              <div className="home-action-text">Report Lost Item</div>
            </Link>

            <Link to="/found" className="home-action-card found-card">
              <div className="home-action-icon">🤝</div>
              <div className="home-action-text">Report Found Item</div>
            </Link>

            <Link to="/myreports" className="home-action-card reports-card">
              <div className="home-action-icon">📄</div>
              <div className="home-action-text">View My Reports</div>
            </Link>
          </div>

          {user && (
            <div className="home-user-text">
              Logged in as: <strong>{user.name}</strong>
            </div>
          )}
        </div>
      </div>

      <footer className="main-footer">
        © 2026 Lost &amp; Found System
      </footer>
    </div>
  );
}

export default Home;