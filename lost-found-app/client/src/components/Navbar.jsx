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
      <div className="navbar-left">
        <Link to={user?.role === "admin" ? "/admin-dashboard" : "/home"} className="portal-title">
          Lost & Found Portal
        </Link>
      </div>

      <div className="navbar-right">
        {user?.role === "admin" ? (
          <>
            <Link to="/admin-dashboard">Dashboard</Link>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/home">Home</Link>
            <Link to="/browse">Browse</Link>
            <Link to="/report-lost">Report Lost</Link>
            <Link to="/report-found">Report Found</Link>
            <Link to="/my-reports">My Reports</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;