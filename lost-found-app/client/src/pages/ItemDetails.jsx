import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../services/api";

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    getItem(id).then((res) => setItem(res.data));
  }, [id]);

  return (
    <div>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>{item.location}</p>
      <p>{item.contactName}</p>
      <p>{item.contactEmail}</p>
      <p>{item.contactPhone}</p>
    </div>
  );
}

export default ItemDetails;