import {
  createReview,
  findStoreById,
  getAllStoreReviews,
  getReviewsByMemberId,
} from "../repositories/review.repository.js";

import {
  ReviewInputError,
  ReviewStoreNotFoundError,
  UserInputError,
} from "../errors.js";

import { prisma } from "../db.config.js";

export const addReviewService = async ({ memberId, storeId, body, score }) => {
  // ✅ 필수 입력값 체크
  if (!memberId || !storeId || !body || score == null) {
    throw new ReviewInputError("리뷰 입력값이 부족합니다.", {
      memberId,
      storeId,
      body,
      score,
    });
  }

  // ✅ 사용자 존재 여부 확인
  const user = await prisma.user.findUnique({ where: { id: memberId } });
  if (!user) {
    throw new UserInputError("존재하지 않는 사용자입니다.", { memberId });
  }

  // ✅ 가게 존재 여부 확인
  const store = await findStoreById(storeId);
  if (!store) {
    throw new ReviewStoreNotFoundError("존재하지 않는 가게입니다.", { storeId });
  }

  // ✅ 리뷰 생성
  return await createReview({ memberId, storeId, body, score });
};

export const listStoreReviewsService = async (storeId) => {
  return await getAllStoreReviews(storeId);
};

export const listMyReviewsService = async (memberId) => {
  return await getReviewsByMemberId(memberId);
};
