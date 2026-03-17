import React, { useEffect, useState } from "react";
import { getItems } from "../services/api";

function BrowseItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems().then((res) => setItems(res.data));
  }, []);

  return (
    <div>
      <h2>Browse Items</h2>

      {items.map((item) => (
        <div key={item._id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>{item.location}</p>
        </div>
      ))}
    </div>
  );
}

export default BrowseItems;