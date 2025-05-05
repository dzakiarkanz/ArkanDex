import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Ambil data pengguna dari localStorage

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user?.name || "N/A"}</p>
      <p>Email: {user?.email || "N/A"}</p>
    </div>
  );
};

export default Profile;