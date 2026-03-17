import React, { useEffect, useState } from "react";
import { getItems } from "../services/api";
import "../App.css";

function BrowseItems() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getItems().then(res => setItems(res.data));
  }, []);

  const filteredItems =
    filter === "all"
      ? items
      : items.filter(item => item.type === filter);

  return (
    <div className="container">
      <h2>Browse Items</h2>

      {/* Filter buttons */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("lost")}>Lost</button>
        <button onClick={() => setFilter("found")}>Found</button>
      </div>

      <div className="grid">
        {filteredItems.map(item => (
          <div className="card" key={item._id}>
            <span className={`badge ${item.type}`}>
              {item.type.toUpperCase()}
            </span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseItems;