import { StatusCodes } from "http-status-codes";
import {
  addMission,
  challengeMission,
  listStoreMissions,
  listMyOngoingMissions,
  completeMyMission,
} from "../services/mission.service.js";

// ✅ 미션 추가
export const handleAddMission = async (req, res) => {
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

// ✅ 미션 도전하기
export const handleChallengeMission = async (req, res) => {
  try {
    const { memberId, missionId } = req.body;

    if (!memberId || !missionId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "memberId와 missionId는 필수입니다." });
    }

    const alreadyExists = await challengeMission.checkAlreadyChallenged(memberId, missionId);
    if (alreadyExists) {
      return res.status(StatusCodes.CONFLICT).json({ message: "이미 도전 중인 미션입니다." });
    }

    const challengeId = await challengeMission.doChallenge({ memberId, missionId });

    res.status(StatusCodes.CREATED).json({
      message: "미션 도전 성공!",
      challengeId,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 에러 발생" });
  }
};

// ✅ 특정 가게의 미션 목록 조회
export const handleListStoreMissions = async (req, res) => {
  try {
    const { storeId } = req.params;

    if (!storeId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "storeId는 필수입니다." });
    }

    const missions = await listStoreMissions(parseInt(storeId));
    res.status(StatusCodes.OK).json({ missions });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

// ✅ 내가 진행 중인 미션 목록 조회
export const handleListOngoingMissions = async (req, res) => {
  try {
    const { memberId } = req.params;

    if (!memberId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "memberId는 필수입니다." });
    }

    const missions = await listMyOngoingMissions(parseInt(memberId));
    res.status(StatusCodes.OK).json({ missions });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

// ✅ 내가 진행 중인 미션 완료 처리
export const handleCompleteMission = async (req, res) => {
  try {
    const { memberId, missionId } = req.body;

    if (!memberId || !missionId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "memberId와 missionId는 필수입니다." });
    }

    await completeMyMission({ memberId, missionId });
    res.status(StatusCodes.OK).json({ message: "미션 완료 처리되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
