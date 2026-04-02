import pool from "../config/db";

export const createLog = async (adminName, action, target, description) => {
  const query = {
    text: "INSERT INTO audit_logs(admin_name, action, target, description) VALUES($1, $2, $3, $4)",
    values: [adminName, action, target, description],
  };

  try {
    await pool.query(query);
  } catch (err) {
    console.error("Gagal mencatat audit log ke DB:", err.stack);
  }
};
