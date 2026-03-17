import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [items, setItems] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/items")
    .then(res=>setItems(res.data));
  },[]);

  const matchItems = items.filter(i => i.type === "lost");
  const unmatchItems = items.filter(i => i.type === "found");

  return (
    <div>
      <h2>Admin Panel</h2>

      <h3>Matching Items</h3>
      {matchItems.map(i=> <p key={i._id}>{i.title}</p>)}

      <h3>Unmatching Items</h3>
      {unmatchItems.map(i=> <p key={i._id}>{i.title}</p>)}
    </div>
  );
}

export default AdminDashboard;