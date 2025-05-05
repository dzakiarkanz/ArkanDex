import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../assets/styles/Exchange.module.css";

const Exchange = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cryptoData, setCryptoData] = useState([]);
  const [page, setPage] = useState(1);
  const [crypto, setCrypto] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("buy");
  const [filterType, setFilterType] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: page,
          sparkline: false,
        },
      })
      .then((response) => {
        setCryptoData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching crypto data:", error);
        setLoading(false);
      });
  }, [page]);

  const filteredCryptoData = cryptoData.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTransactions = transactions.filter((transaction) =>
    filterType === "all" ? true : transaction.type === filterType
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!crypto) {
      alert("Please select a cryptocurrency.");
      return;
    }

    if (amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const newTransaction = {
      crypto,
      amount: parseFloat(amount),
      type: transactionType,
      date: new Date().toLocaleString(),
    };

    setTransactions([...transactions, newTransaction]);
    localStorage.setItem(
      "transactions",
      JSON.stringify([...transactions, newTransaction])
    );

    setCrypto("");
    setAmount("");
    setTransactionType("buy");
  };

  const clearTransactions = () => {
    axios
      .delete("http://localhost:5000/api/transactions")
      .then(() => {
        setTransactions([]);
        alert("All transactions have been cleared.");
      })
      .catch((error) => {
        console.error("Error clearing transactions:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.exchange}>
      <h2>Exchange Cryptocurrency</h2>
      <input
        type="text"
        placeholder="Search cryptocurrency..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Cryptocurrency"
          value={crypto}
          onChange={(e) => setCrypto(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={styles.input}
        />
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className={styles.select}
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
      <ul className={styles.cryptoList}>
        {cryptoData.map((coin) => (
          <li key={coin.id}>
            <span>{coin.name}: ${coin.current_price}</span>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      <h2>Transaction History</h2>
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className={styles.filterSelect}
      >
        <option value="all">All</option>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <ul className={styles.transactionList}>
        {filteredTransactions.map((transaction, index) => (
          <li key={index}>
            {transaction.date} - {transaction.type.toUpperCase()}{" "}
            {transaction.amount} {transaction.crypto}
          </li>
        ))}
      </ul>
      <button
        onClick={clearTransactions}
        className={styles.clearButton}
      >
        Clear Transaction History
      </button>
    </div>
  );
};

export default Exchange;