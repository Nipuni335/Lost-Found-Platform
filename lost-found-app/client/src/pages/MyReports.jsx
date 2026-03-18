import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function MyReports() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      alert("Please login first");
      window.location = "/";
      return;
    }

    axios
      .get("http://localhost:5000/api/items")
      .then((res) => {
        const myItems = res.data.filter(
          (item) => item.contactEmail === user?.email
        );

        const lost = myItems.filter((item) => item.type === "lost");
        const found = myItems.filter((item) => item.type === "found");

        setLostItems(lost);
        setFoundItems(found);
      })
      .catch((err) => {
        console.error(err);
        alert("Error loading data");
      });
  }, [user]);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>My Reports</h2>

      {/* Lost Reports */}
      <div className="report-section">
        <h3 className="report-title lost-heading">Lost Reports</h3>

        {lostItems.length === 0 ? (
          <p className="empty-text">No lost reports yet</p>
        ) : (
          lostItems.map((item) => (
            <div className="report-box" key={item._id}>
              <p><b>Item:</b> {item.title}</p>
              <p><b>Description:</b> {item.description}</p>
              <p><b>Location:</b> {item.location}</p>
              <p><b>Date:</b> {item.date}</p>
              <p><b>Type:</b> {item.type}</p>
            </div>
          ))
        )}
      </div>

      {/* Found Reports */}
      <div className="report-section">
        <h3 className="report-title found-heading">Found Reports</h3>

        {foundItems.length === 0 ? (
          <p className="empty-text">No found reports yet</p>
        ) : (
          foundItems.map((item) => (
            <div className="report-box" key={item._id}>
              <p><b>Item:</b> {item.title}</p>
              <p><b>Description:</b> {item.description}</p>
              <p><b>Location:</b> {item.location}</p>
              <p><b>Date:</b> {item.date}</p>
              <p><b>Type:</b> {item.type}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyReports;