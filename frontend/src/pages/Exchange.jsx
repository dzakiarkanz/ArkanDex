import React, { useEffect, useState } from "react";
import axios from "axios";

const Exchange = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [crypto, setCrypto] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("buy");
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || []
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      })
      .then((response) => {
        setCryptoData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching crypto data:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!crypto || amount <= 0) {
      alert("Please enter valid data.");
      return;
    }

    const newTransaction = {
      crypto,
      amount: parseFloat(amount),
      type: transactionType,
      date: new Date().toLocaleString(),
    };

    axios
      .post("http://localhost:5000/api/transactions", newTransaction)
      .then((response) => {
        console.log(response.data);
        setTransactions([...transactions, newTransaction]);
      })
      .catch((error) => {
        console.error("Error saving transaction:", error);
      });

    setCrypto("");
    setAmount("");
    setTransactionType("buy");
  };

  const filteredCryptoData = cryptoData.filter((coin) =>
    coin.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="exchange-page">
      {/* Konten halaman */}
      <h1>Crypto Exchange</h1>
      <div>
        <input
          type="text"
          placeholder="Search cryptocurrency..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            marginBottom: "1rem",
            padding: "0.5rem",
            width: "100%",
            borderRadius: "4px",
          }}
        />
        <ul>
          {filteredCryptoData.map((coin) => (
            <li key={coin.id}>
              {coin.name}: ${coin.current_price}
            </li>
          ))}
        </ul>
      </div>

      <h2>Simulate Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Crypto:</label>
          <select
            value={crypto}
            onChange={(e) => setCrypto(e.target.value)}
            required
          >
            <option value="">Select Crypto</option>
            {cryptoData.map((coin) => (
              <option key={coin.id} value={coin.name}>
                {coin.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Transaction Type:</label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>

      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.date} - {transaction.type.toUpperCase()}{" "}
            {transaction.amount} {transaction.crypto}
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          setTransactions([]); // Kosongkan state transaksi
          localStorage.removeItem("transactions"); // Hapus dari localStorage
        }}
      >
        Clear Transaction History
      </button>
    </div>
  );
};

export default Exchange;