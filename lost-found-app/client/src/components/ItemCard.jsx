import React from "react";

function ItemCard({item}) {
  return (
    <div className="card">
      <img src={`http://localhost:5000/${item.image}`} alt="" width="200"/>
      <h3>{item.title}</h3>
      <p>{item.location}</p>
      <p>{item.type}</p>
    </div>
  );
}

export default ItemCard;