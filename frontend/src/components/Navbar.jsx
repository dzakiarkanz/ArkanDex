import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../assets/styles/Navbar.module.css";

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const [theme, setTheme] = useState("default");

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    document.documentElement.setAttribute("data-theme", e.target.value);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>ArkanDex</div>
      <ul className={styles.navLinks}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/exchange">Exchange</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
      <button
        onClick={toggleDarkMode}
        style={{
          marginLeft: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: darkMode ? "white" : "black",
          color: darkMode ? "black" : "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <button
        onClick={() => {
          if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("token"); // Hapus token
            window.location.href = "/login"; // Arahkan ke halaman login
          }
        }}
        style={{
          marginLeft: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
      <select onChange={handleThemeChange} value={theme} style={{ marginLeft: "1rem" }}>
        <option value="default">Default</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="purple">Purple</option>
      </select>
    </nav>
  );
};

export default Navbar;