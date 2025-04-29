import { pool } from "../db.config.js";

export const findStoreById = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT * FROM store WHERE id = ?`, [storeId]);
    return rows[0];
  } finally {
    conn.release();
  }
};

export const createReview = async ({ memberId, storeId, body, score }) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO review (member_id, store_id, body, score) VALUES (?, ?, ?, ?)`,
      [memberId, storeId, body, score]
    );
    return { id: result.insertId, memberId, storeId, body, score };
  } finally {
    conn.release();
  }
};
