import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    window.location = "/login";
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/lost">Report Lost</Link>
      <Link to="/found">Report Found</Link>
      <Link to="/myreports">My Reports</Link>

      {user && (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default Navbar;