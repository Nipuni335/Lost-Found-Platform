import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import { getItems } from "../services/api";

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await getItems();
      setItems(res.data.slice(0, 6));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Latest Lost & Found Items</h2>
        <div className="card-grid">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;