import { pool } from "../db.config.js";

export const createStore = async (regionName, storeName) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO store (region_name, name) VALUES (?, ?)`,
      [regionName, storeName]
    );
    return { id: result.insertId, regionName, storeName };
  } finally {
    conn.release();
  }
};

  export const addStore = async (regionName, storeName) => {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.query(
        `INSERT INTO store (region_name, name) VALUES (?, ?)`,
        [regionName, storeName]
      );
      return result.insertId; // 새로 추가된 store의 id 반환
    } finally {
      conn.release();
    }
  };