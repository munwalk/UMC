import { prisma } from "../db.config.js";

// ✅ 리뷰 생성 (Prisma)
export const createReview = async ({ memberId, storeId, body, score }) => {
  return await prisma.review.create({
    data: {
      memberId,
      storeId,
      body,
      score,
    },
  });
};

// ✅ 가게 ID로 가게 조회 (Prisma)
export const findStoreById = async (storeId) => {
  return await prisma.store.findUnique({
    where: { id: storeId },
  });
};

// ✅ 내가 작성한 리뷰 목록 조회 (Prisma)
export const getReviewsByMemberId = async (memberId) => {
  return await prisma.review.findMany({
    where: { memberId },
    select: {
      id: true,
      body: true,
      score: true,
      createdAt: true,
      store: {
        select: {
          id: true,
          name: true,
          regionName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
