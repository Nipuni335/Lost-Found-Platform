import React, { useEffect, useState } from "react";
import {
  getAdminMatches,
  informUserMatch,
  removeAdminMatch
} from "../services/api";

function AdminDashboard() {
  const [matched, setMatched] = useState([]);
  const [unmatched, setUnmatched] = useState([]);
  const [loading, setLoading] = useState(true);

  const admin = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!admin || admin.role !== "admin") {
      alert("Please login as admin");
      window.location = "/";
      return;
    }

    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const res = await getAdminMatches();
      setMatched(res.data.matched || []);
      setUnmatched(res.data.unmatched || []);
    } catch (error) {
      console.error(error);
      alert("Error loading admin data");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toISOString().split("T")[0];
  };

  const handleInform = async (lostItemId) => {
  try {
    await informUserMatch({ lostItemId });
    alert("User informed successfully");
    fetchAdminData();
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.msg || "Error informing user");
  }
};

  const handleRemove = async (lostItemId, foundItemId) => {
    try {
      await removeAdminMatch({ lostItemId, foundItemId });
      alert("Removed from current review");
      fetchAdminData();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Error removing match");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location = "/";
  };

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Loading...</h2>;
  }

  return (
    <div className="admin-page">
      <div className="admin-topbar">
        <h2>Admin Panel</h2>
        <button className="admin-logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="admin-content">
        <h1 className="admin-section-title">Matched Items Awaiting Approval</h1>

        <div className="admin-table-wrapper">
          <table className="admin-dashboard-table">
            <thead>
              <tr>
                <th>Lost Image</th>
                <th>Found Image</th>
                <th>Category</th>
                <th>Location</th>
                <th>Match Score</th>
                <th>Student</th>
                <th>Email</th>
                <th>Date Found</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {matched.length > 0 ? (
                matched.map((pair, index) => (
                  <tr key={index}>
                    <td>
                      {pair.lostItem.image ? (
                        <a
                          href={`http://localhost:5000/${pair.lostItem.image}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View
                        </a>
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td>
                      {pair.foundItem.image ? (
                        <a
                          href={`http://localhost:5000/${pair.foundItem.image}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View
                        </a>
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td>{pair.lostItem.title}</td>
                    <td>{pair.lostItem.location}</td>
                    <td>
                      <span className="match-score-badge">{pair.matchScore}</span>
                    </td>
                    <td>{pair.lostItem.contactName}</td>
                    <td>{pair.lostItem.contactEmail}</td>
                    <td>{formatDate(pair.foundItem.date)}</td>
                    <td>
                      <div className="action-btn-group">
                        <button
  className="inform-btn"
  onClick={() => handleInform(pair.lostItem._id)}
>
  📧 Inform User
</button>

                        <button
                          className="remove-btn"
                          onClick={() =>
                            handleRemove(pair.lostItem._id, pair.foundItem._id)
                          }
                        >
                          ❌ Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    No matched items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <h1 className="admin-section-title">Unmatched Items (Needs Review)</h1>

        <div className="admin-table-wrapper">
          <table className="admin-dashboard-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Image</th>
                <th>Category</th>
                <th>Location</th>
                <th>Date</th>
                <th>Reported By</th>
              </tr>
            </thead>

            <tbody>
              {unmatched.length > 0 ? (
                unmatched.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <span className={item.type === "lost" ? "lost-badge" : "found-badge"}>
                        {item.type}
                      </span>
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
                    <td>{item.title}</td>
                    <td>{item.location}</td>
                    <td>{formatDate(item.date)}</td>
                    <td>
                      {item.contactName}
                      <br />
                      {item.contactEmail}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No unmatched items
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;