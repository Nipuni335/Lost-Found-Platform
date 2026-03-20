import React from "react";
import { Link } from "react-router-dom";

function ItemCard({ item, onDelete, isAdmin }) {
  return (
    <div className="card">
      {item.image ? (
        <img
          src={`http://localhost:5000/${item.image}`}
          alt={item.title}
          className="card-image"
        />
      ) : (
        <div className="no-image">No Image</div>
      )}

      <h3>{item.title}</h3>
      <p><strong>Type:</strong> {item.type}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <p><strong>Date:</strong> {item.date ? new Date(item.date).toLocaleDateString() : "-"}</p>

      <div className="card-actions">
        <Link to={`/item/${item._id}`} className="details-btn">View Details</Link>
        {isAdmin && (
          <button onClick={() => onDelete(item._id)} className="delete-btn">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemCard;