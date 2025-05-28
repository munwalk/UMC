import { prisma } from "../db.config.js";

// ✅ 1. 새로운 미션 추가
export const addMission = async ({ storeId, name, reward, missionSpec }) => {
  const mission = await prisma.mission.create({
    data: {
      storeId,
      name,
      reward,
      missionSpec,
    },
  });
  return mission; // ✅ 전체 객체 반환
};


// ✅ 2. 특정 가게의 미션 목록 조회
export const getMissionsByStoreId = async (storeId) => {
  return await prisma.mission.findMany({
    where: { storeId },
    orderBy: { createdAt: "desc" },
  });
};

// ✅ 3. 내가 진행 중인 미션 목록 조회
export const getOngoingMissionsByMemberId = async (memberId) => {
  return await prisma.memberMission.findMany({
    where: { memberId, status: "진행중" },
    include: {
      mission: {
        include: { store: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

// ✅ 4. 완료 처리
export const completeOngoingMission = async ({ memberId, missionId }) => {
  return await prisma.memberMission.updateMany({
    where: { memberId, missionId, status: "진행중" },
    data: { status: "완료" },
  });
};

// ✅ 5. 중복 체크
export const checkAlreadyChallenged = async (memberId, missionId) => {
  const exists = await prisma.memberMission.findFirst({
    where: { memberId, missionId, status: "진행중" },
  });
  return !!exists;
};

// ✅ 6. 미션 도전 정보 삽입
export const challengeMission = async ({ memberId, missionId }) => {
  const challenge = await prisma.memberMission.create({
    data: { memberId, missionId, status: "진행중" },
  });
  return challenge.id;
};
