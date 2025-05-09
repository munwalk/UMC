import { StatusCodes } from "http-status-codes";
import {
  addMission,
  challengeMission,
  listStoreMissions,
  listMyOngoingMissions,
  completeMyMission,
} from "../services/mission.service.js";
import { MissionInputError } from "../errors.js";

export const handleAddMission = async (req, res, next) => {
  try {
    const { storeId, name, reward, missionSpec } = req.body;

    if (!storeId || !name || !reward || !missionSpec) {
      throw new MissionInputError("미션 입력값이 부족합니다.", req.body);
    }

    const mission = await addMission({ storeId, name, reward, missionSpec }); // ✅ 여기!

    res.status(StatusCodes.CREATED).success(mission);
  } catch (err) {
    next(err);
  }
};


export const handleChallengeMission = async (req, res, next) => {
  try {
    const { memberId, missionId } = req.body;
    if (!memberId || !missionId) {
      throw new MissionInputError("memberId와 missionId는 필수입니다.", req.body);
    }
    const challengeId = await challengeMission({ memberId, missionId });
    res.status(StatusCodes.CREATED).success({ challengeId });
  } catch (err) {
    next(err);
  }
};

export const handleListStoreMissions = async (req, res, next) => {
  try {
    const missions = await listStoreMissions(parseInt(req.params.storeId));
    res.status(StatusCodes.OK).success(missions);
  } catch (err) {
    next(err);
  }
};

export const handleListOngoingMissions = async (req, res, next) => {
  try {
    const missions = await listMyOngoingMissions(parseInt(req.params.memberId));
    res.status(StatusCodes.OK).success(missions);
  } catch (err) {
    next(err);
  }
};

export const handleCompleteMission = async (req, res, next) => {
  try {
    const { memberId, missionId } = req.body;
    if (!memberId || !missionId) {
      throw new MissionInputError("memberId와 missionId는 필수입니다.", req.body);
    }
    await completeMyMission({ memberId, missionId });
    res.status(StatusCodes.OK).success({ message: "미션 완료 처리되었습니다." });
  } catch (err) {
    next(err);
  }
};
