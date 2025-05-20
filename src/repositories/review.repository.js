import { prisma } from "../db.config.js";

export const createReview = async ({ memberId, storeId, body, score }) => {
  return await prisma.userStoreReview.create({
    data: { userId: memberId, storeId, content: body, score },
  });
};

export const findStoreById = async (storeId) => {
  return await prisma.store.findUnique({
    where: { id: storeId },
  });
};

export const getReviewsByMemberId = async (memberId) => {
  return await prisma.userStoreReview.findMany({
    where: { userId: memberId },
    include: {
      store: true,
    },
    orderBy: {
      id: "desc",
    },
  });
};

export const getAllStoreReviews = async (storeId) => {
  return await prisma.userStoreReview.findMany({
    where: { storeId },
    include: {
      user: true,
    },
    orderBy: {
      id: "desc",
    },
  });
};
