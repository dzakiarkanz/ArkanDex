import React from "react";
import styles from "../assets/styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2025 ArkanDex. All rights reserved.</p>
      <div className={styles.links}>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="mailto:support@arkandex.com">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;