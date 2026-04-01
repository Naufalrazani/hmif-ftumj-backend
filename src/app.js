import express, { json } from "express";
import cors from "cors";
import { query } from "./config/db.js";
import activityRoutes from "./routes/activityRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import inforallRoutes from "./routes/inforallRoutes.js";
import orgRoutes from "./routes/orgRoutes.js";
import subscribeRoutes from "./routes/subscriberRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Terlalu banyak request dari IP ini, coba lagi nanti",
});

app.use(helmet());
app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", limiter);

app.use("/api/activities", activityRoutes);

app.use("/api/articles", articleRoutes);

app.use("/api/informationall", inforallRoutes);

app.use("/api/org", orgRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/subscribers", subscribeRoutes);

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
