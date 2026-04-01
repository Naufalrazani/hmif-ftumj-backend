import pool from "../config/db.js";

// @desc    Ambil semua departemen
export const getAllDepartments = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM departments ORDER BY name ASC",
    );
    res.status(200).json({ status: "success", data: result.rows });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Tambah departemen baru
export const createDepartment = async (req, res) => {
  const { name, description, image_url } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO departments (name, description, image_url) VALUES ($1, $2, $3) RETURNING *",
      [name, description, image_url],
    );
    res.status(201).json({ status: "success", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Update Departemen
export const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name, description, image_url } = req.body;

  try {
    const result = await pool.query(
      "UPDATE departments SET name = COALESCE($1, name), description = COALESCE($2, description), image_url = COALESCE($3, image_url) WHERE id = $4 RETURNING *",
      [name, description, image_url, id],
    );
    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ status: "fail", message: "Departemen tidak ditemukan" });
    res.status(200).json({ status: "success", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Hapus Departemen
export const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM departments WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ status: "fail", message: "Departemen tidak ditemukan" });
    res
      .status(200)
      .json({ status: "success", message: "Departemen berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
