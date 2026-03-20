import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import { getItems } from "../services/api";

function MyReports() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [myItems, setMyItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await getItems();
      const filtered = res.data.filter(
        (item) => item.contactEmail === user?.email
      );
      setMyItems(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>My Reports</h2>
        <div className="card-grid">
          {myItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MyReports;