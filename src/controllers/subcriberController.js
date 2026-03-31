import pool from "../config/db.js";

export const subscribeEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING RETURNING *",
      [email],
    );

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "fail", message: "Email sudah terdaftar!" });
    }

    res
      .status(201)
      .json({ status: "success", message: "Terima kasih sudah berlangganan!" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
