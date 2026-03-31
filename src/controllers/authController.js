import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );
    if (userResult.rows.length === 0) {
      return res
        .status(401)
        .json({ status: "fail", message: "Username atau password salah" });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "fail", message: "Username atau password salah" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ status: "success", token });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
