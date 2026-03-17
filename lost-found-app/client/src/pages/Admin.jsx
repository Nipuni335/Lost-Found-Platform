import React, { useEffect, useState } from "react";
import { getItems } from "../services/api";
import axios from "axios";
import "../App.css";

function Admin() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    getItems().then(res => setItems(res.data));
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    alert("Deleted");
    loadItems();
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      {items.map(item => (
        <div className="card" key={item._id}>
          <h3>{item.title}</h3>
          <button onClick={() => deleteItem(item._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;