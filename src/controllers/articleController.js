import pool from "../config/db.js";

const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// @desc    Ambil semua artikel
// @route   GET /api/articles
export const getAllArticles = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM articles ORDER BY created_at DESC",
    );
    res.status(200).json({ status: "success", data: result.rows });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Tambah artikel baru
// @route   POST /api/articles
export const createArticle = async (req, res) => {
  const { title, content, category, thumbnail_url } = req.body;
  const slug = createSlug(title);

  try {
    const query = `
      INSERT INTO articles (title, slug, content, category, thumbnail_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    const values = [title, slug, content, category, thumbnail_url];

    const result = await pool.query(query, values);
    res.status(201).json({ status: "success", data: result.rows[0] });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({
        status: "fail",
        message: "Judul artikel sudah ada, gunakan judul lain.",
      });
    }
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Hapus artikel
export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM articles WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Artikel tidak ditemukan" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Artikel berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Update artikel
// @route   PUT /api/articles/:id
export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, thumbnail_url, is_published } = req.body;

  let slug;
  if (title) {
    slug = createSlug(title);
  }

  try {
    const query = `
      UPDATE articles 
      SET 
        title = COALESCE($1, title), 
        slug = COALESCE($2, slug), 
        content = COALESCE($3, content), 
        category = COALESCE($4, category), 
        thumbnail_url = COALESCE($5, thumbnail_url),
        is_published = COALESCE($6, is_published)
      WHERE id = $7 RETURNING *`;

    const values = [
      title,
      slug,
      content,
      category,
      thumbnail_url,
      is_published,
      id,
    ];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Artikel tidak ditemukan" });
    }

    res.status(200).json({ status: "success", data: result.rows[0] });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({
        status: "fail",
        message: "Slug sudah digunakan oleh artikel lain.",
      });
    }
    res.status(500).json({ status: "error", message: err.message });
  }
};
