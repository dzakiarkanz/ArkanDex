const express = require("express");
const router = express.Router();

let transactions = []; // Simpan transaksi sementara di memori

router.delete("/", (req, res) => {
  transactions = []; // Kosongkan array transaksi
  res.status(200).json({ message: "All transactions deleted successfully!" });
});

module.exports = router;