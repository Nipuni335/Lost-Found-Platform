import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getItems } from "../services/api";

function MyReports() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    fetchMyReports();
  }, []);

  const fetchMyReports = async () => {
    try {
      const res = await getItems();

      const myItems = res.data.filter(
        (item) => item.contactEmail === user?.email
      );

      const lost = myItems.filter((item) => item.type === "lost");
      const found = myItems.filter((item) => item.type === "found");

      setLostItems(lost);
      setFoundItems(found);
    } catch (error) {
      console.error(error);
      alert("Error loading my reports");
    }
  };

  const totalReports = lostItems.length + foundItems.length || 1;
  const lostWidth = (lostItems.length / totalReports) * 100;
  const foundWidth = (foundItems.length / totalReports) * 100;

  return (
    <>
      <Navbar />

      <div className="container">
        <h2 className="reports-main-title">My Reports Dashboard</h2>

        <div className="stats-grid">
          <div className="stat-box">
            <h3>Total Reports</h3>
            <p>{lostItems.length + foundItems.length}</p>
          </div>

          <div className="stat-box">
            <h3>Lost Reports</h3>
            <p>{lostItems.length}</p>
          </div>

          <div className="stat-box">
            <h3>Found Reports</h3>
            <p>{foundItems.length}</p>
          </div>
        </div>

        <div className="chart-card">
          <h3>Reports Overview</h3>

          <div className="chart-row">
            <div className="chart-label">
              <span>Lost Items</span>
              <span>{lostItems.length}</span>
            </div>
            <div className="chart-bar-bg">
              <div
                className="chart-bar lost-bar"
                style={{ width: `${lostWidth}%` }}
              ></div>
            </div>
          </div>

          <div className="chart-row">
            <div className="chart-label">
              <span>Found Items</span>
              <span>{foundItems.length}</span>
            </div>
            <div className="chart-bar-bg">
              <div
                className="chart-bar found-bar"
                style={{ width: `${foundWidth}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="admin-sections">
          <div className="admin-list-card">
            <h3>My Lost Items</h3>
            {lostItems.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {lostItems.map((item) => (
                    <tr key={item._id}>
                      <td>{item.title}</td>
                      <td>{item.location}</td>
                      <td>
                        {item.date
                          ? new Date(item.date).toLocaleDateString()
                          : "-"}
                      </td>
                      <td>
                        {item.image ? (
                          <a
                            href={`http://localhost:5000/${item.image}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View
                          </a>
                        ) : (
                          "No Image"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="empty-text">No lost items reported yet.</p>
            )}
          </div>

          <div className="admin-list-card">
            <h3>My Found Items</h3>
            {foundItems.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {foundItems.map((item) => (
                    <tr key={item._id}>
                      <td>{item.title}</td>
                      <td>{item.location}</td>
                      <td>
                        {item.date
                          ? new Date(item.date).toLocaleDateString()
                          : "-"}
                      </td>
                      <td>
                        {item.image ? (
                          <a
                            href={`http://localhost:5000/${item.image}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View
                          </a>
                        ) : (
                          "No Image"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="empty-text">No found items reported yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyReports;