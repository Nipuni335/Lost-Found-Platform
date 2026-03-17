import React, { useEffect, useState } from "react";
import { getItems } from "../services/api";

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems().then((res) => setItems(res.data));
  }, []);

  return (
    <div>
      <h1>Lost & Found Items</h1>

      {items.map((item) => (
        <div key={item._id}>
          <h3>{item.title}</h3>
          <p>{item.location}</p>
          <p>{item.type}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;