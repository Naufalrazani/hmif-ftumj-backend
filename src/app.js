import express, { json } from "express";
import cors from "cors";
import { query } from "./config/db.js";
import activityRoutes from "./routes/activityRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import inforallRoutes from "./routes/inforallRoutes.js";
import orgRoutes from "./routes/orgRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(json());

app.use("/api/activities", activityRoutes);

app.use("/api/articles", articleRoutes);

app.use("/api/informationall", inforallRoutes);

app.use("/api/org", orgRoutes);

app.use("/api/auth", authRoutes);

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
