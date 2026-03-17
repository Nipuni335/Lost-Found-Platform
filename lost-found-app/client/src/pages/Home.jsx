import React, { useEffect, useState } from "react";
import { getItems } from "../services/api";
import "../App.css";

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems().then(res => setItems(res.data.slice(0, 6)));
  }, []);

  return (
    <div className="container">
      <h2>Latest Lost & Found Items</h2>

      <div className="grid">
        {items.map(item => (
          <div className="card" key={item._id}>
            <span className={`badge ${item.type}`}>
              {item.type.toUpperCase()}
            </span>
            <h3>{item.title}</h3>
            <p>{item.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;