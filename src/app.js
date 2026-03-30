const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/test-connection", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.status(200).json({
      status: "success",
      message: "Koneksi database aman!",
      server_time: result.rows[0].now,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Database tidak terhubung!",
      error: err.message,
    });
  }
});

module.exports = app;
