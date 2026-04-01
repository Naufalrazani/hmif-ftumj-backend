import pool from "../config/db.js";

// @desc    Tambah subscriber baru (Newsletter)
export const createSubscriber = async (req, res) => {
  const email = req.body.email.toLowerCase();

  try {
    const result = await pool.query(
      "INSERT INTO subscribers (email) VALUES ($1) RETURNING *",
      [email],
    );

    res.status(201).json({
      status: "success",
      message: "Terima kasih telah berlangganan newsletter HMIF!",
      data: result.rows[0],
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({
        status: "fail",
        message: "Email ini sudah terdaftar.",
      });
    }
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Ambil semua subscriber aktif
export const getAllSubscribers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM subscribers ORDER BY subscribed_at DESC",
    );
    res.status(200).json({ status: "success", data: result.rows });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Update status subscriber (Unsubscribe/Resubscribe)
export const updateSubscriberStatus = async (req, res) => {
  const { id } = req.params;
  const { is_active } = req.body;

  try {
    const result = await pool.query(
      "UPDATE subscribers SET is_active = $1 WHERE id = $2 RETURNING *",
      [is_active, id],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Subscriber tidak ditemukan" });
    }

    const message = is_active
      ? "Berhasil berlangganan kembali"
      : "Berhasil berhenti berlangganan";
    res.status(200).json({ status: "success", message, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Hapus subscriber secara permanen (Hard Delete)
export const deleteSubscriber = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM subscribers WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Subscriber tidak ditemukan" });
    }

    res
      .status(200)
      .json({ status: "success", message: "Data subscriber dihapus permanen" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
