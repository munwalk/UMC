import {
  addReviewService,
  listMyReviewsService,
} from "../services/review.service.js";
export const handleAddReview = async (req, res, next) => {
  try {
    const result = await addReviewService(req.body);
    res.status(201).json({ message: "리뷰 추가 완료", review: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const handleListStoreReviews = async (req, res) => {
  const { storeId } = req.params;
  const reviews = await listStoreReviewsService(parseInt(storeId));
  res.status(200).json({ reviews });
};

export const handleListMyReviews = async (req, res) => {
  const { memberId } = req.params;
  const reviews = await listMyReviewsService(parseInt(memberId));
  res.status(200).json({ reviews });
};
