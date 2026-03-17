import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="container">

      <h1>Lost & Found System</h1>

      <div style={{ marginTop: "30px" }}>
        <Link to="/lost">
          <button>Report Lost Item</button>
        </Link>

        <Link to="/found">
          <button>Report Found Item</button>
        </Link>

        <Link to="/myreports">
          <button>View My Reports</button>
        </Link>
      </div>

      <footer style={{ marginTop: "50px", textAlign: "center" }}>
        <p>© 2026 Lost & Found System</p>
      </footer>

    </div>
  );
}

export default Home;