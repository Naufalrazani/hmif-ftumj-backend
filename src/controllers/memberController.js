import pool from "../config/db.js";

// @desc    Ambil semua anggota (dengan nama departemen)
export const getAllMembers = async (req, res) => {
  try {
    const query = `
      SELECT m.*, d.name as department_name 
      FROM members m 
      LEFT JOIN departments d ON m.department_id = d.id 
      WHERE m.is_active = true 
      ORDER BY d.name ASC, m.name ASC`;

    const result = await pool.query(query);
    res.status(200).json({ status: "success", data: result.rows });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Tambah anggota baru
export const createMember = async (req, res) => {
  const {
    name,
    npm,
    role,
    department_id,
    period,
    image_url,
    instagram_url,
    linkedin_url,
    is_active,
  } = req.body;
  try {
    const query = `
      INSERT INTO members (name, npm, role, department_id, period, image_url, instagram_url, linkedin_url, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`;
    const values = [
      name,
      npm,
      role,
      department_id,
      period,
      image_url,
      instagram_url,
      linkedin_url,
      is_active,
    ];

    const result = await pool.query(query, values);
    res.status(201).json({ status: "success", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Update Anggota
export const updateMember = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    npm,
    role,
    department_id,
    period,
    image_url,
    instagram_url,
    linkedin_url,
    is_active,
  } = req.body;

  try {
    const query = `
      UPDATE members SET 
        name = COALESCE($1, name), 
        npm = COALESCE($2, npm),           
        role = COALESCE($3, role), 
        department_id = COALESCE($4, department_id), 
        period = COALESCE($5, period), 
        image_url = COALESCE($6, image_url), 
        instagram_url = COALESCE($7, instagram_url), 
        linkedin_url = COALESCE($8, linkedin_url), 
        is_active = COALESCE($9, is_active)
      WHERE id = $10 RETURNING *`;

    const result = await pool.query(query, [
      name,
      npm,
      role,
      department_id,
      period,
      image_url,
      instagram_url,
      linkedin_url,
      is_active,
      id,
    ]);

    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ status: "fail", message: "Anggota tidak ditemukan" });

    res.status(200).json({ status: "success", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Hapus Anggota
export const deleteMember = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM members WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ status: "fail", message: "Anggota tidak ditemukan" });
    res
      .status(200)
      .json({ status: "success", message: "Anggota berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
