import pool from "../config/db.js";

// @desc    Ambil semua kegiatan
// @route   GET /api/activities
export const getAllActivities = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM activities ORDER BY date DESC",
    );
    res.status(200).json({
      status: "success",
      results: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Tambah kegiatan baru
// @route   POST /api/activities
export const createActivity = async (req, res) => {
  const { title, description, date, department, status, image_url } = req.body;
  try {
    const query = `
      INSERT INTO activities (title, description, date, department, status, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;
    const values = [title, description, date, department, status, image_url];

    const result = await pool.query(query, values);
    res.status(201).json({
      status: "success",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Update kegiatan
// @route   PUT /api/activities/:id
export const updateActivity = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, department, status, image_url } = req.body;
  try {
    const query = `
      UPDATE activities 
      SET title=$1, description=$2, date=$3, department=$4, status=$5, image_url=$6 
      WHERE id=$7 RETURNING *`;
    const result = await pool.query(query, [
      title,
      description,
      date,
      department,
      status,
      image_url,
      id,
    ]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Kegiatan tidak ditemukan" });
    }

    res.status(200).json({ status: "success", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Hapus kegiatan
// @route   DELETE /api/activities/:id
export const deleteActivity = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM activities WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Kegiatan tidak ditemukan" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Kegiatan berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
