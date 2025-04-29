import { pool } from "../db.config.js";

export const addMissionToDB = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO mission (store_id, reward, mission_spec) VALUES (?, ?, ?);`,
      [data.storeId, data.reward, data.missionSpec]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};

export const checkAlreadyChallenging = async (memberId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT * FROM member_mission WHERE member_id = ? AND mission_id = ? AND status = '진행중';`,
      [memberId, missionId]
    );
    return rows.length > 0;
  } finally {
    conn.release();
  }
};

export const addChallengeMissionToDB = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO member_mission (member_id, mission_id, status) VALUES (?, ?, '진행중');`,
      [data.memberId, data.missionId]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};
