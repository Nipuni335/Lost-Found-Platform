import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import MyReports from "./pages/MyReports";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      {user && user.role !== "admin" && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={user && user.role === "student" ? <Home /> : <Navigate to="/" />}
        />

        <Route
          path="/lost"
          element={user && user.role === "student" ? <ReportLost /> : <Navigate to="/" />}
        />

        <Route
          path="/found"
          element={user && user.role === "student" ? <ReportFound /> : <Navigate to="/" />}
        />

        <Route
          path="/myreports"
          element={user && user.role === "student" ? <MyReports /> : <Navigate to="/" />}
        />

        <Route
          path="/profile"
          element={user && user.role === "student" ? <Profile /> : <Navigate to="/" />}
        />

        <Route
          path="/admin"
          element={user && user.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;