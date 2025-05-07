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
  return mission.id;
};

// ✅ 2. 특정 가게의 미션 목록 조회
export const getMissionsByStoreId = async (storeId) => {
  return await prisma.mission.findMany({
    where: { storeId },
    select: {
      id: true,
      name: true,
      reward: true,
      missionSpec: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

// ✅ 3. 내가 진행 중인 미션 목록 조회
export const getOngoingMissionsByMemberId = async (memberId) => {
  return await prisma.memberMission.findMany({
    where: {
      memberId,
      status: "진행중",
    },
    select: {
      id: true,
      status: true,
      createdAt: true,
      mission: {
        select: {
          id: true,
          name: true,
          reward: true,
          missionSpec: true,
          store: {
            select: {
              id: true,
              name: true,
              regionName: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

// ✅ 4. 내가 진행 중인 미션을 완료로 변경
export const completeOngoingMission = async ({ memberId, missionId }) => {
  return await prisma.memberMission.updateMany({
    where: {
      memberId,
      missionId,
      status: "진행중",
    },
    data: {
      status: "완료",
    },
  });
};

// ✅ 5. 이미 도전 중인지 확인
export const checkAlreadyChallenged = async (memberId, missionId) => {
  const exists = await prisma.memberMission.findFirst({
    where: {
      memberId,
      missionId,
      status: "진행중",
    },
  });
  return !!exists;
};

// ✅ 6. 도전 정보 삽입
export const challengeMission = async ({ memberId, missionId }) => {
  const challenge = await prisma.memberMission.create({
    data: {
      memberId,
      missionId,
      status: "진행중",
    },
  });
  return challenge.id;
};
