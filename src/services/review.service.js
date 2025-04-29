import { createReview, findStoreById } from "../repositories/review.repository.js";

export const addReviewService = async ({ memberId, storeId, body, score }) => {
  const store = await findStoreById(storeId);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }
  return await createReview({ memberId, storeId, body, score });
};
