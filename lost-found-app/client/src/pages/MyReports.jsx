import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function MyReports() {
  const [items, setItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // 🔒 Check if user is logged in
    if (!user) {
      alert("Please login first");
      window.location = "/login";
      return;
    }

    // 📡 Fetch items
    axios.get("http://localhost:5000/api/items")
      .then(res => {
        // ✅ Safe filtering using optional chaining
        const myItems = res.data.filter(
          item => item.contactEmail === user?.email
        );
        setItems(myItems);
      })
      .catch(err => {
        console.error(err);
        alert("Error loading data");
      });

  }, [user]);

  return (
    <div className="container">
      <h2>My Reports</h2>

      {/* ✅ Show message if no data */}
      {items.length === 0 ? (
        <p>No reports yet</p>
      ) : (
        items.map(item => (
          <div className="card" key={item._id}>
            <h3>{item.title}</h3>
            <p><b>Description:</b> {item.description}</p>
            <p><b>Location:</b> {item.location}</p>
            <p><b>Date:</b> {item.date}</p>
            <p><b>Type:</b> {item.type}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyReports;