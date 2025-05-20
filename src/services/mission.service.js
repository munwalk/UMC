import {
  getMissionsByStoreId,
  getOngoingMissionsByMemberId,
  completeOngoingMission,
  addMission as addMissionToDB,
  checkAlreadyChallenged,
  challengeMission as doChallenge,
} from "../repositories/mission.repository.js";
import { AlreadyChallengedError, MissionCompleteError } from "../errors.js";

// ✅ 미션 추가
export const addMission = async ({ storeId, name, reward, missionSpec }) => {
  return await addMissionToDB({ storeId, name, reward, missionSpec });
};

// ✅ 미션 도전 로직
export const challengeMission = async ({ memberId, missionId }) => {
  const alreadyExists = await checkAlreadyChallenged(memberId, missionId);
  if (alreadyExists) {
    throw new AlreadyChallengedError("이미 도전 중인 미션입니다.", { memberId, missionId });
  }
  return await doChallenge({ memberId, missionId });
};

// ✅ 특정 가게의 미션 목록
export const listStoreMissions = async (storeId) => {
  return await getMissionsByStoreId(storeId);
};

// ✅ 내가 진행 중인 미션 목록
export const listMyOngoingMissions = async (memberId) => {
  return await getOngoingMissionsByMemberId(memberId);
};

// ✅ 미션 완료 처리
export const completeMyMission = async ({ memberId, missionId }) => {
  const updateResult = await completeOngoingMission({ memberId, missionId });

  if (updateResult.count === 0) {
    throw new MissionCompleteError("진행 중인 미션이 없습니다. 완료할 수 없습니다.", {
      memberId,
      missionId,
    });
  }

  return { message: "미션 완료 처리되었습니다." };
};