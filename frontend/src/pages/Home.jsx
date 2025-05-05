import React from "react";
import styles from "../assets/styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1>Selamat Datang di <span className={styles.brand}>ArkanDex</span></h1>
        <p>Platform Jual Beli Crypto Cepat dan Aman</p>
      </header>
      <div className={styles.content}>
        <img
          src="/assets/bitcoin-icon.png" // Ganti dengan path ikon Bitcoin
          alt="Bitcoin Icon"
          className={styles.icon}
        />
      </div>
      <footer className={styles.footer}>
        © 2023 ArkanDex, Hak Cipta Dilindungi
      </footer>
    </div>
  );
};

export default Home;