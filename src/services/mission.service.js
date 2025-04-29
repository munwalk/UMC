import { pool } from "../db.config.js";

// ✅ 이미 도전했는지 확인하는 함수
export const checkAlreadyChallenged = async (memberId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      "SELECT id FROM member_mission WHERE member_id = ? AND mission_id = ? AND status = '진행중'",
      [memberId, missionId]
    );
    return rows.length > 0; // 하나라도 있으면 true
  } finally {
    conn.release();
  }
};

// ✅ 새롭게 미션 도전 기록 추가하는 함수
export const challengeMission = async ({ memberId, missionId }) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      "INSERT INTO member_mission (member_id, mission_id, status, created_at) VALUES (?, ?, '진행중', NOW())",
      [memberId, missionId]
    );
    return result.insertId; // 추가된 record의 id 리턴
  } finally {
    conn.release();
  }
};

// ✅ 새로운 미션 추가 함수
export const addMission = async ({ storeId, name, reward, missionSpec }) => {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.query(
        `INSERT INTO mission (store_id, name, reward, mission_spec, created_at)
         VALUES (?, ?, ?, ?, NOW())`,
        [storeId, name, reward, missionSpec]
      );
      return result.insertId;
    } finally {
      conn.release();
    }
  };
  