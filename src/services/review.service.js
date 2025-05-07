import { createReview, findStoreById } from "../repositories/review.repository.js";
import { prisma } from "../prisma/index.js";

export const listMyReviewsService = async (memberId) => {
  const reviews = await prisma.userStoreReview.findMany({
    where: {
      userId: memberId,
    },
    include: {
      store: true,
    },
  });
  return reviews;
};

export const addReviewService = async ({ memberId, storeId, body, score }) => {
  const store = await findStoreById(storeId);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }
  return await createReview({ memberId, storeId, body, score });
};

export const listStoreReviewsService = async (storeId) => {
  const reviews = await prisma.userStoreReview.findMany({
    where: { storeId },
  });
  return reviews;
};