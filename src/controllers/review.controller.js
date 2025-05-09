import {
  addReviewService,
  listMyReviewsService,
  listStoreReviewsService,
} from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
  try {
    const review = await addReviewService(req.body);
    res.status(201).success(review);
  } catch (err) {
    next(err);
  }
};

export const handleListStoreReviews = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const reviews = await listStoreReviewsService(parseInt(storeId));
    res.status(200).success(reviews);
  } catch (err) {
    next(err);
  }
};

export const handleListMyReviews = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    const reviews = await listMyReviewsService(parseInt(memberId));
    res.status(200).success(reviews);
  } catch (err) {
    next(err);
  }
};
