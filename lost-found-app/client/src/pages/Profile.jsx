import "../App.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container">
      <div className="card">
        <h2>My Profile</h2>

        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
      </div>
    </div>
  );
}

export default Profile;
