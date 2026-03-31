import pool from "../config/db.js";
import { sendNotification } from "../config/mail.js";

// @desc    Ambil semua informasi
// @route   GET /api/informationall
export const getAllInfo = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM informationall ORDER BY deadline ASC",
    );
    res.status(200).json({ status: "success", data: result.rows });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Tambah info baru
// @route   POST /api/informationall
export const createInfo = async (req, res) => {
  const {
    title,
    type,
    deadline,
    thumbnail_url,
    link_registration,
    description,
  } = req.body;
  try {
    const query = `
      INSERT INTO informationall (title, type, deadline, thumbnail_url, link_registration, description)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;
    const values = [
      title,
      type,
      deadline,
      thumbnail_url,
      link_registration,
      description,
    ];

    const result = await pool.query(query, values);
    const newInfo = result.rows[0];

    const subscribers = await pool.query(
      "SELECT email FROM subscribers WHERE is_active = true",
    );

    subscribers.rows.forEach((sub) => {
      sendNotification(
        sub.email,
        `Info Baru: ${newInfo.title}`,
        `Ada informasi baru mengenai ${newInfo.type}. Cek di website HMIF!`,
        `<h1>${newInfo.title}</h1><p>${newInfo.description}</p><a href="${newInfo.link_registration}">Daftar Sekarang</a>`,
      );
    });

    res.status(201).json({ status: "success", data: newInfo });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Update info
// @route   PUT /api/informationall/:id
export const updateInfo = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    type,
    deadline,
    thumbnail_url,
    link_registration,
    description,
  } = req.body;
  try {
    const query = `
      UPDATE informationall 
      SET 
        title = COALESCE($1, title), 
        type = COALESCE($2, type), 
        deadline = COALESCE($3, deadline), 
        thumbnail_url = COALESCE($4, thumbnail_url), 
        link_registration = COALESCE($5, link_registration), 
        description = COALESCE($6, description)
      WHERE id = $7 RETURNING *`;

    const result = await pool.query(query, [
      title,
      type,
      deadline,
      thumbnail_url,
      link_registration,
      description,
      id,
    ]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Info tidak ditemukan" });
    }
    res.status(200).json({ status: "success", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Hapus info
// @route   DELETE /api/informationall/:id
export const deleteInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM informationall WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Info tidak ditemukan" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Info berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
