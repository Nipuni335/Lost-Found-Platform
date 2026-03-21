import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
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
    return new Date(date).toLocaleDateString();
  };

  const handleInformUser = async (lostItemId, foundItemId) => {
    try {
      await informUserMatch({ lostItemId, foundItemId });
      alert("User informed successfully");
      fetchAdminData();
    } catch (error) {
      console.error(error);
      alert("Error informing user");
    }
  };

  const handleRemoveMatch = async (lostItemId, foundItemId) => {
    try {
      await removeAdminMatch({ lostItemId, foundItemId });
      alert("Match removed successfully");
      fetchAdminData();
    } catch (error) {
      console.error(error);
      alert("Error removing match");
    }
  };

  const handleRemoveSingleItem = async (item) => {
    try {
      await removeAdminMatch({
        lostItemId: item._id,
        foundItemId: item._id
      });
      alert("Item removed successfully");
      fetchAdminData();
    } catch (error) {
      console.error(error);
      alert("Error removing item");
    }
  };

  const totalItems = matched.length + unmatched.length;
  const totalMatchedPairs = matched.length;
  const totalUnmatchedItems = unmatched.length;

  if (loading) {
    return (
      <div className="admin-page">
        <Navbar />
        <div className="admin-dashboard-container">
          <h2 className="dashboard-main-title">Admin Dashboard</h2>
          <p className="dashboard-empty-text">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <Navbar />

      <div className="admin-dashboard-container">
        <h2 className="dashboard-main-title">Admin Dashboard</h2>

        <div className="admin-summary-grid">
          <div className="admin-summary-card">
            <h3>Total Review Items</h3>
            <p>{totalItems}</p>
          </div>

          <div className="admin-summary-card">
            <h3>Matched Pairs</h3>
            <p>{totalMatchedPairs}</p>
          </div>

          <div className="admin-summary-card">
            <h3>Unmatched Items</h3>
            <p>{totalUnmatchedItems}</p>
          </div>
        </div>

        <div className="admin-panel-card">
          <h3 className="dashboard-section-title">Matched Items</h3>

          {matched.length === 0 ? (
            <p className="dashboard-empty-text">No matched items found.</p>
          ) : (
            <div className="dashboard-table-wrapper">
              <table className="dashboard-table">
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
                  {matched.map((match, index) => (
                    <tr key={index}>
                      <td>
                        {match.lostItem.image ? (
                          <a
                            href={`http://localhost:5000/${match.lostItem.image}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view-link"
                          >
                            View
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td>
                        {match.foundItem.image ? (
                          <a
                            href={`http://localhost:5000/${match.foundItem.image}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view-link"
                          >
                            View
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td>{match.lostItem.title}</td>

                      <td>{match.foundItem.location}</td>

                      <td>
                        <span className="score-badge">{match.matchScore}</span>
                      </td>

                      <td>{match.lostItem.contactName}</td>

                      <td>{match.lostItem.contactEmail}</td>

                      <td>{formatDate(match.foundItem.date)}</td>

                      <td>
                        <div className="dashboard-action-group">
                          <button
                            className="dashboard-btn inform-user-btn"
                            onClick={() =>
                              handleInformUser(
                                match.lostItem._id,
                                match.foundItem._id
                              )
                            }
                          >
                            Inform User
                          </button>

                          <button
                            className="dashboard-btn remove-item-btn"
                            onClick={() =>
                              handleRemoveMatch(
                                match.lostItem._id,
                                match.foundItem._id
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="admin-panel-card">
          <h3 className="dashboard-section-title">
            Unmatched Items (Needs Review)
          </h3>

          {unmatched.length === 0 ? (
            <p className="dashboard-empty-text">No unmatched items found.</p>
          ) : (
            <div className="dashboard-table-wrapper">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Reported By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {unmatched.map((item) => (
                    <tr key={item._id}>
                      <td>
                        {item.type === "lost" ? (
                          <span className="badge-lost">Lost</span>
                        ) : (
                          <span className="badge-found">Found</span>
                        )}
                      </td>

                      <td>
                        {item.image ? (
                          <a
                            href={`http://localhost:5000/${item.image}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view-link"
                          >
                            View
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td>{item.title}</td>

                      <td>{item.location}</td>

                      <td>{formatDate(item.date)}</td>

                      <td>
                        <strong>{item.contactName}</strong>
                        <br />
                        {item.contactEmail}
                      </td>

                      <td>
                        <div className="dashboard-action-group">
                          <button
                            className="dashboard-btn remove-item-btn"
                            onClick={() => handleRemoveSingleItem(item)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;