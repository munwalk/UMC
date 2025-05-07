import {
  getMissionsByStoreId,
  getOngoingMissionsByMemberId,
  completeOngoingMission,
  addMission as addMissionToDB,
  checkAlreadyChallenged,
  challengeMission as doChallenge,
} from "../repositories/mission.repository.js";

// ✅ 미션 추가
export const addMission = async ({ storeId, name, reward, missionSpec }) => {
  return await addMissionToDB({ storeId, name, reward, missionSpec });
};

// ✅ 미션 도전 로직: 중복 확인 + 삽입을 분리해서 export
export const challengeMission = {
  // 이미 도전 중인지 확인
  checkAlreadyChallenged,
  // 도전 정보 삽입
  doChallenge,
};

// ✅ 특정 가게의 미션 목록 조회
export const listStoreMissions = async (storeId) => {
  return await getMissionsByStoreId(storeId);
};

// ✅ 내가 진행 중인 미션 목록 조회
export const listMyOngoingMissions = async (memberId) => {
  return await getOngoingMissionsByMemberId(memberId);
};

// ✅ 내가 진행 중인 미션을 완료로 변경
export const completeMyMission = async ({ memberId, missionId }) => {
  return await completeOngoingMission({ memberId, missionId });
};
