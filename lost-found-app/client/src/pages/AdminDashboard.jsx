import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [matched, setMatched] = useState([]);
  const [unmatched, setUnmatched] = useState([]);

  const admin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    if (!admin) {
      alert("Please login as admin");
      window.location = "/admin-login";
      return;
    }

    axios.get("http://localhost:5000/api/admin/matches")
      .then((res) => {
        setMatched(res.data.matched);
        setUnmatched(res.data.unmatched);
      })
      .catch(() => alert("Error loading admin data"));
  }, [admin]);

  const sendEmail = async (email, title) => {
    try {
      await axios.post("http://localhost:5000/api/admin/send-email", {
        to: email,
        subject: "Matching Item Found",
        text: `A matching item was found for: ${title}`
      });

      alert("Email sent successfully");
    } catch (error) {
      alert("Failed to send email");
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <h3>Matching Items</h3>
      {matched.length === 0 ? (
        <p>No matching items found</p>
      ) : (
        matched.map((pair, index) => (
          <div className="card" key={index}>
            <h4>Lost Item</h4>
            <p>{pair.lost.title}</p>
            <p>{pair.lost.location}</p>
            <p>{pair.lost.contactEmail}</p>

            <h4>Found Item</h4>
            <p>{pair.found.title}</p>
            <p>{pair.found.location}</p>
            <p>{pair.found.contactEmail}</p>

            <button onClick={() => sendEmail(pair.lost.contactEmail, pair.lost.title)}>
              Send Email to Lost Item Student
            </button>

            <button onClick={() => sendEmail(pair.found.contactEmail, pair.found.title)}>
              Send Email to Found Item Student
            </button>
          </div>
        ))
      )}

      <h3>Unmatching Items</h3>
      {unmatched.length === 0 ? (
        <p>No unmatched items</p>
      ) : (
        unmatched.map((item) => (
          <div className="card" key={item._id}>
            <p>{item.title}</p>
            <p>{item.location}</p>
            <p>{item.type}</p>
            <p>{item.contactEmail}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;