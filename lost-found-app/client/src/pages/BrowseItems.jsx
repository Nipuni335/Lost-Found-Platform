import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import { getItems } from "../services/api";

function BrowseItems() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await getItems();
      setItems(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredItems =
    filter === "all" ? items : items.filter((item) => item.type === filter);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Browse Items</h2>

        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("lost")} style={{ marginLeft: "10px" }}>Lost</button>
          <button onClick={() => setFilter("found")} style={{ marginLeft: "10px" }}>Found</button>
        </div>

        <div className="card-grid">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default BrowseItems;