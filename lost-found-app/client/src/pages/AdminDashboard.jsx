import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import { getAdminDashboard, deleteItemApi } from "../services/api";

function AdminDashboard() {
  const [data, setData] = useState({
    totalItems: 0,
    lostCount: 0,
    foundCount: 0,
    items: []
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getAdminDashboard();
      setData(res.data);
    } catch (error) {
      console.error(error);
      alert("Error loading admin dashboard");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      await deleteItemApi(id);
      fetchDashboard();
    } catch (error) {
      alert("Error deleting item");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Admin Dashboard</h2>

        <div className="stats-grid">
          <div className="stat-box">
            <h3>Total Items</h3>
            <p>{data.totalItems}</p>
          </div>
          <div className="stat-box">
            <h3>Lost Items</h3>
            <p>{data.lostCount}</p>
          </div>
          <div className="stat-box">
            <h3>Found Items</h3>
            <p>{data.foundCount}</p>
          </div>
        </div>

        <h3 style={{ marginTop: "30px" }}>Manage All Posts</h3>
        <div className="card-grid">
          {data.items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              isAdmin={true}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;