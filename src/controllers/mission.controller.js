import { challengeMission, checkAlreadyChallenged, addMission } from "../services/mission.service.js";
import { StatusCodes } from "http-status-codes";

// ✅ 미션 도전 API
export const handleChallengeMission = async (req, res, next) => {
  try {
    const { memberId, missionId } = req.body;

    if (!memberId || !missionId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "memberId와 missionId는 필수입니다." });
    }

    // 이미 도전 중인지 검증
    const alreadyExists = await checkAlreadyChallenged(memberId, missionId);
    if (alreadyExists) {
      return res.status(StatusCodes.CONFLICT).json({ message: "이미 도전 중인 미션입니다." });
    }

    // 도전 기록 삽입
    const challengeId = await challengeMission({ memberId, missionId });

    res.status(StatusCodes.CREATED).json({
      message: "미션 도전 성공!",
      challengeId: challengeId,
    });

  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 에러 발생" });
  }
};

// ✅ 미션 추가 API
export const handleAddMission = async (req, res, next) => {
  try {
    const { storeId, name, reward, missionSpec } = req.body;

    if (!storeId || !name || !reward || !missionSpec) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "필수 입력값이 없습니다." });
    }

    const missionId = await addMission({ storeId, name, reward, missionSpec });

    res.status(StatusCodes.CREATED).json({ result: missionId });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
