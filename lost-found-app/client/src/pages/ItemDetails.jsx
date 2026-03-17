import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../services/api";
import "../App.css";

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    getItem(id).then(res => setItem(res.data));
  }, [id]);

  return (
    <div className="container">
      <div className="card">
        <span className={`badge ${item.type}`}>
          {item.type}
        </span>

        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <p><b>Location:</b> {item.location}</p>

        <h4>Contact Info</h4>
        <p>{item.contactName}</p>
        <p>{item.contactEmail}</p>
        <p>{item.contactPhone}</p>
      </div>
    </div>
  );
}

export default ItemDetails;