import { useState } from "react";
import axios from "axios";

function Login() {
  const [data, setData] = useState({});

  const login = async () => {
    const res = await axios.post("http://localhost:5000/api/users/login", data);

    localStorage.setItem("user", JSON.stringify(res.data));

    if(res.data.role === "admin"){
      window.location = "/admin";
    } else {
      window.location = "/";
    }
  };

  return (
    <div>
      <input placeholder="Email" onChange={e=>setData({...data,email:e.target.value})}/>
      <input placeholder="Password" onChange={e=>setData({...data,password:e.target.value})}/>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;