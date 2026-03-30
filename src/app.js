import express, { json } from "express";
import cors from "cors";
import { query } from "./config/db.js";
import activityRoutes from "./routes/activityRoutes.js";

const app = express();

app.use(cors());
app.use(json());

app.use("/api/activities", activityRoutes);

app.get("/test-connection", async (req, res) => {
  try {
    const result = await query("SELECT NOW()");
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

export default app;
