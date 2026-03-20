import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getItemById } from "../services/api";

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const res = await getItemById(id);
      setItem(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!item) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>{item.title}</h2>

        {item.image && (
          <img
            src={`http://localhost:5000/${item.image}`}
            alt={item.title}
            style={{ width: "300px", borderRadius: "10px", marginBottom: "20px" }}
          />
        )}

        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Type:</strong> {item.type}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Date:</strong> {item.date ? new Date(item.date).toLocaleDateString() : "-"}</p>
        <p><strong>Contact Name:</strong> {item.contactName}</p>
        <p><strong>Email:</strong> {item.contactEmail}</p>
        <p><strong>Phone:</strong> {item.contactPhone}</p>
      </div>
    </>
  );
}

export default ItemDetails;